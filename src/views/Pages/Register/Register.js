import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ImgAsset from "../../../assets/img/index.js";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import registerApi from "../../../api/registerApi";
import loginApi from "../../../api/loginApi";
import userApi from "../../../api/UserApi";
import { firebase, auth } from "../../../firebase/firebase";
import OtpInput from "react-otp-input";
import { setTimeout } from "core-js";
import "../Login/styles.scss";
//
const Register = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //OTP
  const [otp, setOtp] = useState("");
  const handleChange = (otp) => setOtp(otp);
  const [result, setResult] = useState("");
  const [modal, setModal] = useState(false);
  const [resetTime, setResetTime] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  //Validate the input
  const validate = (values) => {
    console.log(values.username);
    const errors = {};
    if (!values.username) {
      errors.username = "Cần nhập tên người dùng";
    } else if (!/[0-9a-zA-Z ]{5,}/.test(values.username)) {
      errors.username = "Tên người dùng cần ít nhất 5 kí tự";
    }
    if (!values.password) {
      errors.password = "Cần nhập mật khẩu";
    } else if (!/[0-9a-zA-Z]{6,}/.test(values.password)) {
      errors.password = "Mật khẩu cần ít nhất 6 kí tự";
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = "Cần xác nhận mật khẩu";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Mật khẩu không khớp";
    }
    if (!values.account) {
      errors.account = "Cần nhập số điện thoại";
    } else if (isNaN(values.account) === true) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.account)) {
        errors.account = "Không đúng định dạng email ";
      } else {
        setEmail(values.account);
      }
    } else if (isNaN(values.account) === false) {
      if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(values.account)) {
        errors.account = "Không đúng định dạng số điện thoại ";
      } else {
        setPhone(values.account);
      }
    }
    return errors;
  };
  //Đăng kí
  async function register_user(values) {
    setIsLoading(true);
    try {
      const json1 = JSON.stringify({
        email: values.account,
        roleId: 1,
        password: values.password,
        username: values.username,
        isAuthen: false,
      });
      const json2 = JSON.stringify({
        roleId: 1,
        phoneNumber: values.account,
        password: values.password,
        username: values.username,
        isAuthen: false,
      });
      if (phone !== "") {
        const response = await registerApi.createUser(json2);
        if (!JSON.stringify(response).includes("error")) {
          console.log(response);
          const params = { accountID: response.accountId, isAuthen: true };
          const updateResponse = await userApi.update(params);
          if (!JSON.stringify(updateResponse).includes("error")) {
            const params = {
              account: phone,
              password: password,
            };
            const loginResponse = await loginApi.getAll(params);
            if (!JSON.stringify(loginResponse).includes("error")) {
              //lấy dữ liệu đăng Nhập
              localStorage.setItem("user_info", JSON.stringify(loginResponse));
              setIsLoading(false);
              window.location.href = "/";
            }
          }
        } else {
          toast.error(response.error.message);
        }
      } else if (email !== "") {
        const response = await registerApi.createUser(json1);
        if (!JSON.stringify(response).includes("error")) {
          const params = { accountID: response.accountId, isAuthen: true };
          const updateResponse = await userApi.update(params);
          if (!JSON.stringify(updateResponse).includes("error")) {
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
          toast.error(response.error.message);
        }
      }

      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
    }
  }
  //
  const formik = useFormik({
    initialValues: {
      username: "",
      account: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const params = { email: email, phone: phone };
      const response = await registerApi.checkUserRegister(params);
      if (
        JSON.stringify(response).includes(
          "Email & Phone Number already exist!!!"
        )
      ) {
        toast.error(response.error.message);
      } else if (
        JSON.stringify(response).includes("Phone Number already exist!!!")
      ) {
        toast.error(response.error.message);
      } else if (
        JSON.stringify(response).includes(
          "Email này đã tồn tại. Vui lòng chọn Email khác!!!"
        )
      ) {
        toast.error(response.error.message);
      } else {
        setEmail(values.account);
        setPassword(values.password);
        if (phone !== "") {
          toast.success("Xin xác nhận số điện thoại");
          console.log(values.account);
          auth
            .signInWithPhoneNumber(
              "+84" + values.account.substring(1, values.phone),
              window.recaptchaVerifier
            )
            .then((result) => {
              console.log("first");
              setResetTime(30);
              setResult(result);
              setModal(!modal);
              setValues(values);
            })
            .catch((err) => {
              toast.error(err);
            });
        } else {
          register_user(values);
        }
      }
    },
  });
  const ValidateOtp = async () => {
    if (otp === null) return;
    result
      .confirm(otp)
      .then(async (result) => {
        setErrorMessage("");
        toast.success("Xác thực thành công");
        //Đăng kí
        register_user(values);
      })
      .catch((err) => {
        setSuccessMessage("");
        toast.error("Mã xác thực không đúng. Xác thực thất bại.");
      });
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
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
        <div id="recaptcha-container"></div>
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
              <Button color="primary">Đang đăng nhập</Button>
            ) : (
              <Button onClick={() => ValidateOtp()} color="primary">
                Xác nhận
              </Button>
            )}
          </ModalFooter>
        </Modal>
        <form className="formFields" onSubmit={formik.handleSubmit}>
          <div className="modalLogin_modalLogin">
            <div className="Popup">
              <img
                className="bgbox"
                alt="img"
                src={ImgAsset.modalLogin_bgbox}
              />
              <img
                className="IMAGE1"
                alt="img"
                src={ImgAsset.modalLogin_IMAGE1}
              />
              <img className="IMAGE2" alt="img" src={ImgAsset.logo} />
              <div className="ic_close">
                <a href="/">
                  <img
                    className="Mask"
                    alt="img"
                    src={ImgAsset.modalLogin_Mask}
                  />
                </a>
              </div>
              <div className="Rectangle_0">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="formFieldInput"
                  placeholder="Họ và tên"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="Rectangle_1">
                <input
                  id="account"
                  name="account"
                  type="text"
                  className="formFieldInput"
                  placeholder="Số điện thoại"
                  value={formik.values.account}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="Rectangle_2">
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
              <div className="Rectangle_6">
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
              </div>
              {isLoading ? (
                <Button type="submit" color="primary" className="">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  <span className="ngnhp_2">Đang tạo tài khoản</span>
                </Button>
              ) : (
                <>
                  <Button type="submit" color="primary" className="">
                    <span className="ngnhp_2">Đăng kí</span>
                  </Button>
                </>
              )}
              {isLoading ? (
                <Button type="submit" color="primary" className="">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  <div className="Rectangle_7" />
                </Button>
              ) : (
                <>
                  <Button type="submit" color="primary" className="">
                    <div className="Rectangle_7" />
                  </Button>
                </>
              )}
              <span className="ngnhp2">Đăng kí</span>
              <span className="EmailSinthoi">
                Số điện thoại{"  "}
                <span
                  className="text-warning field_validate_label"
                  style={{ fontSize: 11 }}
                >
                  {formik.errors.account ? formik.errors.account : null}
                </span>
              </span>
              <span className="Username">
                Họ tên{"  "}
                <span
                  className="text-warning field_validate_label"
                  style={{ fontSize: 11 }}
                >
                  {formik.errors.username ? formik.errors.username : null}
                </span>
              </span>
              <span className="Mtkhu">
                Mật khẩu{"  "}
                <span
                  className="text-warning field_validate_label"
                  style={{ fontSize: 11 }}
                >
                  {formik.errors.password ? formik.errors.password : null}
                </span>
              </span>
              <span className="Mtkhu2">
                Nhập lại mật khẩu{"  "}
                <span
                  className="text-warning field_validate_label"
                  style={{ fontSize: 11 }}
                >
                  {formik.errors.repeatPassword
                    ? formik.errors.repeatPassword
                    : null}
                </span>
              </span>
              <a href="/login" className="px-0 float-right">
                <span className="Login">Đã có tài khoản?</span>
              </a>
            </div>
          </div>
        </form>
        <br />
        <p>
          <a href="/">
            <b>
              <icon className="fa fa-angle-left" />
              &nbsp;Trang chủ
            </b>
          </a>
        </p>
      </div>
    </>
  );
};

export default Register;
