import React, { useState } from "react";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useFormik } from "formik";
import UserTable from "../components/UserTables/UserTable";
import registerApi from "../../../api/registerApi";
import Select from "react-select";
import userApi from "../../../api/UserApi";
const roleList = [
  {
    value: 1,
    label: "User",
  },
  {
    value: 2,
    label: "Staff",
  },
  {
    value: 3,
    label: "Editor",
  },
  {
    value: 4,
    label: "Editor Manager",
  },
  {
    value: 5,
    label: "Admin",
  },
];
const Users = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const toggle = () => {
    setModal(!modal);
  };
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
    console.log(errors);
    return errors;
  };
  //Đăng kí
  async function register_user(values) {
    setIsLoading(true);
    try {
      const params = { email: values.email, phone: values.phone };
      const response = await registerApi.checkUserRegister(params);
      if (!JSON.stringify(response).includes("error")) {
        const json = {
          username: values.username,
          email: values.email,
          password: values.password,
          roleId: selectedRole,
          phoneNumber: values.phone,
        };
        console.log(json);
        const response = await registerApi.createUser(json);
        if (!JSON.stringify(response).includes("error")) {
          const params = { email: email, isAuthen: true };
          const response = await userApi.update(params);
          setModal(false);
        } else {
          setErrorMessage(response.error.message);
        }
      } else {
        setErrorMessage(response.error.message);
      }
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  }
  //
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validate,
    onSubmit: (values) => {
      setEmail(values.email);
      register_user(values);
    },
  });
  return (
    <div className="animated fadeIn pl-3 pr-3 pt-2">
      <Modal
        isOpen={modal}
        toggle={() => toggle()}
        className=""
        size="lg"
        style={{ maxWidth: "800px", width: "80%", paddingTop: "10rem" }}
      >
        <ModalHeader className="bg-primary" toggle={() => toggle()}>
          Tạo người dùng
        </ModalHeader>
        <ModalBody>
          <form className="formFields" onSubmit={formik.handleSubmit}>
            <p className="text-danger">{errorMessage}</p>
            <div className="formField">
              <label className="formFieldLabel" for="email">
                Email <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="formFieldInput"
              />
              <p className="text-warning field_validate_label">
                {formik.errors.email ? formik.errors.email : null}{" "}
              </p>
            </div>
            <div className="formField">
              <label className="formFieldLabel" for="username">
                Tên người dùng:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Tên người dùng"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="formFieldInput"
              />
              <p className="text-warning field_validate_label">
                {formik.errors.username ? formik.errors.username : null}{" "}
              </p>
            </div>
            <div className="formField">
              <label className="formFieldLabel" for="phone">
                Số điện thoại: <span className="text-danger">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Số điện thoại"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="formFieldInput"
              />
              <p className="text-warning field_validate_label">
                {formik.errors.phoneError ? formik.errors.phoneError : null}{" "}
              </p>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Mật khẩu: <span className="text-danger">*</span>
              </label>
              <input
                className="formFieldInput"
                id="password"
                name="password"
                type="password"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <p className="text-warning field_validate_label">
                {formik.errors.password ? formik.errors.password : null}{" "}
              </p>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Vai trò: <span className="text-danger">*</span>
              </label>
              <Select
                className="mw-100"
                name="role"
                type="text"
                // isDisabled={categoryList.length === 0}
                options={roleList}
                value={selectedRole.label}
                placeholder="Chọn vai trò"
                onChange={(e) => setSelectedRole(e.value)}
              />
              <p className="text-warning field_validate_label">
                {formik.errors.password ? formik.errors.password : null}{" "}
              </p>
            </div>
            <Row>
              {/* Tạo loading button */}
              {isLoading ? (
                <Col md="6">
                  <Button type="submit" color="primary" className="float-left">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    Đang tạo tài khoản
                  </Button>
                </Col>
              ) : (
                <Col md="6">
                  <Button type="submit" color="primary" className="float-left">
                    Tạo tài khoản
                  </Button>
                </Col>
              )}
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Button onClick={() => toggle()} color="primary" className="mb-3">
        <i className="icon-plus"> </i> <b>Tạo người dùng</b>
      </Button>
      <UserTable />
    </div>
  );
};

export default Users;
