import React, { Fragment, useEffect, useState } from "react";
import FontAwesome from "../uiStyle/FontAwesome";
// import tempIcon from "../../doc/img/icon/temp.png";
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
import logo from "../../assets/img/logo.png";
const menus = [
  {
    id: 1,
    linkText: "Trang chủ",
    link: "/",
  },
  // {
  //   id: 2,
  //   linkText: "Hỗ trợ",
  //   child: true,
  //   icon: "angle-down",
  //   submenu: [
  //     {
  //       id: 21,
  //       link: "/about",
  //       linkText: "Về chúng tôi",
  //     },
  //     {
  //       id: 22,
  //       link: "/archive",
  //       linkText: "Thành tựu",
  //     },
  //     {
  //       id: 23,
  //       link: "/contact",
  //       linkText: "Liên hệ với chúng tôi",
  //     },
  //   ],
  // },
  {
    id: 5,
    linkText: "Gửi báo cáo",
    link: "/send-report",
  },
  {
    id: 6,
    linkText: "Lịch sử báo cáo",
    link: "/view-report",
  },
  // {
  //   id: 7,
  //   linkText: "Liên hệ",
  //   link: "/contact",
  // },
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
  // const [weather, setWeather] = useState(null);
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  // useEffect(() => {
  //   fetch(
  //     "https://openweathermap.org/data/2.5/weather?id=1566083&appid=439d4b804bc8187953eb36d2a8c26a02"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setWeather(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         toast.error(error.message);
  //       }
  //     );
  // }, []);
  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const redirectPath = (path) => {
    window.location.href = "/user/" + path;
  };
  const redirectHome = () => {
    window.location.href = "/";
  };

  const fetchSubCategoryList = async () => {
    try {
      const params = {};
      const response = await categoryApi.getAllSub(params);
      setSubCategories(response.filter((e) => e.rootCategory !== null));
      setRootCategories(
        response.filter((e) => e.rootCategory === null && e.categoryId !== 1)
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    // fetchCategoryList();
    fetchSubCategoryList();
    setArr(menus);
  }, [subCategories]);
  useEffect(() => {
    const isFound = arr.some((element) => {
      if (element.id === 4) {
        return true;
      }
      return false;
    });
    if (!user_info) {
      // eslint-disable-next-line
      arr.some((element) => {
        if (element.id === 6) {
          arr.pop();
        }
      });
    }
    if (!isFound && rootcategories.length > 0) {
      arr.push({
        id: 4,
        linkText: "Danh mục",
        child: true,
        icon: "angle-down",
        submenu: rootcategories.map((root, rootId) => ({
          id: 40 + rootId,
          child: true,
          link: "/search",
          searchByCategory: true,
          rootCategoryId: root.categoryId,
          linkText: root.type,
          third_menu:
            subCategories.length > 0 &&
            subCategories
              .filter((sub) => sub.rootCategory.categoryId === root.categoryId)
              .map((sub, subId) => ({
                id: (40 + rootId) * 10 + subId,
                link: "/search",
                searchByCategory: true,
                categoryId: sub.categoryId,
                linkText: sub.type,
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
          submenu:
            rootcategories.length > 0 &&
            rootcategories.map((root, rootId) => ({
              id: 40 + rootId,
              child: true,
              linkText: root.type,
              third_menu:
                subCategories.length > 0 &&
                subCategories
                  .filter(
                    (sub) => sub.rootCategory.categoryId === root.categoryId
                  )
                  .map((sub, subId) => ({
                    id: (40 + rootId) * 10 + subId,
                    link: "/search",
                    searchByCategory: true,
                    categoryId: sub.categoryId,
                    linkText: sub.type,
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
                <img
                  src={logo}
                  alt="logo"
                  width={50}
                  height={50}
                  className="collapse navbar-collapse navbar-responsive-collapse mr-2"
                  onClick={() => redirectHome()}
                />
                <div className="site-nav-inner">
                  <button
                    className="navbar-toggler"
                    onClick={() => setSideShow(!sideShow)}
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
                                          // onClick={(e) => e.preventDefault()}
                                          to={{
                                            pathname: sub_item.link,
                                            state: {
                                              title:
                                                "Danh mục: " +
                                                sub_item.linkText,
                                              RootCategoryID:
                                                sub_item.rootCategoryId,
                                            },
                                          }}
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
                  <div
                    className="users_area"
                    style={{
                      color: "#0098d1",
                      marginLeft: "1rem",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setSearchShow(!searchShow)}
                  >
                    <ul className="inline">
                      <i
                        className=""
                        style={{ display: "block", textAlign: "center" }}
                      >
                        <FontAwesome name="search" />
                      </i>
                      <span className="icon_text">Tìm kiếm</span>
                    </ul>
                  </div>
                  {user_info && (
                    <ul
                      style={{ listStyleType: "none", padding: 0, margin: 0 }}
                    >
                      <li>
                        {/*  Avatar*/}
                        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                          <DropdownToggle nav>
                            <img
                              src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                              className="rounded-circle"
                              alt="avatar"
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
                              <strong>Cá nhân</strong>
                              <div>Điểm: {user_info.totalScore}</div>
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => redirectPath("profile")}
                            >
                              <i className="fa fa-user"></i>Hồ sơ
                            </DropdownItem>
                            {/* <DropdownItem>
                              <i className="fa fa-wrench"></i>Cài đặt
                            </DropdownItem> */}
                            <DropdownItem divider />
                            <DropdownItem onClick={logout}>
                              <i className="fa fa-lock"></i>Đăng xuất
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </li>
                    </ul>
                  )}
                  {!user_info && (
                    <Link
                      className=""
                      style={{
                        color: "#0098d1",
                        marginLeft: "1rem",
                        textDecoration: "none",
                      }}
                      to="/login"
                    >
                      <i
                        className="follow_icon"
                        style={{ display: "block", textAlign: "center" }}
                      >
                        <FontAwesome name="user" />
                      </i>
                      <span className="icon_text">Đăng nhập</span>
                    </Link>
                  )}
                  {/* <div className="temp d-none d-lg-block">
                    <div className="temp_wap">
                      <div className="temp_icon">
                        <img src={tempIcon} alt="temp icon" />
                      </div>
                      <h3 className="temp_count">
                        {weather !== null && weather.main.temp}
                      </h3>
                      <p>{weather !== null && weather.name}</p>
                    </div>
                  </div> */}
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
