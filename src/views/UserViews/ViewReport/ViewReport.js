import { CBadge, CSmartTable } from "@coreui/react-pro";
import React, { Component, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Button, Input } from "semantic-ui-react";
import reportApi from "../../../api/reportApi";
import { Markup } from "interweave";
import moment from "moment";
import "moment/locale/vi";
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
      return "Đã xem xét";
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
  const [searchId, setSearchId] = useState("");
  async function handle_search() {
    try {
      const param = { id: searchId };
      const response = await reportApi.find(param);
      setReports(
        response
          .filter((report) =>
            user_info && user_info.role.roleId === 1
              ? report.userId === user_info.email
              : report.staffId === user_info.email
          )
          .sort((a, b) => new moment(a.createTime) - new moment(b.createTime))
          .reverse()
      );
    } catch (e) {
      alert(e.message);
    }
  }
  const handle_change = (event) => {
    setSearchId(event.target.value);
  };

  useEffect(() => {
    handle_search();
  }, [handle_search]);
  return (
    <div
      className="animated fadeIn"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div className="h3 pt-3 font-weight-bold">Lịch sử báo cáo của bạn</div>
      <Row className="pb-3 pt-3">
        <Input
          placeholder="Tìm kiếm báo cáo"
          className="mb-3 mr-3"
          value={searchId}
          onChange={handle_change}
        />
        <Button style={{ height: "40px" }} onClick={() => handle_search}>
          Tìm
        </Button>
      </Row>

      {reports !== null && (
        <CSmartTable
          activePage={1}
          clickableRows
          columns={columns}
          items={reports}
          itemsPerPage={5}
          pagination
          scopedColumns={{
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>
                  {getStatus(item.status)}
                </CBadge>
              </td>
            ),
            index: (item) => {
              return <td className="py-2 font-weight-bold">{item._id + 1}</td>;
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
  );
};

export default SendReport;
