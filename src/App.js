import React, { Fragment, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import Routes from "./containers/__Routes";
import ScrollTopButton from "./components/ScrollTopButton";

const App = (props) => {
  const { error, success } = props;
  if (error) toast.error(error);
  if (success) toast.success(success);
  const user_info = JSON.parse(localStorage.getItem("user_info"));

  useEffect(() => {
    if (user_info) {
      if (user_info.role.roleId !== 1) {
        try {
          window.location.href = "/";
          localStorage.removeItem("user_info");
        } catch (e) {
          toast.error(e.message);
        }
      }
    }
  }, []);
  return (
    <Fragment>
      {props.loading && <h1>loading...</h1>}
      <Routes />
      <ToastContainer position="top-right" autoClose={10000} />
      <ScrollTopButton />
    </Fragment>
  );
};
const MapStateToProps = (state) => {
  return {
    error: state.meta.error,
    success: state.meta.success,
  };
};

export default connect(MapStateToProps)(App);
