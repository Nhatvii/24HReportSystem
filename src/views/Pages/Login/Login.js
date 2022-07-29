import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import loginApi from "../../../api/loginApi";
import "./styles.css";

const Login = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //OTP phone login

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Cần nhập mật khẩu";
    }
    if (!values.account) {
      errors.account = "Cần nhập account /số điện thoại";
    } else if (isNaN(values.account) === true) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.account)) {
        errors.account = "Không đúng định dạng account ";
      } else {
        return;
      }
    } else if (isNaN(values.account) === false) {
      if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.account)) {
        errors.account = "Không đúng định dạng số điện thoại ";
      } else {
        return;
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      user_login(values);
    },
  });

  async function user_login(values) {
    setIsLoading(true);
    try {
      const json = JSON.stringify({
        account: values.account,
        password: values.password,
      });
      const response = await loginApi.getAll(json);
      console.log("Response", response);
      if (!JSON.stringify(response).includes("error")) {
        localStorage.setItem("user_info", JSON.stringify(response));
        if (response.role.roleId === 1) {
          window.location.href = "/";
        } else {
          window.location.href = "/admin";
        }
      } else {
        setErrorMessage(
          "Thông tin đăng nhập không chính xác hãy kiểm tra lại."
        );
        setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
    }
  }
  useEffect(() => {}, []);

  return (
    <div className="form-center">
      <form className="formFields" onSubmit={formik.handleSubmit}>
        <h2>Đăng nhập</h2>
        <p className="text-danger">{errorMessage}</p>
        <div className="formField">
          <label className="formFieldLabel" for="account">
            Email / Số điện thoại
          </label>
          <input
            id="account"
            name="account"
            type="text"
            className="formFieldInput"
            placeholder="Email / Số điện thoại"
            value={formik.values.account}
            onChange={formik.handleChange}
          />
        </div>
        <p className="text-warning field_validate_label">
          {formik.errors.account ? formik.errors.account : null}{" "}
        </p>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Mật khẩu
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
        </div>
        <p className="text-warning field_validate_label">
          {formik.errors.password ? formik.errors.password : null}{" "}
        </p>
        <div id="recaptcha-container"></div>
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
                Đang đăng nhập
              </Button>
            </Col>
          ) : (
            <Col md="6">
              <Button type="submit" color="primary" className="float-left">
                Đăng nhập
              </Button>
            </Col>
          )}
          <Col md="6" className="text-right">
            <Button color="link" className="px-0">
              Quên mật khẩu?
            </Button>
          </Col>
        </Row>
      </form>
      <br />
      <p>
        <a href="/">
          <icon className="fa fa-angle-left" />
          &nbsp;Trang chủ{" "}
        </a>
      </p>
    </div>
  );
};

export default Login;
