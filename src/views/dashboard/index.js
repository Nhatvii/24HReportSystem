/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  Button,
  Container,
  Modal,
  Card,
} from "react-bootstrap";
import { bindActionCreators } from "redux";
//circular
import Circularprogressbar from "../../components/circularprogressbar.js";
// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.scss";
//Count-up
import CountUp from "react-countup";
import Pagination from "../tasks/MyTasksTable/pagination";
// store
import {
  NavbarstyleAction,
  getDirMode,
  getcustomizerMode,
  getcustomizerprimaryMode,
  getcustomizerinfoMode,
  SchemeDirAction,
  ColorCustomizerAction,
  getNavbarStyleMode,
  getSidebarActiveMode,
  SidebarActiveStyleAction,
  getDarkMode,
  ModeAction,
  SidebarColorAction,
  getSidebarColorMode,
  getSidebarTypeMode,
} from "../../store/setting/setting";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import reportApi from "../../api/reportApi.js";
import taskApi from "../../api/TaskApi.js";
import postApi from "../../api/postApi.js";
import userApi from "../../api/UserApi.js";
import moment from "moment";
import sosApi from "../../api/sosApi.js";
import officeApi from "../../api/officeApi.js";
import { Chip } from "@material-ui/core";
import "./style.css";
import categoryApi from "../../api/categoryApi.js";
// install Swiper modules
SwiperCore.use([Navigation]);

const mapStateToProps = (state) => {
  return {
    darkMode: getDarkMode(state),
    customizerMode: getcustomizerMode(state),
    cololrinfomode: getcustomizerinfoMode(state),
    colorprimarymode: getcustomizerprimaryMode(state),
    schemeDirMode: getDirMode(state),
    sidebarcolorMode: getSidebarColorMode(state),
    sidebarTypeMode: getSidebarTypeMode(state),
    sidebaractivestyleMode: getSidebarActiveMode(state),
    navbarstylemode: getNavbarStyleMode(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ModeAction,
      SchemeDirAction,
      SidebarColorAction,
      SidebarActiveStyleAction,
      NavbarstyleAction,
      ColorCustomizerAction,
    },
    dispatch
  ),
});

