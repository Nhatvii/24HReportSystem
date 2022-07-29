import React, { Fragment, useEffect, useState } from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import tempIcon from "../../doc/img/icon/temp.png";
import { Link, NavLink } from "react-router-dom";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import categoryApi from "../../api/categoryApi";
import { toast } from "react-toastify";
const menus = [
  {
    id: 1,
    linkText: "Trang chủ",
    link: "/",
  },
  {
    id: 2,
    linkText: "Hỗ trợ",
    child: true,
    icon: "angle-down",
    submenu: [
      {
        id: 21,
        link: "/about",
        linkText: "Về chúng tôi",
      },
      {
        id: 22,
        link: "/archive",
        linkText: "Thành tựu",
      },
      {
        id: 23,
        link: "/contact",
        linkText: "Liên hệ với chúng tôi",
      },
    ],
  },
  {
    id: 5,
    linkText: "Gửi báo cáo",
    link: "/send-report",
  },
  {
    id: 6,
    linkText: "FAQ",
    link: "/faq",
  },
  {
    id: 7,
    linkText: "Liên hệ",
    link: "/contact",
  },
];

async function logout() {
  try {
    window.location.href = "/";
    localStorage.removeItem("user_info");
    // await axiosClient.post("/logout", null, {
    //   headers: {
    //     token: user_info.refreshToken,
    //   },
    // });
    // this.props.history.push("/");
  } catch (e) {
    toast.error(e.message);
  }
}
const MainMenu = ({ className, dark }) => {
  const [rootcategories, setRootCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [arr, setArr] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user_info"));

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const redirectPath = (path) => {
    window.location.href = "/user/" + path;
  };
  const fetchCategoryList = async () => {
    try {
      const params = {};
      const response = await categoryApi.getAllRoot(params);
      setRootCategories(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const fetchSubCategoryList = async () => {
    try {
      const params = {};
      const response = await categoryApi.getAllSub(params);
      setSubCategories(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    fetchCategoryList();
    fetchSubCategoryList();
    setArr(menus);
  }, [arr]);
  useEffect(() => {
    const isFound = arr.some((element) => {
      if (element.id === 4) {
        return true;
      }
      return false;
    });
    if (!isFound) {
      arr.push({
        id: 4,
        linkText: "Danh mục",
        child: true,
        icon: "angle-down",
        submenu: rootcategories.map((root, rootId) => ({
          id: 40 + rootId,
          child: true,
          linkText: root.type,
          third_menu: subCategories
            .filter(
              (sub) =>
                sub.rootCategoryNavigation.rootCategoryId ===
                root.rootCategoryId
            )
            .map((sub, subId) => ({
              id: (40 + rootId) * 10 + subId,
              link: "/search",
              searchByCategory: true,
              categoryId: sub.categoryId,
              linkText: sub.subCategory,
            })),
        })),
      });
    } else {
      arr
        .filter((item) => item.id === 4)
        .push({
          id: 4,
          linkText: "Danh mục",
          child: true,
          icon: "angle-down",
          submenu: rootcategories.map((root, rootId) => ({
            id: 40 + rootId,
            child: true,
            linkText: root.type,
            third_menu: subCategories
              .filter(
                (sub) =>
                  sub.rootCategoryNavigation.rootCategoryId ===
                  root.rootCategoryId
              )
              .map((sub, subId) => ({
                id: (40 + rootId) * 10 + subId,
                link: "/search",
                searchByCategory: true,
                categoryId: sub.categoryId,
                linkText: sub.subCategory,
              })),
          })),
        });
    }
  }, [subCategories]);
  return (
    <Fragment>
      <div className={`main-menu ${className ? className : ""}`} id="header">
        <Link to="#top" className="up_btn up_btn1">
          <FontAwesome name="chevron-double-up" />
        </Link>
        <div className="main-nav clearfix is-ts-sticky">
          <div className="container">
            <div className="row justify-content-between">
              <nav className="navbar navbar-expand-lg col-lg-8 align-self-center">
                <div className="site-nav-inner">
                  <button
                    className="navbar-toggler"
                    onClick={() => setSideShow(true)}
                  >
                    <FontAwesome name="bars" />
                  </button>
                  <div
                    id="navbarSupportedContent"
                    className="collapse navbar-collapse navbar-responsive-collapse"
                  >
                    <ul className="nav navbar-nav" id="scroll">
                      {arr.sort((a, b) => a.id - b.id).length > 0
                        ? arr.map((item, i) => (
                            <li
                              key={i}
                              className={`${
                                item.child ? "dropdown" : ""
                              } nav-item`}
                            >
                              {item.child ? (
                                <NavLink
                                  onClick={(e) => e.preventDefault()}
                                  to="/"
                                  className="menu-dropdown"
                                  data-toggle="dropdown"
                                >
                                  {item.linkText}
                                  <FontAwesome name={item.icon} />
                                </NavLink>
                              ) : (
                                <NavLink
                                  to={item.link}
                                  className="menu-dropdown"
                                  data-toggle="dropdown"
                                >
                                  {item.linkText}{" "}
                                  <FontAwesome name={item.icon} />
                                </NavLink>
                              )}

                              {item.child ? (
                                <ul className="dropdown-menu" role="menu">
                                  {item.submenu.map((sub_item, i) => (
                                    <li
                                      key={i}
                                      className={`${
                                        sub_item.child
                                          ? "dropdown-submenu"
                                          : null
                                      }`}
                                    >
                                      {sub_item.child ? (
                                        <NavLink
                                          onClick={(e) => e.preventDefault()}
                                          to="/"
                                        >
                                          {sub_item.linkText}
                                        </NavLink>
                                      ) : (
                                        <NavLink to={sub_item.link}>
                                          {sub_item.linkText}
                                        </NavLink>
                                      )}
                                      {sub_item.third_menu ? (
                                        <ul className="dropdown-menu">
                                          {sub_item.third_menu.map(
                                            (third_item, i) => (
                                              <li key={i}>
                                                {third_item.searchByCategory ===
                                                true ? (
                                                  <NavLink
                                                    to={{
                                                      pathname: third_item.link,
                                                      state: {
                                                        title:
                                                          "Danh mục: " +
                                                          third_item.linkText,
                                                        CategoryID:
                                                          third_item.categoryId,
                                                      },
                                                    }}
                                                  >
                                                    {third_item.linkText}
                                                  </NavLink>
                                                ) : (
                                                  <NavLink to={third_item.link}>
                                                    {third_item.linkText}
                                                  </NavLink>
                                                )}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : null}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                  <SidebarMenu
                    sideShow={sideShow}
                    setSideShow={setSideShow}
                    menus={arr}
                  />
                </div>
              </nav>
              <div className="col-lg-4 align-self-center">
                <div className="menu_right">
                  <div className="users_area">
                    <ul className="inline">
                      <li
                        className="search_btn"
                        onClick={() => setSearchShow(!searchShow)}
                      >
                        <FontAwesome name="search" />
                      </li>
                      {user_info && (
                        <li>
                          {/*  Avatar*/}
                          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle nav>
                              <img
                                src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
                                className="rounded-circle"
                                alt="anhwtuan@gmail.com"
                                height={30}
                                width={30}
                              />
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem
                                header
                                tag="div"
                                className="text-center"
                              >
                                <strong>Cài đặt</strong>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => redirectPath("profile")}
                              >
                                <i className="fa fa-user"></i>Hồ sơ
                              </DropdownItem>
                              <DropdownItem>
                                <i className="fa fa-wrench"></i>Cài đặt
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem onClick={logout}>
                                <i className="fa fa-lock"></i>Đăng xuất
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                      )}
                    </ul>
                  </div>
                  {!user_info && (
                    <div className="lang d-none d-xl-block">
                      <Link className="single_social social_vimeo" to="/login">
                        <span className="follow_icon">
                          <FontAwesome name="key" />
                        </span>
                        <span className="icon_text h4">Đăng nhập</span>
                      </Link>
                    </div>
                  )}
                  <div className="temp d-none d-lg-block">
                    <div className="temp_wap">
                      <div className="temp_icon">
                        <img src={tempIcon} alt="temp icon" />
                      </div>
                      <h3 className="temp_count">32</h3>
                      <p>Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchShow ? (
        <SearchModal setSearchShow={setSearchShow} searchShow={searchShow} />
      ) : null}
    </Fragment>
  );
};

export default MainMenu;
