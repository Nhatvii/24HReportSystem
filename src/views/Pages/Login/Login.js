import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import loginApi from "../../../api/loginApi";
import "./styles.scss";
import { signInWithGoogle } from "../../../firebase";

const Login = (props) => {
  // const { history } = props;
  const [isLoading, setIsLoading] = useState(false);
  // const [values, setValues] = useState([]);
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
          window.location.href =
            "https://report-24h-admin.azurewebsites.net/auth/sign-in";
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
            <>
              <Col md={4}>
                <Button type="submit" color="primary" className="float-left">
                  Đăng nhập
                </Button>
              </Col>
              <Col md={8}>
                <div className="google-btn" onClick={signInWithGoogle}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <p className="btn-text ">
                    <b>Đăng nhập bằng Google</b>
                  </p>
                </div>
              </Col>
            </>
          )}
        </Row>
      </form>
      <br />
      <Row>
        <Col md={6}>
          <p>
            <a href="/">
              <b>
                <icon className="fa fa-angle-left" />
                &nbsp;Trang chủ
              </b>
            </a>
          </p>
        </Col>
        <Col md={6}>
          <a href="/reset-password" className="px-0 float-right">
            <b>Quên mật khẩu?</b>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
