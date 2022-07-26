import React, { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { fetchToken, onMessageListener } from "./firebase";
import Routes from "./containers/__Routes";
import ScrollTopButton from "./components/ScrollTopButton";

const App = (props) => {
  const { error, success } = props;
  if (error) toast.error(error);
  if (success) toast.success(success);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [getFcmToken, setFcmToken] = useState("");
  fetchToken(setTokenFound, setFcmToken);
  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
    })
    .catch((error) => console.log(error));
  return (
    <Fragment>
      {props.loading && <h1>loading...</h1>}
      <Routes />
      <ToastContainer position="top-center" />
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
