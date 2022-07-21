import React from "react";

export default {
  items: [
    {
      name: "Bảng điều khiển",
      url: "dashboard",
      icon: "icon-speedometer",
      role: ["Admin", "Editor Manager", "Editor", "Staff"],
    },
    //
    {
      title: true,
      name: "Quản lí",
      wrapper: {
        element: "",
        attributes: {},
      },
      class: "",
      role: ["Admin", "Editor Manager"],
    },
    {
      name: "Quản lý người dùng",
      url: "/users",
      icon: "icon-user",
      role: ["Admin", "Editor Manager"],
    },
    {
      name: "Quản lý danh mục gốc",
      url: "/root-categories",
      icon: "icon-list",
      role: ["Admin", "Editor Manager"],
    },
    {
      name: "Quản lý danh mục phụ",
      url: "/sub-categories",
      icon: "icon-list",
      role: ["Admin", "Editor Manager"],
    },
    {
      name: "Tạo báo cáo",
      url: "/report/create",
      icon: "icon-star",
      role: ["Staff", "Editor Manager"],
    },
    //
    {
      title: true,
      name: "Báo cáo",
      wrapper: {
        element: "",
        attributes: {},
      },
      class: "",
      role: ["Staff"],
    },
    {
      name: "Mới",
      url: "/reports/new",
      icon: "icon-star",
      role: ["Staff"],
      badge: {
        variant: "success",
        text: <i className="icon-star" />,
      },
      children: [
        {
          name: "Tất cả",
          path: "all",
          url: "/reports/new/all",
        },
        {
          name: "Chưa xem",
          path: "unread",
          url: "/reports/new/unread",
        },
        {
          name: "Đã xem",
          path: "read",
          url: "/reports/new/read",
        },
      ],
    },
    {
      name: "Đang xử lý",
      url: "/reports/pending",
      icon: "icon-hourglass",
      badge: {
        variant: "warning",
        text: <i className="icon-hourglass" />,
      },
      role: ["Staff"],
    },
    {
      name: "Đã xử lý",
      url: "/reports/approved",
      icon: "icon-check",
      badge: {
        variant: "primary",
        text: <i className="icon-check" />,
      },
      role: ["Staff"],
    },
    {
      name: "Đã từ chối",
      url: "/reports/denied",
      icon: "icon-ban",
      badge: {
        variant: "danger",
        text: <i className="icon-ban" />,
      },
      role: ["Staff"],
    },

    {
      title: true,
      name: "Editor",
      wrapper: {
        element: "",
        attributes: {},
      },
      class: "",
      role: ["Editor"],
    },
    {
      name: "Công việc của tôi",
      url: "/my-tasks",
      icon: "icon-pencil",
      role: ["Editor"],
    },
    {
      name: "Tạo bài viết",
      url: "/create-post",
      icon: "icon-pencil",
      role: ["Editor"],
    },
    {
      name: "Bài viết của tôi",
      url: "/my-posts",
      icon: "icon-pencil",
      role: ["Editor"],
    },
    {
      title: true,
      name: "Editor Manager",
      wrapper: {
        element: "",
        attributes: {},
      },
      class: "",
      role: ["Editor Manager"],
    },
    {
      name: "Bài viết chưa đăng",
      url: "/unpublished-posts",
      icon: "icon-pencil",
      role: ["Editor Manager"],
    },
    {
      name: "Bài viết đã đăng",
      url: "/published-posts",
      icon: "icon-pencil",
      role: ["Editor Manager"],
    },

    {
      name: "Tất cả công việc",
      url: "/task-boards",
      icon: "icon-pencil",
      role: ["Editor Manager"],
    },
  ],
};
