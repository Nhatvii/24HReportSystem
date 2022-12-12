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
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export const Profile = () => {
  //Check user
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  if (localStorage.getItem("user_info") === null) {
    window.location.href = "/login";
  }
  //State
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePhone, setUpdatePhone] = useState(false);
  const [message, setMessage] = useState("");
  //Validate the input
  const validate = (values) => {
    const errors = {};
    if (!values.fullname) {
      errors.fullname = "Cần nhập tên người dùng";
    } else if (!/^.{5,35}$/i.test(values.fullname)) {
      errors.fullname = "Tên ít nhất là 5 kí tự và dài nhất là 35 kí tự.";
    }
    // if (!values.password) {
    //   errors.password = "Cần nhập mật khẩu";
    // }
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
        accountID: user_info.accountId,
        email: values.email,
        phoneNumber: values.phone,
        fullname: values.fullname,
        address: values.address ? values.address : "",
        identityCard: values.idcard ? values.idcard : null,
        password: values.password,
      });
      console.log(json);
      const response = await userApi.update(json);
      if (response.statusCode === 200) {
        const params = { userId: user_info.accountId };
        const updated_info = await userApi.getUser(params);
        if (!JSON.stringify(updated_info).includes("error")) {
          localStorage.setItem("user_info", JSON.stringify(updated_info));
          toast.success("Cập nhật thành công");
        } else {
          toast.error(response.error.message);
        }
      }
      setUpdateEmail(false);
      setUpdateEmail(false);
      setViewPassword(false);
      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
      setMessage(e.message);
    }
  }
  //
  const formik = useFormik({
    initialValues: {
      email: user_info.email,
      fullname: user_info.accountInfo.fullname,
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
  const renderPassword = () => {
    setViewPassword(!viewPassword);
  };
  const renderEmail = () => {
    setUpdateEmail(!updateEmail);
  };
  const renderPhone = () => {
    setUpdatePhone(!updatePhone);
  };
  useEffect(() => {
    if (localStorage.getItem("user_info") === null) {
      window.location.href = "/login";
    }
  }, [user_info]);
  return (
    <>
      <div className="pt-5 pb-5 pl-5 pr-5 fifth_bg">
        <Row>
          <Col md="4">
            <Card>
              <div className="card-image mx-auto pt-2">
                <img
                  alt="..."
                  src={
                    "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                  }
                  width={200}
                  height={200}
                  className="rounded-circle"
                ></img>
              </div>
              <CardBody>
                <div className="align-middle">
                  <p href="#pablo" onClick={(e) => e.preventDefault()}>
                    <h5 className="title text-center">
                      {user_info.accountInfo.fullname}
                    </h5>
                  </p>
                  <p className="description text-center">{user_info.email}</p>
                </div>
              </CardBody>
              <hr />
              <div className="mr-auto ml-auto pb-3 pt-1">
                <Link to="/view-report" className="see_all mb20">
                  Danh sách báo cáo
                </Link>
              </div>
            </Card>
          </Col>
          <Col md="8" className="">
            <Card>
              <CardHeader
                style={{
                  background:
                    "linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237))",
                }}
              >
                <div
                  className="h4"
                  style={{ color: "#fff", fontWeight: "bold" }}
                >
                  Sửa hồ sơ
                </div>
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
                          id="fullname"
                          defaultValue={user_info.accountInfo.fullname}
                          placeholder="Tên người dùng"
                          type="text"
                          value={formik.values.fullname}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      <p className="text-warning field_validate_label">
                        {formik.errors.fullname ? formik.errors.fullname : null}
                      </p>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label className="pb-1 pt-1">
                          <b>
                            Email<span className="text-danger">*</span>{" "}
                          </b>
                        </label>
                        {updateEmail ? (
                          <InputGroup>
                            <Input
                              defaultValue={user_info.email}
                              placeholder="Email"
                              type="email"
                              id="email"
                            />
                            <InputGroupAddon
                              addonType="prepend"
                              onClick={() => renderEmail()}
                            >
                              <InputGroupText>
                                <i class="fa fa-solid fa-pencil"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        ) : (
                          <InputGroup>
                            <Input
                              defaultValue={user_info.email}
                              placeholder="Email"
                              type="email"
                              id="email"
                              disabled
                            />
                            <InputGroupAddon
                              addonType="prepend"
                              onClick={() => renderEmail()}
                            >
                              <InputGroupText>
                                <i class="fa fa-solid fa-pencil"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        )}
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
                        {updatePhone ? (
                          <InputGroup>
                            <Input
                              defaultValue={user_info.phoneNumber}
                              placeholder="Số điện thoại"
                              type="text"
                              id="phone"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                            />
                            <InputGroupAddon
                              addonType="prepend"
                              onClick={() => renderPhone()}
                            >
                              <InputGroupText>
                                <i class="fa fa-solid fa-pencil"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        ) : (
                          <InputGroup>
                            <Input
                              defaultValue={user_info.phoneNumber}
                              placeholder="Số điện thoại"
                              type="text"
                              id="phone"
                              disabled
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                            />
                            <InputGroupAddon
                              addonType="prepend"
                              onClick={() => renderPhone()}
                            >
                              <InputGroupText>
                                <i class="fa fa-solid fa-pencil"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        )}

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
                      style={{
                        background:
                          "linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237))",
                        color: "#FFFF",
                        fontWeight: "bold",
                      }}
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
};
