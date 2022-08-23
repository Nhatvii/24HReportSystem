import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import "./styles.scss";
import { sendPasswordReset } from "../../../firebase";
import { useFormik } from "formik";

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
        <h2>Quên mật khẩu?</h2>
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
        </Row>
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
  );
};

export default ResetPassword;
