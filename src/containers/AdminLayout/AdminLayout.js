import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import AdminAside from "./AdminAside";
import AdminFooter from "./AdminFooter";
const AdminLayout = (props) => {
  const { history } = props;
  const [menu, setMenu] = useState({ items: [] });
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  // If normal user want to access the admin page redirect to login
  if (user_info === null || user_info.role.roleId === 1)
    history.push("/auth#/login");
  useEffect(() => {
    user_info &&
      setMenu({
        items: navigation.items.filter((menu) =>
          menu.role.includes(user_info.role.roleName)
        ),
      });
  }, []);
  return (
    <div className="app">
      <AppHeader fixed>
        <AdminHeader />
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <AppSidebarNav navConfig={menu} {...props} />
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} />
          <Container fluid>
            <Switch>
              {routes.map((route, idx) => {
                return route.component &&
                  user_info !== null &&
                  user_info.role.roleId !== 1 ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect from="/admin" to="/dashboard" />
            </Switch>
          </Container>
        </main>
        <AppAside fixed>
          <AdminAside />
        </AppAside>
      </div>
      <AppFooter>
        <AdminFooter />
      </AppFooter>
    </div>
  );
};

export default AdminLayout;
