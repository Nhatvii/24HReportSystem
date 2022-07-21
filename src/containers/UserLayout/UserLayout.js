import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import { AppHeader } from "@coreui/react";
// routes config
import routes from "../../routes";
import UserFooter from "./UserFooter";
import { Home } from "../../views";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";
import AdminHeader from "../AdminLayout/AdminHeader";

class UserLayout extends Component {
  render() {
    const user_info = JSON.parse(localStorage.getItem("user_info"));

    return (
      <div className="app">
        <AppHeader fixed>
          {user_info !== null ? (
            user_info.role.roleId === 1 ? (
              <UserHeader />
            ) : (
              <AdminHeader />
            )
          ) : (
            <GuestHeader />
          )}
        </AppHeader>

        <div className="app-body">
          <main className="main ">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/home" />
              </Switch>
            </Container>
          </main>
        </div>
        <UserFooter />
      </div>
    );
  }
}

export default UserLayout;
