import React from "react";
import Loadable from "react-loadable";
import { Row } from "reactstrap";

function Loading() {
  return (
    <Row className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Row>
  );
}
const StaffCreateReport = Loadable({
  loader: () => import("./views/Pages/SendReport"),
  loading: Loading,
});
const PostDetail = Loadable({
  loader: () => import("./views/UserViews/Post/PostDetail"),
  loading: Loading,
});

const AdminProfile = Loadable({
  loader: () => import("./views/Pages/Profile/profile"),
  loading: Loading,
});

const routes = [
  {
    path: "/admin/profile",
    name: "Admin Profile",
    component: AdminProfile,
    exact: true,
  },
  {
    path: "/report/create",
    name: "Create new report",
    role: ["Editor Manager", "Staff"],
    component: StaffCreateReport,
  },
  { path: "/postDetail/:id", name: "Post Detail", component: PostDetail },
];
export default routes;
