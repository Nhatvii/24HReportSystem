import React, { Component, Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Register from "../Register/Register";
import Login from "./Login";
import "./styles.scss";
import ResetPassword from "./resetPassword";
class Auth extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter basename="/">
          <div className="App">
            <div className="appForm">
              <Route path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/reset-password" component={ResetPassword} />
            </div>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default Auth;
