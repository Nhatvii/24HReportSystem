import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../_PrivateRoute";
import HomePage from "../HomePage";
import EntertainmentPage from "../EntertainmentPage";
import FeaturePage from "../FeaturePage";
import TrendingPage from "../TrendingPage";
import AboutUsPage from "../AboutUsPage";
import ArchivePage from "../ArchivePage";
import ContactUsPage from "../ContactUsPage";
import NotFoundPage from "../NotFoundPage";
import PostOnePage from "../PostOnePage";
import PublicRoute from "../_PublicRoute";
import Auth from "../../views/Pages/Login/Auth";
import { SendReport } from "../../views/Pages";
import { ViewReport } from "../../views/UserViews/ViewReport/index.js";
import { FAQ } from "../../views/UserViews/FAQ/index.js";
import { Profile } from "../../views/Pages/Profile/profile";
import { AdminLayout } from "../AdminLayout/AdminLayout";
import AdminRoute from "../_AdminRoute";
import SearchPage from "../SearchPage";
const Routes = () => {
  return (
    <Switch>
      <PublicRoute exact path="/login" parentClass="theme-1" component={Auth} />
      {/* admin routes */}
      <AdminRoute
        exact
        path="/admin"
        parentClass="theme-1"
        component={AdminLayout}
      />
      <AdminRoute
        exact
        path="/dashboard"
        parentClass="theme-1"
        component={AdminLayout}
      />
      <AdminRoute
        exact
        path="/users"
        parentClass="theme-1"
        component={AdminLayout}
      />
      <AdminRoute
        exact
        parentClass="theme-1"
        path="/admin/profile"
        component={AdminLayout}
        name="Admin Profile"
      />
      <AdminRoute
        parentClass="theme-1"
        path="/root-categories"
        name="Root Categories"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/sub-categories"
        name="Sub Categories"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/report/create"
        name="Create new report"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/reports/new/all"
        name="All New Reports"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/reports/new/unread"
        name="Unread New Reports"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/reports/new/read"
        name="Read New Reports"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/reports/pending"
        name="Pending Reports"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/reports/approved"
        name="Approved Reports"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/reports/denied"
        name="Denied Reports"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/create-post"
        name="Create Post"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/my-posts"
        name="My Posts"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/published-posts"
        name="Published Posts"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/unpublished-posts"
        name="Unpublished Posts"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/task-boards"
        name="Task Boards"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/my-tasks"
        name="My Tasks"
        component={AdminLayout}
      />
      <AdminRoute
        parentClass="theme-1"
        path="/tasks"
        name="Tasks"
        component={AdminLayout}
      />
      {/*home one routes*/}
      <PrivateRoute parentClass="theme-1" exact path="/" component={HomePage} />
      <PrivateRoute
        exact
        path="/user/profile"
        parentClass="theme-1"
        component={Profile}
      />
      <PrivateRoute
        exact
        path="/send-report"
        parentClass="theme-1"
        component={SendReport}
      />
      <PrivateRoute
        exact
        path="/view-report"
        parentClass="theme-1"
        component={ViewReport}
      />
      <PrivateRoute exact path="/faq" parentClass="theme-1" component={FAQ} />
      <PrivateRoute
        exact
        path="/search"
        parentClass="theme-1"
        component={SearchPage}
      />
      <PrivateRoute
        exact
        path="/entertainment"
        parentClass="theme-1"
        component={EntertainmentPage}
      />
      <PrivateRoute
        exact
        path="/features"
        parentClass="theme-1"
        component={FeaturePage}
      />
      <PrivateRoute
        exact
        path="/trending"
        parentClass="theme-1"
        component={TrendingPage}
      />
      <PrivateRoute
        exact
        path="/about"
        parentClass="theme-1"
        component={AboutUsPage}
      />
      <PrivateRoute
        exact
        path="/archive"
        parentClass="theme-1"
        component={ArchivePage}
      />
      <PrivateRoute
        exact
        path="/contact"
        parentClass="theme-1"
        component={ContactUsPage}
      />
      <PrivateRoute
        exact
        path="/404"
        parentClass="theme-1"
        component={NotFoundPage}
      />
      <PrivateRoute
        exact
        path="/post-detail/:id"
        parentClass="theme-1"
        component={PostOnePage}
      />

      <Route exact component={NotFoundPage} />
    </Switch>
  );
};
export default Routes;
