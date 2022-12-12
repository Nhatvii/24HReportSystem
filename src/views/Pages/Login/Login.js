/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import loginApi from "../../../api/loginApi";
import "./styles.scss";
import ImgAsset from "../../../assets/img/index.js";
const Login = (props) => {
  // const { history } = props;
  const [isLoading, setIsLoading] = useState(false);
  // const [values, setValues] = useState([]);
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
      if (!JSON.stringify(response).includes("error")) {
        localStorage.setItem("user_info", JSON.stringify(response));
        if (response.role.roleId === 1) {
          window.location.href = "/";
        } else {
          window.location.href =
            "https://report-24h-admin.azurewebsites.net/auth/sign-in";
        }
      } else {
        toast.error("Thông tin đăng nhập không chính xác hãy kiểm tra lại.");
      }
      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="form-center">
      <form className="formFields" onSubmit={formik.handleSubmit}>
        <div className="modalLogin_modalLogin">
          <div className="Popup">
            <img className="bgbox" alt="img" src={ImgAsset.modalLogin_bgbox} />
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
            <div id="recaptcha-container"></div>
            {isLoading ? (
              <Button type="submit" color="primary" className="">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                <span className="ngnhp_1">Đang đăng nhập</span>
              </Button>
            ) : (
              <>
                <Button type="submit" color="primary" className="">
                  <span className="ngnhp_1">Đăng nhập</span>
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
                <div className="Rectangle_5" />
              </Button>
            ) : (
              <>
                <Button type="submit" color="primary" className="">
                  <div className="Rectangle_5" />
                </Button>
              </>
            )}
            <span className="ngnhp">Đăng nhập</span>
            <span className="EmailSinthoi">
              Số điện thoại{"  "}
              <span
                className="text-warning field_validate_label"
                style={{ fontSize: 11 }}
              >
                {formik.errors.account ? formik.errors.account : null}
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
            <a href="/reset-password" className="px-0 float-right">
              <span className="Qunmtkhu">Quên mật khẩu?</span>
            </a>
            <a href="/register" className="px-0 float-right">
              <span className="Register">Đăng kí ngay</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
