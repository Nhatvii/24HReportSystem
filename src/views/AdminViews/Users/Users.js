import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useFormik } from "formik";
import UserTable from "../components/UserTables/UserTable";

const Users = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if (!values.repeatPassword) {
      errors.repeatPassword = "Cần xác nhận mật khẩu";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Mật khẩu không khớp";
    }
    return errors;
  };
  //Đăng kí
  async function register_user(values) {
    try {
      const json = JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      // const response = await loginApi.getAll(json);
      // console.log("Response", response);
      // if (response.statusCode === 200) {
      //   history.push("/");
      // }
    } catch (e) {
      alert(e.message);
    }
  }
  //
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("Param: ", values);
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
        style={{ maxWidth: "800px", width: "80%", paddingTop: "15rem" }}
      >
        <ModalHeader className="bg-primary" toggle={() => toggle()}>
          Tạo người dùng
        </ModalHeader>
        <ModalBody>
          <p className="text-warning field_validate_label">
            {formik.errors.username ? formik.errors.username : null}
          </p>
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                id="username"
                placeholder="Tên tài khoản"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <p className="text-warning field_validate_label">
              {formik.errors.email ? formik.errors.email : null}
            </p>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="username"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <p className="text-warning field_validate_label">
              {formik.errors.password ? formik.errors.password : null}
            </p>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mật khẩu"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <p className="text-warning field_validate_label">
              {formik.errors.repeatPassword
                ? formik.errors.repeatPassword
                : null}
            </p>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                autoComplete="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <Button type="submit" color="primary" className="float-right">
              Tạo tài khoản
            </Button>
          </Form>
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
