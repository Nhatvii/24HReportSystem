/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import taskApi from "../../../api/TaskApi";
import { Markup } from "interweave";
import reportApi from "../../../api/reportApi";
import "./MyTasksTableStyle.css";
import { Menu, MenuItem } from "@mui/material";
import userApi from "../../../api/UserApi";
import { Label } from "reactstrap";
import Pagination from "./pagination";

const MyTasksTable = ({ isWritePost, selectedTaskId, setSelectedTask }) => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const [temp, setTemp] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const [selectedTasks, setSelectedTasks] = useState("");
  const [sortStatus, setSortStatus] = useState(null);
  const [deadlineSort, setDeadlineSort] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [show, setShow] = useState(false);
  const [editor, setEditor] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const [pageOfItems, setPageOfItems] = useState([]);
  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  };
  const getEditor = async (editorId) => {
    try {
      const param = { id: editorId };
      const response = await userApi.getById(param);
      setEditor(response);
    } catch (e) {
      toast.error(e);
    }
  };
  const loadAllTasks = async () => {
    try {
      const params = {
        EditorID: user_info ? user_info.accountId : "",
        status: "",
      };
      const response = await taskApi.getAllByIdAndStatus(params);
      setTasks(
        isWritePost
          ? sortStatus === null
            ? response
                .filter((e) => e.status === "New" || e.status === "Pending")
                .sort((a, b) =>
                  deadlineSort === true
                    ? new moment(a.deadLineTime) - new moment(b.deadLineTime)
                    : new moment(b.deadLineTime) - new moment(a.deadLineTime)
                )
            : response
                .filter((e) => e.status === sortStatus)
                .sort((a, b) =>
                  deadlineSort === true
                    ? new moment(a.deadLineTime) - new moment(b.deadLineTime)
                    : new moment(b.deadLineTime) - new moment(a.deadLineTime)
                )
          : sortStatus === null
          ? response.sort((a, b) =>
              deadlineSort === true
                ? new moment(a.deadLineTime) - new moment(b.deadLineTime)
                : new moment(b.deadLineTime) - new moment(a.deadLineTime)
            )
          : response
              .filter((e) => e.status === sortStatus)
              .sort((a, b) =>
                deadlineSort === true
                  ? new moment(a.deadLineTime) - new moment(b.deadLineTime)
                  : new moment(b.deadLineTime) - new moment(a.deadLineTime)
              )
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  const viewReports2 = async (reportTasks) => {
    setShow(true);
    setReports([]);
    try {
      reportTasks.map(async (report) => {
        const param = { id: report.reportId };
        const response = await reportApi.find(param);
        setReports((reports) => [...reports, response]);
      });
    } catch (e) {
      toast.error(e.message);
    }
  };
  const viewReports = async (taskId, reportTasks) => {
    setReports([]);
    setShowMore(true);
    setSelectedTasks(taskId);
    try {
      reportTasks.map(async (report) => {
        const param = { id: report.reportId };
        const response = await reportApi.find(param);
        setReports((reports) => [...reports, response]);
      });
      //   loadReports();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleCloseMore = () => {
    setShowMore(false);
    setSelectedTasks("");
    setReports([]);
  };
  const handleCloseImg = () => {
    setShowImg(false);
  };
  const handleClick = async (taskId) => {
    const params = {
      taskId: taskId,
      status: 2,
    };
    await taskApi.updateStatus(params);
    window.location.href = "/admin/create-post?taskId=" + taskId;
  };
  const handleSort = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSort2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseSort = (status) => {
    setSortStatus(status);
    setAnchorEl(null);
    loadAllTasks();
  };
  const handleCloseSort2 = (status) => {
    setDeadlineSort(status);
    setAnchorEl2(null);
    loadAllTasks();
  };
  const handleOpenTask = async (taskId) => {
    setShow(true);
    try {
      const params = { id: taskId };
      const response = await taskApi.getById(params);
      getEditor(response.editorId);
      viewReports2(response.reportTasks);
      setTaskDetail(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleCloseTask = () => {
    //
    setShow(false);
  };
  useEffect(() => {
    loadAllTasks();
  }, []);
  return (
    <>
      <Modal
        scrollable={true}
        show={showImg}
        onHide={handleCloseImg}
        centered
        size="xl"
      >
        <Modal.Body style={{ color: "black" }}>
          <img
            src={selectedImg}
            alt="large-img"
            width="1100px"
            height="870px"
          />
        </Modal.Body>
      </Modal>
      {taskDetail && editor && reports && (
        <Modal
          scrollable={true}
          show={show}
          onHide={handleCloseTask}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết công việc</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md="3">
                    <Label for="file">
                      <b>Miêu tả công việc:</b>
                    </Label>
                  </Col>
                  <Col md="9">{taskDetail.description}</Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label for="file">
                      <b>Biên tập viên:</b>{" "}
                    </Label>
                  </Col>
                  <Col md="9">{editor.accountInfo.fullname}</Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label for="file">
                      <b>Deadline:</b>{" "}
                    </Label>
                  </Col>
                  <Col md="9">
                    {moment(taskDetail.deadLineTime).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label for="file">
                      <b>Công việc cũ:</b>{" "}
                    </Label>
                  </Col>
                  <Col md="9">
                    {taskDetail.historyTaskId === null
                      ? "Không có"
                      : taskDetail.historyTaskId}
                  </Col>
                </Row>
                <Col md="3">
                  <Label for="file">
                    <b style={{ color: "black" }}>Báo cáo đính kèm:</b>
                  </Label>
                </Col>
                {reports &&
                  reports.map((report) => (
                    <Row
                      style={{
                        backgroundColor: "#f2f2f2",
                        marginLeft: 5,
                        marginRight: 5,
                        borderRadius: 10,
                        paddingTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Col md="12">
                        <>
                          <Row className="mb-3">
                            <Col md="3">
                              <b>Địa điểm:</b>
                            </Col>
                            <Col md="9" className="ml-auto">
                              {report.location}
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md="3">
                              <b>Thời điểm xảy ra:</b>
                            </Col>
                            <Col md="9" className="ml-auto">
                              {moment(report.timeFraud).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md="3">
                              <b>Thời điểm gửi:</b>
                            </Col>
                            <Col md="9" className="ml-auto">
                              {moment(report.createTime).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md="3">
                              <b>Nội dung:</b>
                            </Col>
                            <Col md="9" className="ml-auto">
                              <Markup
                                content={report.description}
                                allowAttributes
                                allowElements
                              />
                            </Col>
                          </Row>
                          {report.reportDetails.length > 0 && (
                            <>
                              <Row className="mb-3">
                                <Col md="3">
                                  <b>Ảnh đính kèm:</b>
                                </Col>
                                <Col md="9" className="ml-auto">
                                  {report.reportDetails.length > 0 &&
                                  report.reportDetails.filter(
                                    (img) => img.type === "Image"
                                  ).length > 0
                                    ? report.reportDetails
                                        .filter((img) => img.type === "Image")
                                        .map((img) => (
                                          <>
                                            <Col md="2">
                                              {img.media.includes("http") ? (
                                                <img
                                                  src={img.media}
                                                  width="200"
                                                  length="200"
                                                  alt="img"
                                                />
                                              ) : (
                                                <span className="text-muted">
                                                  Không có ảnh
                                                </span>
                                              )}
                                            </Col>
                                          </>
                                        ))
                                    : null}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col md="3">
                                  <b>Video đính kèm:</b>
                                </Col>
                                <Col md="9" className="ml-auto">
                                  {report.reportDetails.length > 0 &&
                                  report.reportDetails.filter(
                                    (video) => video.type === "Video"
                                  ).length > 0
                                    ? report.reportDetails
                                        .filter(
                                          (video) => video.type === "Video"
                                        )
                                        .map((video) =>
                                          video.media.includes("http") ? (
                                            <label for="videos">
                                              <video
                                                width="400"
                                                height="150"
                                                controls
                                                style={{
                                                  height: "200px",
                                                  objectFit: "contain",
                                                }}
                                                autoPlay
                                                loop
                                              >
                                                <source src={video.media} />
                                              </video>
                                            </label>
                                          ) : (
                                            <span className="text-muted">
                                              Không có video
                                            </span>
                                          )
                                        )
                                    : null}
                                </Col>
                              </Row>
                            </>
                          )}
                        </>
                      </Col>
                    </Row>
                  ))}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTask}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Table className="">
        <thead>
          <tr className="text-black">
            <th scope="col">Miêu tả công việc</th>
            <th className="text-center" scope="col">
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "gray",
                  border: "none",
                }}
                id="positioned-button"
                aria-controls={open2 ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
                onClick={handleSort2}
              >
                Hạn chót{" "}
                {deadlineSort === true
                  ? ": Gần nhất"
                  : deadlineSort === true
                  ? ": Xa nhất"
                  : ""}{" "}
                <i className="fa fa-chevron-down"></i>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleCloseSort2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => handleCloseSort2(true)}>
                  Gần nhất
                </MenuItem>
                <MenuItem onClick={() => handleCloseSort2(false)}>
                  Xa nhất
                </MenuItem>
              </Menu>
            </th>
            <th className="text-center" scope="col">
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "gray",
                  border: "none",
                }}
                id="positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleSort}
              >
                Trạng thái <i className="fa fa-chevron-down"></i>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseSort}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => handleCloseSort("New")}>Mới</MenuItem>
                <MenuItem onClick={() => handleCloseSort("Pending")}>
                  Đang làm
                </MenuItem>
                {!isWritePost && (
                  <>
                    <MenuItem onClick={() => handleCloseSort("Review")}>
                      Đang xem xét
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseSort("Finish")}>
                      Đã hoàn thành
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseSort("UnFinished")}>
                      Chưa hoàn thành
                    </MenuItem>
                  </>
                )}
              </Menu>
            </th>
            <th className="text-center" scope="col">
              Hành động
            </th>
          </tr>
        </thead>
        {pageOfItems.length > 0 ? (
          pageOfItems.map((task) => (
            <tbody>
              <tr>
                <div style={{ maxWidth: "45rem" }}>
                  <h6 className="mb-2">{task.description}</h6>
                  {showMore && selectedTasks === task.taskId ? (
                    <Container
                      fluid
                      style={{
                        animation: "1s fadeIn",
                        animationFillMode: "forwards",
                      }}
                    >
                      {reports &&
                        reports.map((report) => (
                          <div
                            style={{
                              backgroundColor: "#f4f5f7",
                              padding: "1rem",
                              borderRadius: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <h6 className="mb-2">
                              <strong>Báo cáo: </strong>
                              <span className="text-primary">
                                {report.reportId}
                              </span>
                            </h6>
                            <Row className="mb-3">
                              <Col md="3">
                                <b>Địa điểm:</b>
                              </Col>
                              <Col md="9" className="ml-auto">
                                {report.location.length > 50
                                  ? report.location.substring(0, 50) + "..."
                                  : report.location}
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md="3">
                                <b>Thời điểm xảy ra:</b>
                              </Col>
                              <Col md="9" className="ml-auto">
                                {moment(report.timeFraud).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )}
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md="3">
                                <b>Nội dung:</b>
                              </Col>
                              <Col md="8" className="ml-auto limit pr-1">
                                <Markup
                                  content={report.description}
                                  allowAttributes
                                  allowElements
                                />
                                {/* {report.description} */}
                              </Col>
                              <Col md="9" className="ml-auto mt-1">
                                <a
                                  onClick={() => {
                                    handleOpenTask(task.taskId);
                                  }}
                                  className="text-link"
                                >
                                  <b>Xem chi tiết</b>
                                </a>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      <a
                        onClick={() => handleCloseMore()}
                        className="text-link"
                      >
                        Rút gọn <i className="fa fa-arrow-up"></i>
                      </a>
                    </Container>
                  ) : (
                    <a
                      onClick={() => viewReports(task.taskId, task.reportTasks)}
                      className="text-link"
                    >
                      Xem thêm <i className="fa fa-arrow-down"></i>
                    </a>
                  )}
                </div>
                <td className="text-center" style={{ color: "red" }}>
                  {moment(task.deadLineTime).format("DD/MM/YYYY HH:mm:ss")}
                </td>
                <td className="text-center">
                  {task.status === "New" && (
                    <span className="text-info float-right mr-5 font-weight-bold">
                      Mới
                    </span>
                  )}
                  {task.status === "Review" && (
                    <span className="text-warning">Đang xem xét</span>
                  )}
                  {task.status === "Finish" && (
                    <span className="text-success">Đã hoàn thành</span>
                  )}
                  {task.status === "UnFinished" && (
                    <span className="text-danger">Không hoàn thành</span>
                  )}
                  {task.status === "Pending" && (
                    <span className="text-primary">Đang làm</span>
                  )}
                </td>
                <td className="text-center">
                  {isWritePost ? (
                    task.taskId === selectedTaskId ? (
                      <div>
                        <span style={{ color: "green" }}>
                          Đã chọn{" "}
                          <i
                            className="done-task fa fa-solid fa-check"
                            style={{ color: "green" }}
                          />
                        </span>
                      </div>
                    ) : (
                      <div
                        onClick={async () => {
                          setSelectedTask(task.taskId);
                          const params = {
                            taskId: task.taskId,
                            status: 2,
                          };
                          await taskApi.updateStatus(params);
                        }}
                      >
                        <span className="hover" style={{ color: "blue" }}>
                          Chọn
                        </span>
                      </div>
                    )
                  ) : task.status === "New" || task.status === "Pending" ? (
                    <div onClick={() => handleClick(task.taskId)}>
                      <i
                        className="done-task fa fa-solid fa-check"
                        style={{ color: "green" }}
                      />{" "}
                      <span className="hover" style={{ color: "green" }}>
                        Hoàn thành ngay
                      </span>
                    </div>
                  ) : (
                    <div>
                      <i
                        className="done-task fa fa-solid fa-check"
                        style={{ color: "lightgray" }}
                      />{" "}
                      <span style={{ color: "lightgray" }}>Đã hoàn thành</span>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <div className="mb-2 float-centered">
            <strong>Không có công việc nào trong đây</strong>
          </div>
        )}
      </Table>
      {tasks.length > 0 && (
        <Pagination items={tasks} onChangePage={onChangePage} />
      )}
    </>
  );
};

export default MyTasksTable;
