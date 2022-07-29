import React, { useEffect, useState } from "react";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

import { Button, Row } from "react-bootstrap";
import { CBadge, CSmartTable } from "@coreui/react-pro";
import postApi from "../../../../api/postApi";
import { Markup } from "interweave";
import {
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";
//
const EditorPostTable = () => {
  const [posts, setPosts] = useState();
  async function loadPosts() {
    try {
      const user_info = localStorage.getItem("user_info");
      const param = {
        EditorID: user_info !== null && JSON.parse(user_info).email,
        Status: 1,
      }; //Crafted only
      const response = await postApi.getByIdAndStatus(param);
      setPosts(response);
    } catch (e) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    loadPosts();
  }, [posts]);
  //
  const [details, setDetails] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const columns = [
    {
      key: "index",
      filter: false,
      sorter: false,
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "title",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "createTime",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "description",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "status",
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "show_details",
      label: "Options",
      _style: { width: "5%" },
      filter: false,
      sorter: false,
      _props: { className: "fw-semibold" },
    },
  ];
  const getBadge = (status) => {
    switch (status) {
      case "Crafted":
        return "primary";
      case "Hidden":
        return "warning";
      case "Public":
        return "success";
      default:
        return "secondary";
    }
  };

  const [editedDescription, setEditedDescription] = useState(null);
  const toggleDetails = async (id) => {
    setVisibleModal(!visibleModal);
    try {
      const param = { id: id };
      const response = await postApi.getById(param);
      const metaDescription = JSON.stringify(response.description)
        .replace(
          "<img",
          '<img style="width:55rem;height:30rem;padding-left:2rem;padding-right:2rem"'
        )
        .replace(
          "<iframe",
          '<iframe style="width:55rem;height:30rem;padding-left:2rem;padding-right:2rem"'
        )
        .replace(/\\/g, "");
      const description = metaDescription.substring(
        1,
        metaDescription.length - 1
      );
      setEditedDescription(description);
      setDetails(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {});
  return (
    <div>
      <Modal
        isOpen={visibleModal}
        toggle={() => (setVisibleModal(false), setDetails(null))}
        className=""
        size="lg"
        style={{ maxWidth: "1600px", width: "80%" }}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => (setVisibleModal(false), setDetails(null))}
        >
          Chi tiết bài báo
        </ModalHeader>
        {details !== null ? (
          <>
            <ModalBody>
              <FormGroup row>
                <Col md="2">
                  <Label for="location">
                    <b>ID: </b>
                  </Label>
                </Col>
                <Col md="10">{details.postId}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label for="location">
                    <b>Tiêu đề: </b>
                  </Label>
                </Col>
                <Col md="10">{details.title}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label for="location">
                    <b>Danh mục: </b>
                  </Label>
                </Col>
                <Col md="10">{details.category.subCategory}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label for="location">
                    <b>Tác giả: </b>
                  </Label>
                </Col>
                <Col md="10">{details.editor.accountInfo.username}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label for="location">
                    <b>Thời điểm tạo: </b>
                  </Label>
                </Col>
                <Col md="10">{details.createTime}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label for="location">
                    <b>Nội dung: </b>
                  </Label>
                </Col>
                <Col md="12">
                  <Markup
                    content={editedDescription}
                    allowAttributes
                    allowElements
                  />
                </Col>
              </FormGroup>
            </ModalBody>
          </>
        ) : (
          <Row className="d-flex justify-content-center">
            <div class="spinner-border text-primary mb-5 mt-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </Row>
        )}
      </Modal>

      {posts !== null && (
        <CSmartTable
          noItemsLabel="Không có dữ liệu..."
          draggable
          activePage={1}
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          items={posts}
          itemsPerPageSelect
          itemsPerPage={10}
          pagination
          scopedColumns={{
            index: (item) => {
              return <td className="py-2">{item._id + 1}</td>;
            },
            description: (item) => {
              return (
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
              return (
                <td className="py">
                  {JSON.stringify(item.createTime)
                    .replace("T", " ")
                    .substring(1, JSON.stringify(item.createTime).length - 1)}
                </td>
              );
            },
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status.trim())}>
                  {item.status}
                </CBadge>
              </td>
            ),
            show_details: (item) => {
              return (
                <td className="py-2">
                  <Button onClick={() => toggleDetails(item.postId)}>
                    Chi tiết
                  </Button>
                </td>
              );
            },
          }}
          tableFilter
          tableProps={{
            hover: true,
          }}
        />
      )}
    </div>
  );
};

export default EditorPostTable;