const Index = (props) => {
  const [reports, setReports] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [editors, setEditors] = useState([]);
  const [sosToday, setSosToday] = useState([]);
  const [allSos, setAllSos] = useState([]);
  const [officerList, setOfficerList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [temp, setTemp] = useState(0);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
    //   customizer
    const colorcustomizerMode = sessionStorage.getItem("color-customizer-mode");
    const colorcustomizerinfoMode = sessionStorage.getItem(
      "colorcustominfo-mode"
    );
    const colorcustomizerprimaryMode = sessionStorage.getItem(
      "colorcustomprimary-mode"
    );
    if (colorcustomizerMode === null) {
      props.ColorCustomizerAction(
        props.customizerMode,
        props.cololrinfomode,
        props.colorprimarymode
      );
      document.documentElement.style.setProperty(
        "--bs-info",
        props.cololrinfomode
      );
    } else {
      props.ColorCustomizerAction(
        colorcustomizerMode,
        colorcustomizerinfoMode,
        colorcustomizerprimaryMode
      );
      document.documentElement.style.setProperty(
        "--bs-info",
        colorcustomizerinfoMode
      );
    }
  });
  const chart1 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: ["blue", "green", "red"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: [props.colorprimarymode, props.cololrinfomode],
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Tất cả",
        data: [
          reports.filter((e) => moment(e.createTime).month() + 1 === 1).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 2).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 3).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 4).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 5).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 6).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 7).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 8).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 9).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 10).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 11).length,
          reports.filter((e) => moment(e.createTime).month() + 1 === 12).length,
        ],
      },
      {
        name: "Đã xem xét",
        data: [
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 1
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 2
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 3
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 4
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 5
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 6
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 7
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 8
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 9
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 10
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 11
          ).length,
          reports.filter(
            (e) =>
              e.status === "Approved" && moment(e.createTime).month() + 1 === 12
          ).length,
        ],
      },
      {
        name: "Bị từ chối",
        data: [
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 1
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 2
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 3
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 4
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 5
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 6
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 7
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 8
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 9
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 10
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 11
          ).length,
          reports.filter(
            (e) =>
              e.status === "Denied" && moment(e.createTime).month() + 1 === 12
          ).length,
        ],
      },
    ],
  };
  const chart2 = {
    options: {
      colors: [props.colorprimarymode, "#7CFC00", "#fc1303"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: true,
          },
        },
      },
      labels: ["Tất cả", "Đã hoàn thành", "Chưa hoàn thành"],
    },
    series: [55, 75, 100],
  };
  const chart3 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: ["green", "red", "yellow"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: [props.colorprimarymode, props.cololrinfomode],
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Đã đăng",
        data: [
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 1
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 2
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 3
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 4
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 5
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 6
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 7
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 8
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 9
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 10
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 11
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Public" && moment(e.createTime).month() + 1 === 12
          ).length,
        ],
      },
      {
        name: "Chưa đăng",
        data: [
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 1
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 2
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 3
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 4
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 5
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 6
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 7
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 8
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 9
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 10
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 11
          ).length,
          allPost.filter(
            (e) =>
              e.status === "Hidden" && moment(e.createTime).month() + 1 === 12
          ).length,
        ],
      },
    ],
  };
  const loadReports = async () => {
    try {
      const params = {};
      const response = await reportApi.getAll(params);
      setReports(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  async function loadCategory() {
    try {
      const params = {};
      const response = await categoryApi
        .getAllSub(params)
        .then((list) =>
          list.filter((e) => e.rootCategory !== null && e.categoryId !== 0)
        );
      setCategoryList(response);
    } catch (e) {
      toast.error(e.message);
    }
  }
  const loadPost = async () => {
    try {
      const params = {
        EditorID: user_info !== null && user_info.accountId,
        Status: "",
      };
      const response = await postApi.getByIdAndStatus(params);
      setPosts(response);
    } catch (err) {
      alert(err.message);
    }
  };
  const loadAllPost = async () => {
    try {
      const params = {};
      const response = await postApi.getAll(params);
      setAllPost(response);
    } catch (err) {
      alert(err.message);
    }
  };
  const getAllSOSToday = async () => {
    try {
      const params = {};
      const response = await sosApi.getAllToday(params);
      setSosToday(response);
    } catch (err) {
      alert(err.message);
    }
  };
  const getAllSOS = async () => {
    try {
      const params = {};
      const response = await sosApi.getAll(params);
      setAllSos(
        response
          .sort(
            (a, b) => new moment(a.acceptedDate) - new moment(b.acceptedDate)
          )
          .reverse()
      );
    } catch (err) {
      alert(err.message);
    }
  };
  const loadUsers = async () => {
    try {
      const params = {};
      const response = await userApi.getAll(params);
      setEditors(response.filter((user) => user.role.roleId === 3));
    } catch (err) {
      alert(err.message);
    }
  };
  const loadManagerTasks = async () => {
    try {
      const param = {};
      const response = await taskApi.getAllManager(param);
      setAllTasks(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const loadAllTasks = async () => {
    try {
      const params = {
        EditorID: user_info.accountId,
        status: "",
      };
      const response = await taskApi.getAllByIdAndStatus(params);
      setTasks(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const loadAllOffice = async () => {
    try {
      const params = {};
      const response = await officeApi.getAll(params);
      setOfficeList(
        response.sort(
          (a, b) =>
            sosToday.filter((e) => e.office.officeId === b.officeId).length -
            sosToday.filter((e) => e.office.officeId === a.officeId).length
        )
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  const loadOfficers = async () => {
    try {
      const params = {};
      const response = await userApi.getAll(params);
      setOfficerList(response.filter((e) => e.role.roleId === 6));
    } catch (err) {
      alert(err.message);
    }
  };
  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  };

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 30000);
  }, []);
  useEffect(() => {
    loadReports();
    loadAllTasks();
    loadPost();
    loadManagerTasks();
    loadAllPost();
    loadUsers();
    loadOfficers();
    loadCategory();
  }, [temp]);
  useEffect(() => {
    getAllSOSToday();
    getAllSOS();
  }, []);
  useEffect(() => {
    if (sosToday.length > 0 && officeList.length === 0) {
      loadAllOffice();
    }
  }, [sosToday]);
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const handleCloseModal = () => {
    setShowMore(false);
    setSelectedOffice();
  };
  const handleCloseModal2 = () => {
    setShowMore2(false);
    setSelectedOfficer();
  };

  return (
    <>
      {/* Office */}
      <Modal
        scrollable={true}
        show={showMore}
        onHide={() => handleCloseModal()}
        centered
        size="xl"
        // fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="font-weight-bold h5">Thống kê cơ quan</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          {selectedOffice && (
            <Row>
              <Col md={12}>
                <Row className="h4 ml-1 mt-2 mb-3">
                  <Col md={12}>
                    <b className="mb-1">Thông tin cơ quan</b>
                  </Col>
                </Row>
                <Row className="h5 ml-1 mt-2 mb-3">
                  <Col md={3}>
                    <b className="mb-1">Tên cơ quan:</b>
                  </Col>
                  <Col md={9}>{selectedOffice.officeName}</Col>
                </Row>
                <Row className="h5 ml-1 mt-3 mb-3">
                  <Col md={3}>
                    <b className="mb-1">Khu vực:</b>
                  </Col>
                  <Col md={9}>{selectedOffice.district}</Col>
                </Row>
                <Row className="h5 ml-1 mt-3 mb-3">
                  <Col md={3}>
                    <b className="mb-1">Số lượng sỹ quan:</b>
                  </Col>
                  <Col md={9}>{selectedOffice.activeOfficer}</Col>
                </Row>
                <Row className="h5 mt-3 mb-3">
                  <Col md={3}>
                    <b className="mb-1">Số điện thoại:</b>
                  </Col>
                  <Col md={9}>{selectedOffice.phoneNumber}</Col>
                </Row>
                <Row>
                  <h4 className="mb-2">
                    <b>Danh sách sỹ quan</b>
                  </h4>
                  <table id="basic-table" className="table mb-2" role="grid">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Số điện thoại</th>
                        <th>SOS đã tiếp nhận</th>
                        <th>Trạng thái</th>
                        <th>Nhiệm vụ cuối</th>
                      </tr>
                    </thead>
                    {officeList.length > 0 &&
                      officerList
                        .filter((e) => e.officeId === selectedOffice.officeId)
                        .map((officer) => (
                          <>
                            <tr
                              style={{
                                cursor: "pointer",
                              }}
                              className="hover"
                              onClick={() => {
                                setShowMore2(!showMore2);
                                setSelectedOfficer(officer);
                              }}
                            >
                              <td>
                                <div className="d-flex align-items-center">
                                  {officer.accountInfo.fullname}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {officer.phoneNumber}
                                </div>
                              </td>
                              <td>
                                <div className="iq-media-group iq-media-group-1">
                                  {
                                    allSos.filter(
                                      (e) =>
                                        e.officer.accountId ===
                                          officer.accountId &&
                                        e.notifyStatus === true
                                    ).length
                                  }
                                </div>
                              </td>
                              <td className="d-flex align-items-center">
                                {officer.isActive ? (
                                  <Chip
                                    key={officer.officeId}
                                    label="Đang rảnh rỗi"
                                    color="error"
                                    style={{
                                      backgroundColor: "orange",
                                      color: "white",
                                      marginTop: "10px",
                                    }}
                                  />
                                ) : (
                                  <Chip
                                    key={officer.officeId}
                                    label="Đang làm nhiệm vụ"
                                    color="success"
                                    style={{
                                      backgroundColor: "green",
                                      color: "white",
                                      marginTop: "10px",
                                    }}
                                  />
                                )}
                              </td>
                              <td>
                                <div className="mb-2 d-flex align-items-center">
                                  {allSos.filter(
                                    (e) =>
                                      e.officer.accountId === officer.accountId
                                  ).length > 0
                                    ? moment(
                                        allSos.filter(
                                          (e) =>
                                            e.officer.accountId ===
                                            officer.accountId
                                        )[0].acceptedDate
                                      )
                                        .fromNow()
                                        .toString()
                                        .charAt(0)
                                        .toUpperCase() +
                                      moment(
                                        allSos.filter(
                                          (e) =>
                                            e.officer.accountId ===
                                            officer.accountId
                                        )[0].acceptedDate
                                      )
                                        .fromNow()
                                        .toString()
                                        .slice(1)
                                    : "Chưa làm nhiệm vụ nào"}
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
                  </table>
                </Row>
              </Col>

              <Col md={6}></Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Officer */}
      <Modal
        scrollable={true}
        show={showMore2}
        onHide={() => handleCloseModal2()}
        centered
        size="xl"
        // fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="font-weight-bold h5">Thống kê sỹ quan</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          {selectedOffice && (
            <Row>
              <Col md={12}>
                <Row className="h4 ml-1 mt-2 mb-3">
                  <Col md={12}>
                    <b className="mb-1">Thông tin sỹ quan</b>
                  </Col>
                </Row>
                <Row className="h5 ml-1 mt-2 mb-3">
                  <Col md={3}>
                    <b className="mb-1">Tên sỹ quan:</b>
                  </Col>
                  <Col md={9}>
                    {selectedOfficer
                      ? selectedOfficer.accountInfo.fullname
                      : "Không có"}
                  </Col>
                </Row>
                <Row className="h5 ml-1 mt-2 mb-3">
                  <Col md={3}>
                    <b className="mb-1">Tên sỹ quan:</b>
                  </Col>
                  <Col md={9}>
                    {selectedOfficer ? selectedOfficer.phoneNumber : "Không có"}
                  </Col>
                </Row>
                <Row className="h4 ml-1 mt-2 mb-3">
                  <Col md={12}>
                    <b className="mb-1">Lịch sử SOS</b>
                  </Col>
                </Row>
                <Row className="ml-1 mt-2 mb-3">
                  <Col md={12}>
                    <table id="basic-table" className="table mb-2 " role="grid">
                      <thead>
                        <tr>
                          <th>Tọa độ SOS</th>
                          <th>Thời điểm</th>
                          <th>Trạng thái</th>
                          <th>Thời gian</th>
                          <th>Tóm tắt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOfficer &&
                        allSos.filter(
                          (e) =>
                            e.officer.accountId === selectedOfficer.accountId
                        ).length === 0 ? (
                          <p className="text-muted">Không có lịch sử SOS</p>
                        ) : (
                          selectedOfficer &&
                          allSos
                            .filter(
                              (e) =>
                                e.officer.accountId ===
                                selectedOfficer.accountId
                            )
                            .map((mySos) => (
                              <>
                                <tr
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  className="hover"
                                >
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <h6>
                                        {mySos.latitude +
                                          ", " +
                                          mySos.longitude}
                                      </h6>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="iq-media-group iq-media-group-1">
                                      {moment(mySos.acceptedDate).format(
                                        "DD/MM/YYYY, h:mm:ss"
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    {mySos.notifyStatus ? (
                                      <p style={{ color: "green" }}>Đã xong</p>
                                    ) : (
                                      <p style={{ color: "yellow" }}>
                                        Đang làm
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    <div className="iq-media-group iq-media-group-1">
                                      {mySos.executeTime}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="iq-media-group iq-media-group-1">
                                      {mySos.sumaryContent}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))
                        )}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </Col>
              <Col md={6}></Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal2()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {user_info.role.roleId === 2 && (
        <Row>
          <Col md="12" lg="12">
            <Row className="row-cols-1">
              <div className="overflow-hidden d-slider1 ">
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={5}
                  spaceBetween={32}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                    1500: { slidesPerView: 5 },
                    1920: { slidesPerView: 6 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <SwiperSlide className="card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <div className="progress-detail">
                          <p className="mb-2">Tất cả báo cáo</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={reports.length}
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.cololrinfomode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (reports.filter((e) => e.status === "New").length /
                              reports.length) *
                            100
                          }
                          id="circle-progress-02"
                        >
                          {Math.round(
                            (reports.filter((e) => e.status === "New").length /
                              reports.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Báo cáo mới</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                reports.filter((e) => e.status === "New").length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.colorprimarymode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (reports.filter((e) => e.status === "Pending")
                              .length /
                              reports.length) *
                            100
                          }
                          id="circle-progress-03"
                        >
                          {Math.round(
                            (reports.filter((e) => e.status === "Pending")
                              .length /
                              reports.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Báo cáo đang xử lý</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                reports.filter((e) => e.status === "Pending")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.cololrinfomode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (reports.filter((e) => e.status === "Approved")
                              .length /
                              reports.length) *
                            100
                          }
                          id="circle-progress-04"
                        >
                          {Math.round(
                            (reports.filter((e) => e.status === "Approved")
                              .length /
                              reports.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Báo cáo đã xem xét</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                reports.filter((e) => e.status === "Approved")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke="red"
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (reports.filter((e) => e.status === "Denied")
                              .length /
                              reports.length) *
                            100
                          }
                          id="circle-progress-05"
                        >
                          {Math.round(
                            (reports.filter((e) => e.status === "Denied")
                              .length /
                              reports.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Báo cáo bị từ chối</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                reports.filter((e) => e.status === "Denied")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <h5 className="mb-1">Thống kê báo cáo theo danh mục</h5>
            <Row className="row-cols-1">
              <div className="overflow-hidden d-slider1 ">
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={5}
                  spaceBetween={32}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                    1500: { slidesPerView: 5 },
                    1920: { slidesPerView: 6 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {categoryList.length > 0 &&
                    categoryList.map((e) => (
                      <SwiperSlide className=" card card-slide">
                        <div className="card-body">
                          <div className="progress-widget">
                            <Circularprogressbar
                              stroke={props.cololrinfomode}
                              width="60px"
                              height="60px"
                              trailstroke="#ddd"
                              strokewidth="4px"
                              Linecap="rounded"
                              style={{ width: 60, height: 60 }}
                              value={
                                (reports.filter(
                                  (report) =>
                                    report.status === "Approved" &&
                                    report.categoryId === e.categoryId
                                ).length /
                                  reports.length) *
                                100
                              }
                              id="circle-progress-02"
                            >
                              {Math.round(
                                (reports.filter(
                                  (report) =>
                                    report.status === "Approved" &&
                                    report.categoryId === e.categoryId
                                ).length /
                                  reports.length) *
                                  100
                              )}
                              %
                            </Circularprogressbar>
                            <div className="progress-detail">
                              <p className="mb-2">{e.type}</p>
                              <h4 className="counter">
                                <CountUp
                                  start={0}
                                  end={
                                    reports.filter(
                                      (report) =>
                                        report.status === "Approved" &&
                                        report.categoryId === e.categoryId
                                    ).length
                                  }
                                  duration={3}
                                />
                              </h4>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}

                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <Row>
              <Col md="12">
                <div className="card" data-aos="fade-up" data-aos-delay="800">
                  <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Thống kê</h4>
                      <p className="mb-0">báo cáo</p>
                    </div>
                    <div className="d-flex align-items-center align-self-center">
                      <div className="d-flex align-items-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="currentColor"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">
                            Báo cáo đã xem xét
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center ms-3 text-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="red"
                        >
                          <g>
                            <circle cx="12" cy="12" r="8" fill="red"></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">
                            Báo cáo bị từ chối
                          </span>
                        </div>
                      </div>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={Button}
                        href="#"
                        variant=" text-secondary dropdown-toggle"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Năm nay
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu-end"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <li>
                          <Dropdown.Item href="#">Tuần này</Dropdown.Item>
                        </li>
                        <li>
                          <Dropdown.Item href="#">Tháng này</Dropdown.Item>
                        </li>
                        <li>
                          <Dropdown.Item href="#">Năm nay</Dropdown.Item>
                        </li>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="card-body">
                    <Chart
                      options={chart1.options}
                      series={chart1.series}
                      type="area"
                      height="245"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {user_info.role.roleId === 3 && (
        <Row>
          <Col md="12" lg="12">
            <Row className="row-cols-1">
              <div className="overflow-hidden d-slider1 ">
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={6}
                  spaceBetween={32}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                    1500: { slidesPerView: 5 },
                    1920: { slidesPerView: 6 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {/* <SwiperSlide className="card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={props.colorprimarymode}
                          width="60px"
                          height="60px"
                          Linecap="rounded"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          style={{ width: 60, height: 60 }}
                          value={100}
                          id="circle-progress-01"
                        >
                          100%
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Tất cả công việc</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={tasks.length}
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide> */}
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.cololrinfomode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (tasks.filter((e) => e.status === "New").length /
                              tasks.length) *
                            100
                          }
                          id="circle-progress-02"
                        >
                          {Math.round(
                            (tasks.filter((e) => e.status === "New").length /
                              tasks.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Công việc mới</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                tasks.filter((e) => e.status === "New").length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.colorprimarymode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (tasks.filter((e) => e.status === "Pending")
                              .length /
                              tasks.length) *
                            100
                          }
                          id="circle-progress-03"
                        >
                          {Math.round(
                            (tasks.filter((e) => e.status === "Pending")
                              .length /
                              tasks.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Đang làm</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                tasks.filter((e) => e.status === "Pending")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.cololrinfomode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (tasks.filter((e) => e.status === "Review").length /
                              tasks.length) *
                            100
                          }
                          id="circle-progress-04"
                        >
                          {Math.round(
                            (tasks.filter((e) => e.status === "Review").length /
                              tasks.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Đang xem xét</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                tasks.filter((e) => e.status === "Review")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke="red"
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (tasks.filter((e) => e.status === "Finish").length /
                              tasks.length) *
                            100
                          }
                          id="circle-progress-05"
                        >
                          {Math.round(
                            (tasks.filter((e) => e.status === "Finish").length /
                              tasks.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Đã hoàn thành</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                tasks.filter((e) => e.status === "Finish")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke="red"
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (tasks.filter((e) => e.status === "UnFinished")
                              .length /
                              tasks.length) *
                            100
                          }
                          id="circle-progress-05"
                        >
                          {Math.round(
                            (tasks.filter((e) => e.status === "UnFinished")
                              .length /
                              tasks.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Công việc không hoàn thành</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                tasks.filter((e) => e.status === "UnFinished")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <Row className="mb-4">
              <h3>Thống kê bài viết</h3>
            </Row>
            <Row className="row-cols-1">
              <div className="overflow-hidden d-slider1 ">
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={3}
                  spaceBetween={40}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                    1500: { slidesPerView: 5 },
                    1920: { slidesPerView: 6 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <SwiperSlide className="card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.colorprimarymode}
                          width="60px"
                          height="60px"
                          Linecap="rounded"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          style={{ width: 60, height: 60 }}
                          value={100}
                          id="circle-progress-01"
                        >
                          100%
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Tổng bài viết</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={posts.length}
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.cololrinfomode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (posts.filter((e) => e.status === "Draft").length /
                              posts.length) *
                            100
                          }
                          id="circle-progress-02"
                        >
                          {Math.round(
                            (posts.filter((e) => e.status === "Draft").length /
                              posts.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Bài viết nháp</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                posts.filter((e) => e.status === "Draft").length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.colorprimarymode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (posts.filter((e) => e.status === "Hidden").length /
                              posts.length) *
                            100
                          }
                          id="circle-progress-03"
                        >
                          {Math.round(
                            (posts.filter((e) => e.status === "Hidden").length /
                              posts.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Đã nộp</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                posts.filter((e) => e.status === "Hidden")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        {/* <Circularprogressbar
                          stroke={props.cololrinfomode}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={
                            (posts.filter((e) => e.status === "Public").length /
                              posts.length) *
                            100
                          }
                          id="circle-progress-04"
                        >
                          {Math.round(
                            (posts.filter((e) => e.status === "Public").length /
                              posts.length) *
                              100
                          )}
                          %
                        </Circularprogressbar> */}
                        <div className="progress-detail">
                          <p className="mb-2">Đã được đăng</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={
                                posts.filter((e) => e.status === "Public")
                                  .length
                              }
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
        </Row>
      )}
      {user_info.role.roleId === 5 && (
        <>
          <Row>
            <Col xl="4">
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="p-3 rounded bg-soft-primary">
                        <svg
                          width="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.92574 16.39H14.3119C14.7178 16.39 15.0545 16.05 15.0545 15.64C15.0545 15.23 14.7178 14.9 14.3119 14.9H8.92574C8.5198 14.9 8.18317 15.23 8.18317 15.64C8.18317 16.05 8.5198 16.39 8.92574 16.39ZM12.2723 9.9H8.92574C8.5198 9.9 8.18317 10.24 8.18317 10.65C8.18317 11.06 8.5198 11.39 8.92574 11.39H12.2723C12.6782 11.39 13.0149 11.06 13.0149 10.65C13.0149 10.24 12.6782 9.9 12.2723 9.9ZM19.3381 9.02561C19.5708 9.02292 19.8242 9.02 20.0545 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0545 22H8.17327C5.59901 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5099 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4381 9.02 17.8112 9.02316 18.1377 9.02593C18.3917 9.02809 18.6175 9.03 18.8168 9.03C18.9578 9.03 19.1405 9.02789 19.3381 9.02561ZM19.6111 7.566C18.7972 7.569 17.8378 7.566 17.1477 7.559C16.0527 7.559 15.1507 6.648 15.1507 5.542V2.906C15.1507 2.475 15.6685 2.261 15.9646 2.572C16.5004 3.13476 17.2368 3.90834 17.9699 4.67837C18.7009 5.44632 19.4286 6.21074 19.9507 6.759C20.2398 7.062 20.0279 7.565 19.6111 7.566Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ms-5">
                      <h5 className="mb-1"> Báo cáo hôm nay</h5>
                      <h6 className="text-info">
                        <CountUp
                          start={0}
                          end={
                            reports.filter(
                              (report) =>
                                moment(0, "HH").diff(
                                  report.createTime,
                                  "days"
                                ) === 0
                            ).length
                          }
                          duration={3}
                        />
                      </h6>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl="4" lg="4">
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="bg-soft-success rounded p-3">
                      <svg
                        width="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M13.7476 20.4428H21.0002"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M11.021 6.00098L16.4732 10.1881"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </svg>
                    </div>
                    <div className="ms-5">
                      <h5 className="mb-1">Bài viết hôm nay</h5>
                      <h6 className="text-info">
                        <CountUp
                          start={0}
                          end={
                            posts.filter(
                              (post) =>
                                moment(0, "HH").diff(
                                  post.createTime,
                                  "days"
                                ) === 0
                            ).length
                          }
                          duration={3}
                        />
                      </h6>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl="4" lg="4">
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className=" bg-soft-info rounded p-3">
                      <svg
                        width="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z"
                          fill="currentColor"
                        ></path>{" "}
                        <path
                          opacity="0.4"
                          d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z"
                          fill="currentColor"
                        ></path>{" "}
                      </svg>
                    </div>
                    <div className="ms-5">
                      <h5 className="mb-1">SOS trong ngày</h5>
                      <h6 className="text-info">{sosToday.length}</h6>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Col md="12" lg="12">
            <div
              className="overflow-hidden card"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex-wrap card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="mb-2 card-title">
                    Thống kê lượt dùng SOS khẩn cấp
                  </h4>
                  <p className="mb-0">
                    <svg
                      className="me-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#3a57e8"
                        d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                      />
                    </svg>
                    Có tất cả {sosToday.length} lượt dùng SOS trong hôm nay
                  </p>
                </div>
              </div>
              <div className="p-0 card-body">
                <div className="mt-4 table-responsive">
                  <table id="basic-table" className="table mb-2 " role="grid">
                    <thead>
                      <tr>
                        <th>Cơ quan</th>
                        <th>Khu vực</th>
                        <th>Số lượt SOS hôm nay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageOfItems.length > 0 &&
                        pageOfItems
                          .filter((office) => office.isDelete !== true)
                          .map((office) => (
                            <>
                              <tr
                                style={{
                                  cursor: "pointer",
                                }}
                                className="hover"
                                onClick={() => {
                                  setShowMore(!showMore);
                                  setSelectedOffice(office);
                                }}
                              >
                                <td>
                                  <div className="d-flex align-items-center">
                                    <h6>{office.officeName}</h6>
                                  </div>
                                </td>
                                <td>
                                  <div className="iq-media-group iq-media-group-1">
                                    {office.district}
                                  </div>
                                </td>
                                <td>
                                  {
                                    sosToday.filter(
                                      (e) =>
                                        e.office.officeId === office.officeId
                                    ).length
                                  }
                                </td>
                              </tr>
                            </>
                          ))}
                    </tbody>
                  </table>
                  {officeList.length > 0 && (
                    <Pagination
                      items={officeList}
                      onChangePage={onChangePage}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </>
      )}
      {(user_info.role.roleId === 5 || user_info.role.roleId === 4) && (
        <Row>
          <Col md="12" lg="12">
            <h5 className="mb-1 mt-4">Thống kê bài viết theo danh mục</h5>
            <Row className="row-cols-1">
              <div className="overflow-hidden d-slider1 ">
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={5}
                  spaceBetween={32}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                    1500: { slidesPerView: 5 },
                    1920: { slidesPerView: 6 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {categoryList.length > 0 &&
                    categoryList.map((e) => (
                      <SwiperSlide className=" card card-slide">
                        <div className="card-body">
                          <div className="progress-widget">
                            <Circularprogressbar
                              stroke={props.cololrinfomode}
                              width="60px"
                              height="60px"
                              trailstroke="#ddd"
                              strokewidth="4px"
                              Linecap="rounded"
                              style={{ width: 60, height: 60 }}
                              value={
                                (allPost.filter(
                                  (post) =>
                                    post.status === "Public" &&
                                    post.category.categoryId === e.categoryId
                                ).length /
                                  allPost.length) *
                                100
                              }
                              id="circle-progress-02"
                            >
                              {Math.round(
                                (allPost.filter(
                                  (post) =>
                                    post.status === "Public" &&
                                    post.category.categoryId === e.categoryId
                                ).length /
                                  allPost.length) *
                                  100
                              )}
                              %
                            </Circularprogressbar>
                            <div className="progress-detail">
                              <p className="mb-2">{e.type}</p>
                              <h4 className="counter">
                                <CountUp
                                  start={0}
                                  end={
                                    allPost.filter(
                                      (post) =>
                                        post.status === "Public" &&
                                        post.category.categoryId ===
                                          e.categoryId
                                    ).length
                                  }
                                  duration={3}
                                />
                              </h4>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}

                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <h5 className="mb-1">Thống kê báo cáo theo danh mục</h5>
            <Row className="row-cols-1">
              <div className="overflow-hidden d-slider1 ">
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={5}
                  spaceBetween={32}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                    1500: { slidesPerView: 5 },
                    1920: { slidesPerView: 6 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {categoryList.length > 0 &&
                    categoryList.map((e) => (
                      <SwiperSlide className=" card card-slide">
                        <div className="card-body">
                          <div className="progress-widget">
                            <Circularprogressbar
                              stroke={props.cololrinfomode}
                              width="60px"
                              height="60px"
                              trailstroke="#ddd"
                              strokewidth="4px"
                              Linecap="rounded"
                              style={{ width: 60, height: 60 }}
                              value={
                                (reports.filter(
                                  (report) =>
                                    report.status === "Approved" &&
                                    report.categoryId === e.categoryId
                                ).length /
                                  reports.length) *
                                100
                              }
                              id="circle-progress-02"
                            >
                              {Math.round(
                                (reports.filter(
                                  (report) =>
                                    report.status === "Approved" &&
                                    report.categoryId === e.categoryId
                                ).length /
                                  reports.length) *
                                  100
                              )}
                              %
                            </Circularprogressbar>
                            <div className="progress-detail">
                              <p className="mb-2">{e.type}</p>
                              <h4 className="counter">
                                <CountUp
                                  start={0}
                                  end={
                                    reports.filter(
                                      (report) =>
                                        report.status === "Approved" &&
                                        report.categoryId === e.categoryId
                                    ).length
                                  }
                                  duration={3}
                                />
                              </h4>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}

                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <Row>
              <Col md="12">
                <div className="card" data-aos="fade-up" data-aos-delay="800">
                  <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Thống kê</h4>
                      <p className="mb-0">báo cáo</p>
                    </div>
                    <div className="d-flex align-items-center align-self-center">
                      <div className="d-flex align-items-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="currentColor"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">Tất cả báo cáo</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center ms-3 text-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="red"
                        >
                          <g>
                            <circle cx="12" cy="12" r="8" fill="green"></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">
                            Báo cáo được duyệt
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center ms-3 text-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="red"
                        >
                          <g>
                            <circle cx="12" cy="12" r="8" fill="red"></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">
                            Báo cáo từ chối
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Chart
                      options={chart1.options}
                      series={chart1.series}
                      type="area"
                      height="245"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <Row>
              <Col md="12">
                <div className="card" data-aos="fade-up" data-aos-delay="800">
                  <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Thống kê</h4>
                      <p className="mb-0">bài viết</p>
                    </div>
                    <div className="d-flex align-items-center align-self-center">
                      <div className="d-flex align-items-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="green"
                        >
                          <g>
                            <circle cx="12" cy="12" r="8" fill="green"></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">
                            Bài viết đã đăng
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center ms-3 text-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="red"
                        >
                          <g>
                            <circle cx="12" cy="12" r="8" fill="red"></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-secondary">
                            Bài viết chưa đăng
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Chart
                      options={chart3.options}
                      series={chart3.series}
                      type="area"
                      height="245"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          {/* <Slide bottom>
            <h3>Thống kê biên tập viên</h3>
          </Slide>
          {editors !== [] &&
            editors.map((editor) => (
              <Col md="12" xl="6">
                <div className="card" data-aos="fade-up" data-aos-delay="900">
                  <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">
                        {editor.accountInfo !== null
                          ? editor.accountInfo.fullname
                          : "Không có"}
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="flex-wrap d-flex align-items-center justify-content-between">
                      <Chart
                        className="col-md-4 col-lg-4"
                        options={chart2.options}
                        series={[
                          Math.round(
                            (allTasks.filter(
                              (task) => task.editorId === editor.accountId
                            ).length /
                              allTasks.filter(
                                (task) => task.editorId === editor.accountId
                              ).length) *
                              100
                          ),
                          Math.round(
                            (allTasks.filter(
                              (task) =>
                                task.editorId === editor.accountId &&
                                task.status === "Finish"
                            ).length /
                              allTasks.filter(
                                (task) => task.editorId === editor.accountId
                              ).length) *
                              100
                          ),
                          Math.round(
                            (allTasks.filter(
                              (task) =>
                                task.editorId === editor.accountId &&
                                task.status === "UnFinished"
                            ).length /
                              allTasks.filter(
                                (task) => task.editorId === editor.accountId
                              ).length) *
                              100
                          ),
                        ]}
                        type="radialBar"
                        height="250"
                      />
                      <div className="d-grid gap col-md-4 col-lg-4">
                        <div className="d-flex align-items-start">
                          <svg
                            className="mt-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            viewBox="0 0 24 24"
                            fill="blue"
                          >
                            <g>
                              <circle
                                cx="12"
                                cy="12"
                                r="8"
                                fill="blue"
                              ></circle>
                            </g>
                          </svg>
                          <div className="ms-3">
                            <span className="text-secondary">
                              Tất cả công việc
                            </span>
                            <h6>
                              {
                                allTasks.filter(
                                  (task) => task.editorId === editor.accountId
                                ).length
                              }
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex align-items-start">
                          <svg
                            className="mt-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            viewBox="0 0 24 24"
                            fill="green"
                          >
                            <g>
                              <circle
                                cx="12"
                                cy="12"
                                r="8"
                                fill="green"
                              ></circle>
                            </g>
                          </svg>
                          <div className="ms-3">
                            <span className="text-secondary">
                              Công việc đã hoàn thành
                            </span>
                            <h6>
                              {
                                allTasks.filter(
                                  (task) =>
                                    task.editorId === editor.accountId &&
                                    task.status === "Finish"
                                ).length
                              }
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex align-items-start">
                          <svg
                            className="mt-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            viewBox="0 0 24 24"
                            fill="red"
                          >
                            <g>
                              <circle cx="12" cy="12" r="8" fill="red"></circle>
                            </g>
                          </svg>
                          <div className="ms-3">
                            <span className="text-secondary">
                              Công việc chưa hoàn thành
                            </span>
                            <h6>
                              {
                                allTasks.filter(
                                  (task) =>
                                    task.editorId === editor.accountId &&
                                    task.status === "UnFinished"
                                ).length
                              }
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))} */}
        </Row>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
