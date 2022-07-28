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
import registerApi from "../../../api/registerApi";
import loginApi from "../../../api/loginApi";
import userApi from "../../../api/UserApi";
import { Toast, ToastContainer } from "react-bootstrap";
import { firebase, auth } from "../../../firebase/firebase";
import OtpInput from "react-otp-input";
import { setTimeout } from "core-js";
import "../Login/styles.css";
//
const Register = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //OTP
  const [otp, setOtp] = useState("");
  const handleChange = (otp) => setOtp(otp);
  const [show, setShow] = useState(false);
  const [result, setResult] = useState("");
  const [modal, setModal] = useState(false);
  const [resetTime, setResetTime] = useState();

  const toggle = () => {
    setModal(!modal);
  };
  //Validate the input
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Cần nhập mật khẩu";
    } else if (!/[0-9a-zA-Z]{6,}/.test(values.password)) {
      errors.password = "Mật khẩu cần ít nhất 6 kí tự";
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
    if (!values.phone) {
      errors.phoneError = "Cần số điện thoại để nhận mã xác nhận.";
    } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.phone)) {
      errors.phoneError = "Số điện thoại không đúng.";
    }
    return errors;
  };

  //Đăng kí
  async function register_user(values) {
    setIsLoading(true);
    try {
      const json = JSON.stringify({
        email: values.email,
        roleId: 1,
        phoneNumber: values.phone,
        password: values.password,
        isAuthen: false,
      });
      const response = await registerApi.createUser(json);
      if (!JSON.stringify(response).includes("error")) {
        const params = { email: email, isAuthen: true };
        const response = await userApi.update(params);
        if (!JSON.stringify(response).includes("error")) {
          const params = {
            account: email,
            password: password,
          };
          const loginResponse = await loginApi.getAll(params);
          console.log(loginResponse);
          if (!JSON.stringify(loginResponse).includes("error")) {
            //lấy dữ liệu đăng Nhập
            localStorage.setItem("user_info", JSON.stringify(loginResponse));
            setIsLoading(false);
            window.location.href = "/";
          }
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
    },
    validate,
    onSubmit: async (values) => {
      const params = { email: values.email, phone: values.phone };
      const response = await registerApi.checkUserRegister(params);
      if (
        JSON.stringify(response).includes(
          "Email & Phone Number already exist!!!"
        )
      ) {
        setErrorMessage(response.error.message);
      } else if (
        JSON.stringify(response).includes("Phone Number already exist!!!")
      ) {
        setErrorMessage(response.error.message);
      } else if (
        JSON.stringify(response).includes(
          "Email này đã tồn tại. Vui lòng chọn Email khác!!!"
        )
      ) {
        setErrorMessage(response.error.message);
      } else {
        setEmail(values.email);
        setPassword(values.password);
        setShow(true);
        setSuccessMessage("Xin xác nhận số điện thoại");
        auth
          .signInWithPhoneNumber(
            "+84" + values.phone.substring(1, values.phone),
            window.recaptchaVerifier
          )
          .then((result) => {
            setResetTime(30);
            setResult(result);
            setModal(!modal);
            setValues(values);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  // const SkipValidation = async () => {
  //   const params = { email: email, isAuthen: true };
  //   const response = userApi.update(params);
  //   if (!JSON.stringify(response).includes("error")) {
  //     const params = {
  //       account: email,
  //       password: password,
  //     };
  //     const loginResponse = loginApi.getAll(params);
  //     console.log(loginResponse);
  //     if (!JSON.stringify(response).includes("error")) {
  //       //lấy dữ liệu đăng Nhập
  //       localStorage.setItem("user_info", JSON.stringify(loginResponse));
  //       setIsLoading(false);
  //       window.location.href = "/home";
  //     }
  //   }
  // };
  const ValidateOtp = async () => {
    if (otp === null) return;
    result
      .confirm(otp)
      .then(async (result) => {
        setErrorMessage("");
        setSuccessMessage("Xác thực thành công");
        //Đăng kí
        register_user(values);
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage("Mã xác thực không đúng. Xác thực thất bại.");
      });
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    console.log(resetTime);
    if (resetTime !== undefined) {
      if (resetTime > 0) {
        setTimeout(() => setResetTime(resetTime - 1), 1000);
      } else {
        setResetTime(resetTime + 30);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      }
    }
    setTimeout(() => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }, 30000);
  }, [resetTime]);
  return (
    <>
      <div className="form-center">
        <Modal
          isOpen={modal}
          toggle={() => toggle()}
          size="lg"
          style={{ maxWidth: "35rem", width: "40%", paddingTop: "15rem" }}
        >
          <ModalHeader className="bg-primary" toggle={() => toggle()}>
            Xác nhận Số điện thoại
          </ModalHeader>
          <ModalBody>
            <div className="col-md-12">
              <OtpInput
                shouldAutoFocus="true"
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "20px 1rem",
                  fontSize: "1rem",
                  borderRadius: 4,
                  padding: "auto",
                  border: "2px solid rgba(0,0,0,0.3)",
                }}
                id="recaptcha-container"
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span>-</span>}
              />
              <p className="text-danger">{errorMessage}</p>
              <p className="text-success">{successMessage}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <span>
              Mã các nhận{" "}
              <Button color="link" className="change-text px-0 text-bold">
                reset
              </Button>{" "}
              sau <b>{resetTime}</b> giây.
            </span>
            {/* <Button onClick={() => SkipValidation()} color="secondary">
              Xác thực sau
            </Button> */}
            {isLoading ? (
              <Button color="info">Đang đăng nhập</Button>
            ) : (
              <Button onClick={() => ValidateOtp()} color="info">
                Xác nhận
              </Button>
            )}
          </ModalFooter>
        </Modal>
        <form className="formFields" onSubmit={formik.handleSubmit}>
          <h2>Đăng kí</h2>
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
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="formFieldInput"
            />
            <p className="text-warning field_validate_label">
              {formik.errors.email ? formik.errors.email : null}{" "}
            </p>
          </div>
          <div className="formField">
            <label className="formFieldLabel" for="email">
              Số điện thoại: <span className="text-danger">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Số điện thoại"
              autoComplete="phone"
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
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="text-warning field_validate_label">
              {formik.errors.password ? formik.errors.password : null}{" "}
            </p>
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Nhập lại mật khẩu: <span className="text-danger">*</span>
            </label>
            <input
              className="formFieldInput"
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              autoComplete="repeatPassword"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
            />
            <p className="text-warning field_validate_label">
              {formik.errors.repeatPassword
                ? formik.errors.repeatPassword
                : null}{" "}
            </p>
          </div>
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
            <Col md="6" className="text-right">
              <Button color="link" className="px-0">
                <a href="/login">Đã có tải khoản?</a>
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
    </>
  );
};

export default Register;
