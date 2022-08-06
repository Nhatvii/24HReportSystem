import React, { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { fetchToken, onMessageListener } from "./firebase";
import Routes from "./containers/__Routes";
import ScrollTopButton from "./components/ScrollTopButton";
import taskApi from "./api/TaskApi";

const App = (props) => {
  const { error, success } = props;
  if (error) toast.error(error);
  if (success) toast.success(success);
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [getFcmToken, setFcmToken] = useState("");
  fetchToken(setTokenFound, setFcmToken);
  onMessageListener()
    .then(async (payload) => {
      console.log(payload);
      //
      if (payload.data.key1 === "CREATE_NEW_TASK") {
        const param = { id: payload.data.key2 };
        const response = await taskApi.getById(param);
        if (
          response !== null &&
          user_info.role.roleId === 3 &&
          user_info.email === response.editorId
        ) {
          setNotification({
            title: payload.notification.title,
            body: payload.notification.body,
          });
          toast.success(payload.notification.body);
        }
      }
      //
    })
    .catch((error) => console.log(error));
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
