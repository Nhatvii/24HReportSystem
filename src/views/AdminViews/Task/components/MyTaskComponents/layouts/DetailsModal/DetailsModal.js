import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import reportApi from "../../../../../../../api/reportApi";
import taskApi from "../../../../../../../api/TaskApi";
import moment from "moment";
import { HeaderContainer } from "../Header/HeaderStyles";
import {
  ModalContainer,
  ModalWrapper,
  HeaderTitle,
  CloseButton,
  Separator,
  SubmitButtonsContainer,
  DescriptionContainer,
} from "./DetailsModalStyles";
import { Markup } from "interweave";
import postApi from "../../../../../../../api/postApi";
import { CBadge, CSmartTable } from "@coreui/react-pro";
import { ImgUpload, UploadContainer } from "../../../../../Posts/CreatePost";
import categoryApi from "../../../../../../../api/categoryApi";
import FontAwesome from "../../../../../../../components/uiStyle/FontAwesome";
import BreadCrumb from "../../../../../../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { Comments } from "../../../../../../UserViews/Post/components/Comments";

const DetailsModal = (props) => {
  const [opacity, setOpacity] = useState("0");
  const [display, setDisplay] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [reportTasks, setReportTasks] = useState(null);
  const [visibleReportModal, setVisibleReportModal] = useState(false);
  const [visiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [visiblePostModal, setVisiblePostModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState(null);
  const [reportDetails, setReportDetails] = useState(null);
  //Post table details
  const [editedPostDescription, setEditedPostDescription] = useState(null);
  const [details, setDetails] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [categoryList, setCategoryList] = useState([]);
  //user info
  const user_info = localStorage.getItem("user_info");
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
      setEditedPostDescription(description);
      setDetails(response);
    } catch (e) {
      alert(e.message);
    }
  };
  async function loadCategory() {
    try {
      const params = {};
      const response = await categoryApi.getAllSub(params);
      setCategoryList(response);
    } catch (e) {
      alert(e.message);
    }
  }
  //Function
  const columns = [
    {
      key: "index",
      filter: false,
      sorter: false,
      label: "Thứ tự",
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "title",
      label: "Tiêu đề",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "createTime",
      label: "Ngày tạo",
      _style: { width: "10%" },
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
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "show_details",
      label: "Options",
      _style: { width: "10%" },
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
  const reloadNumber = async () => {
    try {
      const params = {
        EditorID:
          JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
        status: "",
      };
      const params2 = {
        EditorID:
          JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
        status: 2,
      };
      const params3 = {
        EditorID:
          JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
        status: 5,
      };
      const params4 = {
        EditorID:
          JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
        status: 3,
      };
      const params5 = {
        EditorID:
          JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
        status: 4,
      };

      const response = await taskApi.getAllByIdAndStatus(params);
      const response2 = await taskApi.getAllByIdAndStatus(params2);
      const response3 = await taskApi.getAllByIdAndStatus(params3);
      const response4 = await taskApi.getAllByIdAndStatus(params4);
      const response5 = await taskApi.getAllByIdAndStatus(params5);

      localStorage.setItem(
        "task1",
        response.filter((task) => task.status !== "New").length
      );
      localStorage.setItem(
        "task2",
        response2.filter(
          (task) =>
            moment(task.deadLineTime).isBefore() && task.status !== "New"
        ).length
      );
      localStorage.setItem(
        "task3",
        response2.filter(
          (task) =>
            moment
              .duration(moment(task.deadLineTime).diff(moment()))
              .asDays() <= 7 && task.status !== "New"
        ).length
      );
      localStorage.setItem("task4", response3.length);
      localStorage.setItem("task5", response4.length);
      localStorage.setItem("task6", response5.length);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleFinishTask = async (id) => {
    setIsLoading(true);
    try {
      const params = {
        taskId: id,
        status: 3,
        postId: selectedPost,
      };
      console.log(params);
      await taskApi.updateStatus(params);
      reloadNumber();
      handleCloseModal();
      setIsLoading(false);
      // window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  };
  const handleCloseModal = () => {
    setOpacity("0");
    setTimeout(() => setDisplay("none"), 200);
    props.setOpenModal({ ifOpen: false, id: "" });
    setIsLoading(false);
  };
  const toggleReportDetails = async (id) => {
    setVisibleReportModal(!visibleReportModal);
    try {
      const param = { id: id };
      console.log(param);
      const response = await reportApi.find(param);
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
      console.log(response);
      setEditedDescription(description);
      setReportDetails(response);
    } catch (e) {
      alert(e.message);
    }
  };
  const [posts, setPosts] = useState();
  async function loadPosts() {
    try {
      const user_info = localStorage.getItem("user_info");
      const param = {
        EditorID:
          JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
        Status: 1,
      }; //Crafted only
      const response = await postApi.getByIdAndStatus(param);
      setPosts(response);
    } catch (e) {
      alert(e.message);
    }
  }
  useEffect(() => {
    loadPosts();
    loadCategory();
  }, []);
  useEffect(() => {
    if (props.openModal.ifOpen) {
      setDisplay("flex");
      const usedTask = props.tasks.find(
        (task) => task.taskId === props.openModal.id
      );
      setReportTasks(usedTask.reportTasks);
      setDescription(usedTask);
      setTimeout(() => setOpacity("1"), 200);
    }
  }, [props.openModal.ifOpen]);
  return (
    <ModalContainer visible={display} opacity={opacity}>
      <ModalWrapper
        opacity={opacity}
        translate={`translateY(${opacity === "1" ? "0" : "10"}px)`}
      >
        <HeaderContainer>
          <HeaderTitle>Chi tiết công việc</HeaderTitle>
          <CloseButton onClick={handleCloseModal} title="Đóng" type="button">
            <span />
          </CloseButton>
          <Separator />
        </HeaderContainer>
        <DescriptionContainer>
          <p>
            <h5>Miêu tả: </h5>
          </p>
          <p>{description.description}</p>
          <p>
            <h5>Báo cáo đính kèm: </h5>
          </p>
          {reportTasks !== null && reportTasks.length > 0
            ? reportTasks.map((report) => (
                <div className="pb-2">
                  <Button
                    color="link"
                    onClick={() => toggleReportDetails(report.reportId)}
                  >
                    Xem chi tiết báo cáo ID: <b>{report.reportId}</b>
                  </Button>
                </div>
              ))
            : "Không có báo cáo đính kèm"}
          {reportDetails !== null && (
            <Modal
              size="lg"
              style={{ maxWidth: "1000px", width: "80%" }}
              isOpen={visibleReportModal}
              toggle={() => (
                setVisibleReportModal(false), setReportDetails(null)
              )}
              onClosed={() => (
                setVisibleReportModal(false), setReportDetails(null)
              )}
            >
              <ModalHeader
                className="bg-primary"
                toggle={() => (
                  setVisibleReportModal(false), setReportDetails(null)
                )}
              >
                Chi tiết báo cáo
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Col md="2">
                    <Label for="location">
                      <b>Địa điểm:</b>{" "}
                    </Label>
                  </Col>
                  <Col md="4">{reportDetails.location}</Col>
                  <Col md="2">
                    <Label for="userId">
                      <b>Người gửi: </b>{" "}
                    </Label>
                  </Col>
                  <Col md="4">
                    {reportDetails.userId === null
                      ? "Không có"
                      : reportDetails.userId}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="2">
                    <Label for="timeFraud">
                      <b> Thời gian vụ việc: </b>
                    </Label>
                  </Col>
                  <Col md="4">{reportDetails.timeFraud}</Col>
                  <Col md="2">
                    <Label for="createTime">
                      <b>Thời gian viết: </b>
                    </Label>
                  </Col>
                  <Col md="4">{reportDetails.createTime}</Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="2">
                    <Label for="category">
                      {" "}
                      <b>Phân loại: </b>
                    </Label>
                  </Col>
                  <Col md="4">
                    {reportDetails.categoryId === 1
                      ? "Khác"
                      : categoryList.find(
                          (c) => c.categoryId === reportDetails.categoryId
                        ).subCategory}
                  </Col>
                  <Col md="2">
                    <Label for="staffId">
                      <b>Người xác nhận: </b>
                    </Label>
                  </Col>
                  <Col md="4">
                    {reportDetails.staffId === null
                      ? "Không có"
                      : reportDetails.staffId}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label for="description">
                      <b>Chi tiết: </b>
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
                {/* File đính kèm */}
                <FormGroup row>
                  <Col md="12">
                    <Label for="description">
                      <b>Ảnh đính kèm: </b>
                    </Label>
                  </Col>
                  {reportDetails.reportDetails.length > 0 &&
                    (reportDetails.reportDetails.filter(
                      (img) => img.type === "Image"
                    ).length > 0
                      ? reportDetails.reportDetails
                          .filter((img) => img.type === "Image")
                          .map((img) => (
                            <>
                              <Col md="2">
                                <FormGroup>
                                  <UploadContainer>
                                    {img.media.includes("http") ? (
                                      <ImgUpload preview={img.media} />
                                    ) : (
                                      <>
                                        <ImgUpload />
                                      </>
                                    )}
                                  </UploadContainer>
                                </FormGroup>
                              </Col>
                            </>
                          ))
                      : "Không có ảnh đính kèm")}
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Label for="description">
                      <b>Video đính kèm: </b>
                    </Label>
                  </Col>
                  {reportDetails.reportDetails.length > 0 &&
                    (reportDetails.reportDetails.filter(
                      (video) => video.type === "Video"
                    ).length > 0
                      ? reportDetails.reportDetails
                          .filter((video) => video.type === "Video")
                          .map((video) => (
                            <Col md="12">
                              {video.media.includes("http") ? (
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
                              )}
                            </Col>
                          ))
                      : "Không có video đính kèm")}
                </FormGroup>
              </ModalBody>
            </Modal>
          )}
          {(description.status === "Review" ||
            description.status === "Finish" ||
            description.status === "UnFinished") && (
            <FormGroup row>
              <Col md="3">
                <Label for="file">
                  <b>Bài viết đính kèm: </b>
                </Label>
              </Col>
              <Col md="9">
                <div className="row pl-1">
                  {description.posts.length !== 0
                    ? description.posts.map((post) => (
                        <div className="pb-2">
                          <Button
                            color="link"
                            onClick={() => setVisiblePreviewModal(true)}
                          >
                            Xem bài viết
                          </Button>
                        </div>
                      ))
                    : "Không có bài viết đính kèm"}
                  {/* Load post preview */}
                  {description.posts.length !== 0 && (
                    <Modal
                      size="lg"
                      style={{
                        minWidth: "100vw",
                        width: "100%",
                        marginTop: 0,
                      }}
                      fullScreen
                      isOpen={visiblePreviewModal}
                      toggle={() => setVisiblePreviewModal(false)}
                      onClosed={() => setVisiblePreviewModal(false)}
                    >
                      <ModalHeader
                        className="bg-primary"
                        toggle={() => setVisiblePreviewModal(false)}
                      >
                        Bản xem thử
                      </ModalHeader>
                      <ModalBody style={{ backgroundColor: "#F7F7F7" }}>
                        {/* Nội dung xem trước */}
                        <Fragment>
                          <BreadCrumb className="shadow5" title="Bài viết" />
                          <span className="space-30" />
                          <div className="container">
                            <div className="row">
                              <div className="col-12 col-md-10 col-lg-8 m-auto">
                                <div className="row">
                                  <div className="col-6 align-self-center">
                                    <div className="page_category">
                                      <h4>
                                        {description.posts[0].category
                                          ? description.posts[0].category
                                          : "Khác"}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="col-6 text-right">
                                    <div className="page_comments">
                                      <ul className="inline">
                                        <li>
                                          <FontAwesome name="thumbs-up" />1
                                        </li>
                                        <li>
                                          <FontAwesome name="comment" />1
                                        </li>
                                        <li>
                                          <FontAwesome name="share" />1
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-30" />
                                <div className="single_post_heading">
                                  <h1>{description.posts[0].title}</h1>
                                  <div className="space-10" />
                                  <p>{description.posts[0].subTitle}</p>
                                </div>
                                <div className="space-40" />
                                {description.posts[0].image.includes(
                                  "http"
                                ) && (
                                  <img
                                    src={description.posts[0].image}
                                    alt="thumb"
                                    style={{
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      width: "100%",
                                      display: "inline-block",
                                    }}
                                    class="img-responsive"
                                  />
                                )}
                                <div className="space-20" />
                                <div className="row">
                                  <div className="col-lg-6 align-self-center">
                                    <div className="author">
                                      <div className="author_img">
                                        <div className="author_img_wrap">
                                          <img
                                            src="https://picsum.photos/50/50"
                                            alt="author"
                                          />
                                        </div>
                                      </div>
                                      <Link to="#">
                                        {
                                          JSON.parse(
                                            localStorage.getItem("user_info")
                                          ).accountInfo.username
                                        }
                                      </Link>
                                      <ul>
                                        <li>
                                          <Link to="#">
                                            {moment(
                                              description.posts[0].publicTime
                                            ).format("DD ,D MM YYYY")}
                                          </Link>
                                        </li>
                                        <li>
                                          {description.posts[0].updateTime &&
                                            "cập nhật lần cuối " +
                                              moment(
                                                description.posts[0].updateTime
                                              )
                                                .format("dddd, Do MM YYYY")
                                                .toLocaleUpperCase()}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-20" />
                                <div style={{ whiteSpace: "pre-wrap" }}>
                                  <Markup
                                    content={description.posts[0].description}
                                  />
                                </div>
                                <div className="space-40" />
                                <div className="border_black" />
                                {/* Comment like share */}
                                <Comments className="comments" />
                                <div className="space-60" />
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      </ModalBody>
                    </Modal>
                  )}
                </div>
              </Col>
            </FormGroup>
          )}
          {description.status === "Pending" && (
            <FormGroup row>
              <Col md="3">
                <Label for="file">
                  <b>
                    Bài viết đính kèm:<span class="text-danger">*</span>{" "}
                  </b>
                </Label>
              </Col>
              {selectedPost === undefined ? (
                <Col md="9">
                  <div className="row pl-1">
                    <div className="pb-2">
                      <Button
                        color="link"
                        onClick={() => setVisiblePreviewModal(true)}
                      >
                        Chọn bài viết
                      </Button>
                    </div>
                    {posts !== null ? (
                      <>
                        <Modal
                          size="lg"
                          style={{
                            minWidth: "90vw",
                            width: "90%",
                          }}
                          fullScreen
                          isOpen={visiblePreviewModal}
                          toggle={() => setVisiblePreviewModal(false)}
                          onClosed={() => setVisiblePreviewModal(false)}
                        >
                          <ModalHeader
                            className="bg-primary"
                            toggle={() => setVisiblePreviewModal(false)}
                          >
                            Chọn bài viết
                          </ModalHeader>
                          <ModalBody style={{ backgroundColor: "#F7F7F7" }}>
                            <CSmartTable
                              noItemsLabel="Đang tải dữ liệu..."
                              draggable
                              activePage={1}
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
                                  return (
                                    <td className="py-2">{item._id + 1}</td>
                                  );
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
                                        .substring(
                                          1,
                                          JSON.stringify(item.createTime)
                                            .length - 1
                                        )}
                                    </td>
                                  );
                                },
                                status: (item) => (
                                  <td>
                                    <CBadge
                                      color={getBadge(item.status.trim())}
                                    >
                                      {item.status}
                                    </CBadge>
                                  </td>
                                ),
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <Button
                                        onClick={() =>
                                          toggleDetails(item.postId)
                                        }
                                      >
                                        Xem chi tiết
                                      </Button>
                                    </td>
                                  );
                                },
                              }}
                              // tableFilter
                              // tableProps={{
                              //   striped: true,
                              //   hover: true,
                              // }}
                            />
                          </ModalBody>
                        </Modal>
                        <Modal
                          isOpen={visibleModal}
                          toggle={() => (
                            setVisibleModal(false), setDetails(null)
                          )}
                          className=""
                          size="lg"
                          style={{ maxWidth: "80vw", width: "80%" }}
                        >
                          <ModalHeader
                            className="bg-primary"
                            toggle={() => (
                              setVisibleModal(false), setDetails(null)
                            )}
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
                                  <Col md="10">
                                    {details.category.subCategory}
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="2">
                                    <Label for="location">
                                      <b>Tác giả: </b>
                                    </Label>
                                  </Col>
                                  <Col md="10">
                                    {details.editor.accountInfo.username}
                                  </Col>
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
                                      content={editedPostDescription}
                                      allowAttributes
                                      allowElements
                                    />
                                  </Col>
                                </FormGroup>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  className="btn btn-info"
                                  onClick={() => (
                                    setSelectedPost(details.postId),
                                    setVisibleModal(false),
                                    setDetails(null),
                                    setVisiblePreviewModal(false)
                                  )}
                                >
                                  Chọn bài viết này
                                </Button>
                              </ModalFooter>
                            </>
                          ) : (
                            <Row className="d-flex justify-content-center">
                              <div
                                class="spinner-border text-primary mb-5 mt-5"
                                role="status"
                              >
                                <span class="sr-only">Loading...</span>
                              </div>
                            </Row>
                          )}
                        </Modal>
                      </>
                    ) : (
                      <Alert>Bạn không có bài viết nào mới</Alert>
                    )}
                  </div>
                </Col>
              ) : (
                <Col md="12">
                  <Label for="file">
                    <div>
                      <div className="badge badge-success">
                        Đã chọn bài viết id: {selectedPost}{" "}
                        <i
                          className="fa fa-close "
                          onClick={() => setSelectedPost()}
                        />
                      </div>
                    </div>
                  </Label>
                </Col>
              )}
            </FormGroup>
          )}
        </DescriptionContainer>
        <SubmitButtonsContainer>
          <Button className="mr-1" onClick={handleCloseModal}>
            Đóng
          </Button>
          {description.status === "Pending" &&
            (!isLoading ? (
              <Button
                className="btn btn-info"
                onClick={() => handleFinishTask(description.taskId)}
              >
                Hoàn thành
              </Button>
            ) : (
              <Button typeCSS="send" title="Hoàn thành">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Đang xử lý
              </Button>
            ))}
        </SubmitButtonsContainer>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default DetailsModal;
