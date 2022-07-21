import "./App.css";
import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AdminLayout, UserLayout } from "./containers";
import { Login, Register, Page404, Page500 } from "./views/Pages";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
//
import "rc-datetime-picker/dist/picker.min.css";
import "rc-datetime-picker/dist/picker.css";
// Import Main styles for this application
import "./assets/css/main.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
//
import Auth from "./views/Pages/Login/Auth";
import { fetchToken, onMessageListener } from "./firebase";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [getFcmToken, setFcmToken] = useState("");
  fetchToken(setTokenFound, setFcmToken);
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
    })
    .catch((error) => console.log(error));
  return (
    <div>
      <ToastContainer
        className="p-1"
        position="top-end"
        style={{ zIndex: 9999, width: "100%" }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={5000}
          autohide
          animation
          bg={"info"}
          style={{
            position: "absolute",
            width: "400px",
            minWidth: "400px",
            right: "20px",
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">{notification.title} </strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      </ToastContainer>
      <body className="App-body">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UserLayout} name="24hReport" />
            <Route path="/home" component={UserLayout} name="Home" />
            <Route path="/user/profile" component={UserLayout} name="Profile" />
            <Route
              path="/admin/profile"
              component={AdminLayout}
              name="
          Profile"
            />
            <Route
              path="/postDetail/:id"
              name="Post Detail"
              component={UserLayout}
            />
            <Route path="/view-all" component={UserLayout} name="Xem tất cả" />
            <Route
              path="/sendReport"
              component={UserLayout}
              name="Gửi báo cáo"
            />
            <Route path="/faq" component={UserLayout} name="FAQ" />
            <Route exact path="/auth" component={Auth} name="Authentication" />
            <Route path="/auth/login" name="Login Page" render={Auth} />
            <Route path="/register" name="Register Page" component={Auth} />
            {/* User  */}
            <Route
              path="/viewReport"
              component={UserLayout}
              name="Xem báo cáo"
            />
            {/* Admin */}
            <Route
              exact
              path="/admin"
              name="Admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/dashboard" name="Dashboard" component={AdminLayout} />
            <Route path="/users" name="Users" component={AdminLayout} />
            <Route
              path="/root-categories"
              name="Root Categories"
              component={AdminLayout}
            />
            <Route
              path="/sub-categories"
              name="Sub Categories"
              component={AdminLayout}
            />
            <Route
              path="/report/create"
              name="Create new report"
              component={AdminLayout}
            />
            <Route
              path="/reports/new/all"
              name="All New Reports"
              component={AdminLayout}
            />
            <Route
              path="/reports/new/unread"
              name="Unread New Reports"
              component={AdminLayout}
            />
            <Route
              path="/reports/new/read"
              name="Read New Reports"
              component={AdminLayout}
            />
            <Route
              path="/reports/pending"
              name="Pending Reports"
              component={AdminLayout}
            />
            <Route
              path="/reports/approved"
              name="Approved Reports"
              component={AdminLayout}
            />
            <Route
              path="/reports/denied"
              name="Denied Reports"
              component={AdminLayout}
            />
            <Route
              path="/create-post"
              name="Create Post"
              component={AdminLayout}
            />
            <Route path="/my-posts" name="My Posts" component={AdminLayout} />
            <Route
              path="/published-posts"
              name="Published Posts"
              component={AdminLayout}
            />
            <Route
              path="/unpublished-posts"
              name="Unpublished Posts"
              component={AdminLayout}
            />
            <Route
              path="/task-boards"
              name="Task Boards"
              component={AdminLayout}
            />
            <Route path="/my-tasks" name="My Tasks" component={AdminLayout} />
            <Route path="/tasks" name="Tasks" component={AdminLayout} />
            {/*  */}
            <Route path="/404" name="Page 404" component={Page404} />
            <Route path="/500" name="Page 500" component={Page500} />
            <Route path="*" name="Page 404" component={Page404} />
          </Switch>
        </BrowserRouter>
      </body>
    </div>
  );
}
export default App;
