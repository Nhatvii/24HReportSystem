import React, { Component, Fragment } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Register from "../Register/Register";
import Login from "./Login";
import "./styles.css";
import MobileStoreButton from "react-mobile-store-button";
class Auth extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <BrowserRouter basename="/">
          <div className="App">
            <div className="appAside">
              <MobileStoreButton
                className="google-app"
                width="10.3rem"
                store="android"
                url="https://play.google.com/store/apps/details?id=com.bandainamcoent.imas_millionlive_theaterdays"
                linkProps={{ title: "24h Report Google Play App" }}
              />
              <MobileStoreButton
                className="itune-app"
                width="9rem"
                store="ios"
                url="https://apps.apple.com/us/app/pedsguide/id1094742963"
                linkProps={{ title: "24h Report App Store" }}
              />
            </div>
            <div className="appForm">
              <div className="formTitle">
                <NavLink
                  exact
                  id="login"
                  to="/login"
                  activeClassName="formTitleLink-active"
                  className="formTitleLink"
                >
                  Đăng nhập
                </NavLink>{" "}
                hoặc{" "}
                <NavLink
                  id="register"
                  to="/register"
                  activeClassName="formTitleLink-active"
                  className="formTitleLink"
                >
                  Đăng kí
                </NavLink>
              </div>
              <Route path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default Auth;
