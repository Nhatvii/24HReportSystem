import React from "react";
import Loadable from "react-loadable";
import { Row } from "reactstrap";
import { AdminLayout, UserLayout } from "./containers";

function Loading() {
  return (
    <Row className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Row>
  );
}
const Home = Loadable({
  loader: () => import("./views/UserViews/Home"),
  loading: Loading,
});
const Auth = Loadable({
  loader: () => import("./views/Pages/Login/Auth"),
  loading: Loading,
});
const ViewAllPosts = Loadable({
  loader: () => import("./views/UserViews/Home/components/ViewAllPost"),
  loading: Loading,
});
const SendReport = Loadable({
  loader: () => import("./views/UserViews/SendReport"),
  loading: Loading,
});
const ViewReport = Loadable({
  loader: () => import("./views/UserViews/ViewReport"),
  loading: Loading,
});
const FAQ = Loadable({
  loader: () => import("./views/UserViews/FAQ"),
  loading: Loading,
});
// Admin
const Dashboard = Loadable({
  loader: () => import("./views/AdminViews/Dashboard"),
  loading: Loading,
});
const Users = Loadable({
  loader: () => import("./views/AdminViews/Users"),
  loading: Loading,
});
const RootCategories = Loadable({
  loader: () => import("./views/AdminViews/Categories/RootCategories"),
  loading: Loading,
});
const SubCategories = Loadable({
  loader: () => import("./views/AdminViews/Categories/SubCategories"),
  loading: Loading,
});
const StaffCreateReport = Loadable({
  loader: () => import("./views/UserViews/SendReport/SendReport"),
  loading: Loading,
});
const AllNewReports = Loadable({
  loader: () => import("./views/AdminViews/Reports/AllNewReports"),
  loading: Loading,
});
const UnreadNewReports = Loadable({
  loader: () => import("./views/AdminViews/Reports/UnreadNewReports"),
  loading: Loading,
});
const ReadNewReports = Loadable({
  loader: () => import("./views/AdminViews/Reports/ReadNewReports"),
  loading: Loading,
});
const PendingReports = Loadable({
  loader: () => import("./views/AdminViews/Reports/PendingReports"),
  loading: Loading,
});
const ApprovedReports = Loadable({
  loader: () => import("./views/AdminViews/Reports/ApprovedReports"),
  loading: Loading,
});
const DeniedReports = Loadable({
  loader: () => import("./views/AdminViews/Reports/DeniedReports"),
  loading: Loading,
});
const MyPosts = Loadable({
  loader: () => import("./views/AdminViews/Posts/MyPosts"),
  loading: Loading,
});
const PublishedPosts = Loadable({
  loader: () => import("./views/AdminViews/Posts/PublishedPosts"),
  loading: Loading,
});
const Board = Loadable({
  loader: () => import("./views/AdminViews/Task/Boards/Boards"),
  loading: Loading,
});
const MyTask = Loadable({
  loader: () => import("./views/AdminViews/Task/Tasks/MyTask"),
  loading: Loading,
});
const Tasks = Loadable({
  loader: () => import("./views/AdminViews/Task/Tasks/Tasks"),
  loading: Loading,
});
const UnPublishedPosts = Loadable({
  loader: () => import("./views/AdminViews/Posts/UnPublishedPosts"),
  loading: Loading,
});
const CreatePost = Loadable({
  loader: () => import("./views/AdminViews/Posts/CreatePost"),
  loading: Loading,
});
const PostDetail = Loadable({
  loader: () => import("./views/UserViews/Post/PostDetail"),
  loading: Loading,
});
const UserProfile = Loadable({
  loader: () => import("./views/Pages/Profile/profile"),
  loading: Loading,
});
const AdminProfile = Loadable({
  loader: () => import("./views/Pages/Profile/profile"),
  loading: Loading,
});

const routes = [
  { path: "/", name: "24h Report", component: UserLayout, exact: true },
  {
    path: "/auth#/login",
    name: "Auth",
    component: Auth,
    exact: true,
  },
  { path: "/home", name: "Trang chủ", component: Home },
  {
    path: "/sendReport",
    name: "Gửi báo cáo",
    component: SendReport,
  },
  {
    path: "/view-all",
    name: "Xem tất cả",
    component: ViewAllPosts,
  },
  {
    path: "/viewReport",
    name: "Xem phản hồi",
    role: ["User"],
    component: ViewReport,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminLayout,
    exact: true,
  },
  {
    path: "/user/profile",
    name: "User Profile",
    component: UserProfile,
    exact: true,
  },
  {
    path: "/admin/profile",
    name: "Admin Profile",
    component: AdminProfile,
    exact: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    role: ["Admin", "Editor", "Editor Manager"],
    component: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    role: ["Admin", "Editor", "Editor Manager"],
    component: Users,
  },
  {
    path: "/root-categories",
    name: "Root Categories",
    role: ["Admin", "Editor", "Editor Manager"],
    component: RootCategories,
  },
  {
    path: "/sub-categories",
    name: "Sub Categories",
    role: ["Admin", "Editor", "Editor Manager"],
    component: SubCategories,
  },
  {
    path: "/report/create",
    name: "Create new report",
    role: ["Editor Manager", "Staff"],
    component: StaffCreateReport,
  },
  {
    path: "/reports/new/all",
    name: "All new Reports",
    role: ["Admin", "Editor", "Editor Manager"],
    component: AllNewReports,
  },
  {
    path: "/reports/new/unread",
    name: "Unread Reports",
    role: ["Admin", "Editor", "Editor Manager"],
    component: UnreadNewReports,
  },
  {
    path: "/reports/new/read",
    name: "Read Reports",
    role: ["Admin", "Editor", "Editor Manager"],
    component: ReadNewReports,
  },
  {
    path: "/reports/pending",
    name: "Reports",
    role: ["Admin", "Editor", "Editor Manager"],
    component: PendingReports,
  },
  {
    path: "/reports/approved",
    name: "Reports",
    role: ["Admin", "Editor", "Editor Manager"],
    component: ApprovedReports,
  },
  {
    path: "/reports/denied",
    name: "Reports",
    role: ["Admin", "Editor", "Editor Manager"],
    component: DeniedReports,
  },
  {
    path: "/my-posts",
    name: "My Posts",
    role: ["Admin", "Editor", "Editor Manager"],
    component: MyPosts,
  },
  {
    path: "/published-posts",
    name: "Published posts",
    role: ["Admin", "Editor", "Editor Manager"],
    component: PublishedPosts,
  },
  {
    path: "/unpublished-posts",
    name: "Unpublished Posts",
    role: ["Admin", "Editor", "Editor Manager"],
    component: UnPublishedPosts,
  },
  {
    path: "/create-post",
    name: "Create Post",
    role: ["Admin", "Editor", "Editor Manager"],
    component: CreatePost,
  },
  {
    path: "/task-boards",
    name: "Task Boards",
    role: ["Admin", "Editor", "Editor Manager"],
    component: Board,
  },
  {
    path: "/my-tasks",
    name: "My Tasks",
    role: ["Admin", "Editor", "Editor Manager"],
    component: MyTask,
  },
  {
    path: "/tasks",
    name: "Tasks",
    role: ["Admin", "Editor", "Editor Manager"],
    component: Tasks,
  },

  { path: "/postDetail/:id", name: "Post Detail", component: PostDetail },
];
export default routes;
