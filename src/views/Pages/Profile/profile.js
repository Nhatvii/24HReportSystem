import React, { useEffect, useState } from "react";
// react-bootstrap components

import { useFormik } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import userApi from "../../../api/UserApi";

function Profile() {
  //Check user
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  if (localStorage.getItem("user_info") === null) {
    window.location.href = "/auth#/login";
  }
  //State
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [message, setMessage] = useState("");
  //Validate the input
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Cần nhập tên người dùng";
    } else if (!/^.{5,35}$/i.test(values.username)) {
      errors.username = "Tên ít nhất là 5 kí tự và dài nhất là 35 kí tự.";
    }
    if (!values.password) {
      errors.password = "Cần nhập mật khẩu";
    }

    if (!values.email) {
      errors.email = "Cần nhập email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email không đúng";
    }
    if (values.phone) {
      if (values.phone.length < 10) {
        errors.phoneError = "Số điện thoại không đúng. Cần trên 10 chữ số.";
      }
    } else if (!values.phone) {
      //
    }
    if (values.address) {
      if (values.address.length < 5) {
        errors.addressError = "Cần ít nhất 5 kí tự";
      }
    } else if (!values.address) {
    }
    if (values.idcard) {
      if (values.idcard.length !== 12) {
        errors.idcardError = "Số căn cước không đúng. Cần ít nhất 12 kí tự.";
      }
    } else if (!values.idcard) {
    }
    return errors;
  };
  //Cập nhật
  async function update_user(values) {
    setIsLoading(true);
    try {
      const json = JSON.stringify({
        email: values.email,
        username: values.username,
        address: values.address ? values.address : "",
        identityCard: values.idcard ? values.idcard : null,
        password: values.password,
      });
      const response = await userApi.update(json);
      if (response.statusCode === 200) {
        const params = { email: values.email };
        const updated_info = await userApi.getUser(params);
        if (!JSON.stringify(updated_info).includes("error")) {
          localStorage.setItem("user_info", JSON.stringify(updated_info));
        } else {
          setMessage(response.error.message);
        }
      }
      setViewPassword(false);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  }
  //
  const formik = useFormik({
    initialValues: {
      email: user_info.email,
      username: user_info.accountInfo.username,
      phoneNumber: user_info.phoneNumber ? user_info.phoneNumber : "",
      address: user_info.accountInfo.address
        ? user_info.accountInfo.address
        : "",
      identityCard: user_info.accountInfo.identityCard
        ? user_info.accountInfo.identityCard
        : "",
      password: user_info.password,
    },
    validate,
    onSubmit: (values) => {
      update_user(values);
    },
  });
  const [show, setShow] = useState(false);

  const renderPassword = () => {
    setViewPassword(!viewPassword);
  };
  useEffect(() => {
    if (localStorage.getItem("user_info") === null) {
      window.location.href = "/auth#/login";
    }
  }, [user_info]);
  return (
    <>
      <div className="pt-5 pb-5 pl-5 pr-5">
        <Row>
          <Col md="3" className="mr-5 ml-5">
            <Card className="card-user">
              <div className="card-image mx-auto pt-2">
                <img
                  alt="..."
                  src={
                    "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
                  }
                  width={200}
                  height={200}
                  className="rounded-circle"
                ></img>
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <h5 className="title text-center">
                      {user_info.accountInfo.username}
                    </h5>
                  </a>
                  <p className="description text-center">{user_info.email}</p>
                </div>
              </CardBody>
              <hr />
              <div className="mr-auto ml-auto pb-3 pt-1">Danh sách báo cáo</div>
            </Card>
          </Col>
          <Col md="8" className="">
            <Card>
              <CardHeader style={{ backgroundColor: "#6464ff" }}>
                <div className="h4">Sửa hồ sơ</div>
              </CardHeader>
              <CardBody>
                <p className="text-danger">{message}</p>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>
                            Tên người dùng<span className="text-danger">*</span>{" "}
                          </b>
                        </label>
                        <Input
                          id="username"
                          defaultValue={user_info.accountInfo.username}
                          placeholder="Tên người dùng"
                          type="text"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      <p className="text-warning field_validate_label">
                        {formik.errors.username ? formik.errors.username : null}
                      </p>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>
                            Email<span className="text-danger">*</span>{" "}
                          </b>
                        </label>
                        <Input
                          defaultValue={user_info.email}
                          placeholder="Email"
                          type="email"
                          id="email"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>
                            Password<span className="text-danger">*</span>{" "}
                          </b>
                        </label>
                        {viewPassword ? (
                          <InputGroup>
                            <Input
                              id="password"
                              type="text"
                              placeholder="Mật khẩu"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                            />
                            <InputGroupAddon
                              addonType="prepend"
                              onClick={() => renderPassword()}
                            >
                              <InputGroupText>
                                <i class="fa fa-solid fa-eye"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        ) : (
                          <InputGroup>
                            <Input
                              disabled
                              id="password"
                              type="password"
                              placeholder="Mật khẩu"
                              value={formik.values.password}
                            />
                            <InputGroupAddon
                              addonType="prepend"
                              onClick={() => renderPassword()}
                            >
                              <InputGroupText>
                                <i class="fa fa-solid fa-eye"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        )}
                        <p className="text-warning field_validate_label">
                          {formik.errors.password
                            ? formik.errors.password
                            : null}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>Địa chỉ</b>
                        </label>
                        <Input
                          defaultValue={user_info.accountInfo.address}
                          placeholder="Địa chỉ"
                          type="text"
                          id="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                        />
                        <p className="text-warning field_validate_label">
                          {formik.errors.addressError
                            ? formik.errors.addressError
                            : null}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>Số điện thoại</b>
                        </label>
                        <Input
                          disabled
                          defaultValue={user_info.phoneNumber}
                          placeholder="Số điện thoại"
                          type="text"
                          id="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                        />
                        <p className="text-warning field_validate_label">
                          {formik.errors.phoneError
                            ? formik.errors.phoneError
                            : null}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>Số CMND/ Căn cước</b>
                        </label>
                        <Input
                          defaultValue={user_info.accountInfo.identityCard}
                          placeholder="Số CMND/ Căn cước"
                          type="text"
                          id="idcard"
                          value={formik.values.idcard}
                          onChange={formik.handleChange}
                        />
                        <p className="text-warning field_validate_label">
                          {formik.errors.idcardError
                            ? formik.errors.idcardError
                            : null}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  {isLoading ? (
                    <Button
                      className="btn-fill pull-right mt-2"
                      type="submit"
                      disabled
                      color="info"
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      Đang cập nhật hồ sơ
                    </Button>
                  ) : (
                    <Button
                      className="btn-fill pull-right mt-2"
                      type="submit"
                      color="info"
                    >
                      Cập nhật hồ sơ
                    </Button>
                  )}
                  <div className="clearfix"></div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Profile;
