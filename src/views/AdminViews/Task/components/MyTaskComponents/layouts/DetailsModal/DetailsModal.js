import React, { useEffect, useState } from "react";
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
import {
  CommentArea,
  PostData,
} from "../../../../../../UserViews/Post/components/styles";
import { PreviewComment } from "../../../../../Posts/components/PreviewComment";
import { PreviewDetail } from "../../../../../Posts/components/PreviewDetail";
import postApi from "../../../../../../../api/postApi";
import { CBadge, CSmartTable } from "@coreui/react-pro";
import { ImgUpload, UploadContainer } from "../../../../../Posts/CreatePost";

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
  //Function
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
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "show_details",
      label: "Options",
      _style: { width: "1%" },
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
      const params = { EditorID: JSON.parse(user_info).email, status: "" };
      const params2 = { EditorID: JSON.parse(user_info).email, status: 2 };
      const params3 = { EditorID: JSON.parse(user_info).email, status: 5 };
      const params4 = { EditorID: JSON.parse(user_info).email, status: 3 };
      const params5 = { EditorID: JSON.parse(user_info).email, status: 4 };

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
      const param = { EditorID: JSON.parse(user_info).email, Status: 1 }; //Crafted only
      const response = await postApi.getByIdAndStatus(param);
      setPosts(response);
    } catch (e) {
      alert(e.message);
    }
  }
  useEffect(() => {
    loadPosts();
  }, [loadPosts, selectedPost]);
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
  }, [props]);

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
                  <Col md="4">{reportDetails.categoryId}</Col>
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
                                  Video không còn khả dụng
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
                        <Row>
                          <Col>
                            <PostData>
                              <PreviewDetail
                                text={description.posts[0].description}
                                title={description.posts[0].title}
                              />
                            </PostData>
                          </Col>
                          <Col>
                            <CommentArea>
                              <PreviewComment />
                            </CommentArea>
                          </Col>
                        </Row>
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
              {console.log(selectedPost)}
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
                            Bản xem thử
                          </ModalHeader>
                          <ModalBody style={{ backgroundColor: "#F7F7F7" }}>
                            <CSmartTable
                              noItemsLabel="Đang tải dữ liệu..."
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
                              tableFilter
                              tableProps={{
                                striped: true,
                                hover: true,
                              }}
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
