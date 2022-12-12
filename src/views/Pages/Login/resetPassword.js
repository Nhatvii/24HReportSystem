/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button } from "reactstrap";
import "./styles.scss";
import { sendPasswordReset } from "../../../firebase";
import { useFormik } from "formik";
import ImgAsset from "../../../assets/img/index.js";
const ResetPassword = () => {
  // const { history } = props;
  const [message, setMessage] = useState("");
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Cần nhập email";
    } else if (isNaN(values.email) === true) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Không đúng định dạng email ";
      } else {
        return;
      }
    }
    console.log(errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      sendPasswordReset(values.email);
      setMessage(
        "Hãy kiểm tra hòm thư.(Nếu không tìm thấy xin kiểm tra thư rác)"
      );
    },
  });
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
              <a href="/login">
                <img className="Mask" alt="img" src={ImgAsset.return} />
              </a>
            </div>
            <div className="Rectangle_1">
              <input
                id="email"
                name="email"
                type="text"
                className="formFieldInput"
                placeholder="Số điện thoại"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <Button type="submit" color="primary" className="">
              <span className="ngnhp_3">Xác nhận</span>
            </Button>
            <Button type="submit" color="primary" className="">
              <div className="Rectangle_8" />
            </Button>
            <span className="ngnhp">Quên mật khẩu?</span>
            <span className="EmailSinthoi">
              Nhập số điện thoại{"  "}
              <span
                className="text-warning field_validate_label"
                style={{ fontSize: 11 }}
              >
                {formik.errors.account ? formik.errors.account : null}
              </span>
            </span>
          </div>
        </div>
        {/* <h2>Quên mật khẩu?</h2>
        <div className="formField">
          <label className="formFieldLabel" for="account">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="formFieldInput"
            placeholder="Nhập email đã quên mật khẩu"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="info">{message}</p>
        </div>
        <Row>
          <Col md="6">
            <Button type="submit" color="primary" className="float-left">
              Gửi đến email
            </Button>
          </Col>
          <Col md="6" className="text-right">
            <Button color="link" className="px-0">
              <b>Đăng nhập ngay</b>
            </Button>
          </Col>
        </Row> */}
      </form>
    </div>
  );
};

export default ResetPassword;
