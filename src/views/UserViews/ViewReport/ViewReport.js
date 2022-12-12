import { CBadge, CSmartTable } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import reportApi from "../../../api/reportApi";
import { Markup } from "interweave";
import moment from "moment";
import "moment/locale/vi";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
const getBadge = (status) => {
  switch (status) {
    case "New":
      return "success";
    case "Pending":
      return "warning";
    case "Approved":
      return "primary";
    case "Denied":
      return "danger";
    default:
      return "secondary";
  }
};
const getStatus = (status) => {
  switch (status) {
    case "New":
      return "Mới";
    case "Pending":
      return "Đang xem xét";
    case "Approved":
      return "Đã xem xét";
    case "Denied":
      return "Đã xem xét";
    default:
      return "không xác định";
  }
};
const columns = [
  {
    key: "index",
    label: "Thứ tự",
    filter: false,
    sorter: false,
    _style: { width: "5%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "location",
    label: "Vị trí",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "createTime",
    label: "Thời gian tạo",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "timeFraud",
    label: "Thời điểm vụ việc",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "description",
    label: "Chi tiết",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "status",
    label: "Trạng thái",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
];
const SendReport = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  if (!user_info) {
    window.location.href = "/login";
  }
  const [reports, setReports] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [open, setOpen] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  async function handle_search() {
    try {
      const param = {};
      const response = await reportApi.find(param);
      setReports(
        response
          .filter((report) =>
            user_info && user_info.role.roleId === 1
              ? report.userId === (user_info && user_info.accountId)
              : report.staffId === (user_info && user_info.accountId)
          )
          .sort((a, b) => new moment(a.createTime) - new moment(b.createTime))
          .reverse()
      );
    } catch (e) {
      toast.error(e.message);
    }
  }
  const handle_detail = (e) => {
    setSelectedReport(e);
    setOpen(true);
  };
  const handle_close = (e) => {
    setSelectedReport(null);
    setOpen(false);
  };
  const handleCloseImg = () => {
    setShowImg(false);
  };
  const viewImg = (image) => {
    setSelectedImg(image);
    setShowImg(true);
  };
  useEffect(() => {
    handle_search();
  }, [handle_search]);
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
      <Modal
        scrollable={true}
        show={open}
        onHide={handle_close}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết báo cáo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="mm-example-row">
            <Container fluid>
              {selectedReport && (
                <>
                  <Row className="mb-3">
                    <Col md="3">
                      <b>Địa điểm:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      {selectedReport.location}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b>Thời điểm xảy ra:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      {moment(selectedReport.timeFraud).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b>Thời điểm gửi:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      {moment(selectedReport.createTime).format(
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
                        content={selectedReport.description}
                        allowAttributes
                        allowElements
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b>Ảnh đính kèm:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      {selectedReport.reportDetails.length > 0 &&
                      selectedReport.reportDetails.filter(
                        (img) => img.type === "Image"
                      ).length > 0
                        ? selectedReport.reportDetails
                            .filter((img) => img.type === "Image")
                            .map((img) => (
                              <>
                                {img.media.includes("http") ? (
                                  <img
                                    src={img.media}
                                    width="500"
                                    length="500"
                                    alt="img"
                                    onClick={() => viewImg(img.media)}
                                  />
                                ) : (
                                  <span className="text-muted">
                                    Không có ảnh
                                  </span>
                                )}
                              </>
                            ))
                        : "Không có ảnh"}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="3">
                      <b>Video đính kèm:</b>
                    </Col>
                    <Col md="9" className="ml-auto">
                      {selectedReport.reportDetails.length > 0 &&
                      selectedReport.reportDetails.filter(
                        (video) => video.type === "Video"
                      ).length > 0
                        ? selectedReport.reportDetails
                            .filter((video) => video.type === "Video")
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
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handle_close()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="animated fadeIn"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
          paddingTop: "5rem",
        }}
      >
        <div className="h3 pt-3 font-weight-bold">Lịch sử báo cáo của bạn</div>
      </div>
      <div
        style={{
          marginTop: "2rem",
          marginLeft: "10rem",
          marginRight: "10rem",
          height: "60vh",
        }}
      >
        {reports !== null && (
          <CSmartTable
            activePage={1}
            clickableRows
            columns={columns}
            items={reports}
            itemsPerPage={5}
            pagination
            itemsPerPageSelect
            onRowClick={(e) => handle_detail(e)}
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>
                    {getStatus(item.status)}
                  </CBadge>
                </td>
              ),
              index: (item) => {
                return (
                  <td className="py-2 font-weight-bold">{item._id + 1}</td>
                );
              },
              description: (item) => {
                return JSON.stringify(item).includes("_props") ? (
                  <td
                    className="py font-weight-bold"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "20rem",
                    }}
                  >
                    <Markup
                      content={item.description}
                      allowAttributes
                      allowElements
                      blockList={["img", "iframe"]}
                      noHtml={true}
                    />
                  </td>
                ) : (
                  <td
                    className="py"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "20rem",
                    }}
                  >
                    <Markup
                      content={item.description}
                      allowAttributes
                      allowElements
                      blockList={["img", "iframe"]}
                      noHtml={true}
                    />
                  </td>
                );
              },
              createTime: (item) => {
                return JSON.stringify(item).includes("_props") ? (
                  <td className="py font-weight-bold">
                    {moment(item.createTime).format("DD MMMM YYYY, h:mm:ss")}
                  </td>
                ) : (
                  <td className="py">
                    {moment(item.createTime).format("DD MMMM YYYY, h:mm:ss")}
                  </td>
                );
              },
              timeFraud: (item) => {
                return JSON.stringify(item).includes("_props") ? (
                  <td className="py font-weight-bold">
                    {" "}
                    {moment(item.timeFraud).format("DD MMMM YYYY, h:mm:ss")}
                  </td>
                ) : (
                  <td className="py">
                    {" "}
                    {moment(item.timeFraud).format("DD MMMM YYYY, h:mm:ss")}
                  </td>
                );
              },
              location: (item) => {
                return JSON.stringify(item).includes("_props") ? (
                  <td className="py-2 font-weight-bold">{item.location}</td>
                ) : (
                  <td className="py-2">{item.location}</td>
                );
              },
            }}
            tableProps={{
              striped: true,
              hover: true,
            }}
          />
        )}
      </div>
    </>
  );
};

export default SendReport;
