/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//router
import IndexRouters from "./router/index";
//scss
import "./assets/scss/hope-ui.scss";
import "./assets/scss/dark.scss";
import "./assets/scss/rtl.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/customizer.scss";
// import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
// import { HubConnectionBuilder } from "@microsoft/signalr";
import reportApi from "./api/reportApi";
import moment from "moment";
import taskApi from "./api/TaskApi";
import { getToken } from "firebase/messaging";
import { fetchToken, onMessageListener } from "./firebase";
import { Toast } from "react-bootstrap";
import userApi from "./api/UserApi";
function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user_info"));

  if (user_info !== null) {
    fetchToken(setTokenFound);
    onMessageListener()
      .then((payload) => {
        toast.success(payload.data.body);
        setNotification({
          title: payload.data.title,
          body: payload.data.body,
        });
        notificationList.push({
          title: payload.data.body,
          timestamp: moment(),
        });
        localStorage.setItem("user_notify", JSON.stringify(notificationList));
      })
      .catch((err) => console.log("Failed: ", err));
  }

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={10000} />
      <IndexRouters />
    </div>
  );
}

export default App;
