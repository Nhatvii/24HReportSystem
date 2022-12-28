import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";
export const SpaceIcon = styled.div`
  margin-right: 0.5rem;
`;
const VerticalNav = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  //location
  useEffect(() => {
    if (
      user_info === null ||
      (user_info !== null && user_info.role.roleId === 1)
    ) {
      window.location.href = "/auth/sign-in";
    }
  });
  let location = useLocation();
  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Tổng quan</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`${
              location.pathname === "/admin/dashboard" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/admin/dashboard"
            onClick={() => {}}
          >
            <SpaceIcon>
              <i className="fa fa-solid fa-chart-line"></i>
            </SpaceIcon>
            <span className="item-name">Bảng điều khiển</span>
          </Link>
        </li>
        {user_info && user_info.role.roleId === 5 && (
          <li className="nav-item">
            <Link
              className={`${
                location.pathname === "/users" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/admin/users"
              onClick={() => {}}
            >
              <SpaceIcon>
                <i className="fa fa-solid fa-users"></i>
              </SpaceIcon>

              <span className="item-name">Danh sách người dùng</span>
            </Link>
          </li>
        )}
        {user_info && user_info.role.roleId === 4 && (
          <li className="nav-item">
            <Link
              className={`${
                location.pathname === "/employees" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/admin/employees"
              onClick={() => {}}
            >
              <SpaceIcon>
                <i className="fa fa-solid fa-user-tag"></i>
              </SpaceIcon>

              <span className="item-name">Danh sách nhân viên</span>
            </Link>
          </li>
        )}
        {user_info && user_info.role.roleId === 5 && (
          <>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/category/root" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/category/root"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-tag"></i>
                </SpaceIcon>

                <span className="item-name">Danh mục gốc</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/category/sub" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/category/sub"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-tags"></i>
                </SpaceIcon>

                <span className="item-name">Danh mục phụ</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/office" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/office"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-building"></i>
                </SpaceIcon>
                <span className="item-name">Danh sách văn phòng</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/officer" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/officer"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-user-nurse"></i>
                </SpaceIcon>

                <span className="item-name">Danh sách người hỗ trợ</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/scripts" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/scripts"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-terminal"></i>
                </SpaceIcon>

                <span className="item-name">Scripts</span>
              </Link>
            </li>
          </>
        )}
        {user_info && user_info.role.roleId === 2 && (
          <>
            <li className="nav-item static-item">
              <Link
                className="nav-link static-item disabled"
                to="#"
                tabIndex="-1"
              >
                <span className="default-icon">Nhân viên</span>
                <span className="mini-icon">-</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/create-report" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/create-report"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-file-signature"></i>
                </SpaceIcon>

                <span className="item-name">Tạo báo cáo</span>
              </Link>
            </li>
            <li>
              <hr className="hr-horizontal" />
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/reports" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/reports"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-list"></i>
                </SpaceIcon>

                <span className="item-name">Danh sách báo cáo</span>
              </Link>
            </li>
          </>
        )}
        {user_info && user_info.role.roleId === 3 && (
          <>
            <li className="nav-item static-item">
              <Link
                className="nav-link static-item disabled"
                to="#"
                tabIndex="-1"
              >
                <span className="default-icon">Biên tập viên</span>
                <span className="mini-icon">-</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/my-tasks" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/my-tasks"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-bars"></i>
                </SpaceIcon>

                <span className="item-name">Công việc của tôi</span>
              </Link>
            </li>
            <li>
              <hr className="hr-horizontal" />
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/create-post" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/create-post"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-pen-nib"></i>
                </SpaceIcon>

                <span className="item-name">Tạo bài viết</span>
              </Link>
            </li>
            <li>
              <hr className="hr-horizontal" />
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/my-posts" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/my-posts"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-newspaper"></i>
                </SpaceIcon>

                <span className="item-name">Bài viết của tôi</span>
              </Link>
            </li>
          </>
        )}
        {user_info && user_info.role.roleId === 7 && (
          <>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/officer" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/officer"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-user-nurse"></i>
                </SpaceIcon>

                <span className="item-name">Danh sách người hỗ trợ</span>
              </Link>
            </li>
          </>
        )}
        {user_info && user_info.role.roleId === 4 && (
          <>
            <li className="nav-item static-item">
              <Link
                className="nav-link static-item disabled"
                to="#"
                tabIndex="-1"
              >
                <span className="default-icon">Quản lí biên tập viên</span>
                <span className="mini-icon">-</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/task-boards" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/task-boards"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-bars"></i>
                </SpaceIcon>
                <span className="item-name">Danh sách công việc</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  location.pathname === "/posts" ? "active" : ""
                } nav-link `}
                aria-current="page"
                to="/admin/posts"
                onClick={() => {}}
              >
                <SpaceIcon>
                  <i className="fa fa-solid fa-pen-nib"></i>
                </SpaceIcon>
                <span className="item-name">Danh sách bài viết</span>
              </Link>
            </li>
          </>
        )}
      </Accordion>
    </>
  );
};

export default VerticalNav;
