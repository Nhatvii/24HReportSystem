import { CFormTextarea } from "@coreui/react-pro";
import React, { useEffect, useState } from "react";
import commentApi from "../../../../api/commentApi";
import { CommentsHeader } from "./CommentsHeader";
import { LikeShareSection } from "./LikeShareSection";
import moment from "moment";
import "moment/locale/vi";
import {
  AddComment,
  CommentScrollbar,
  CommentSection,
  InputsContainer,
  PseudoText,
} from "./styles";
import { toast } from "react-toastify";
import postDetailApi from "../../../../api/postDetailApi";
import LetteredAvatar from "react-lettered-avatar";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
const MIN_LENGTH_DESCRIPTION = 10;
const MAX_LENGTH_DESCRIPTION = 100;

export const Comments = (props) => {
  const user_info = localStorage.getItem("user_info");
  const [comments, setComments] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [_numberOfComments, _setNumberOfComments] = useState(0);
  const [_numberOfShares, _setNumberOfShares] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetail] = useState([]);
  const [avatarColor, setAvatarColor] = useState([]);
  //
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggle = () => {
    setOpenDeleteModal(!openDeleteModal);
    setIsLoading(false);
  };
  // const toggle2 = () => {
  //   setIsUpdating(!isUpdating);
  //   setIsLoading(false);
  // };
  const randomColor = (name) => {
    let filteredColor = avatarColor.filter((e) => e.name !== name);
    setAvatarColor([
      ...filteredColor,
      {
        name: name,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    ]);
  };
  const fetchPostDetail = async () => {
    try {
      const response = await postDetailApi.getAll(props.postId);
      setPostDetail(response);
      _setNumberOfShares(response.shareCount);
    } catch (err) {
      console.log("Error", err);
    }
  };
  //Tải comment
  const fetchComments = async () => {
    try {
      const response = await commentApi.getByPostId(props.postId);
      setComments(response);
      response.map((comment) => randomColor(comment.user.accountInfo.fullname));
      _setNumberOfComments(response.length); //
    } catch (err) {
      console.log("Error", err);
    }
  };
  //Viết comment
  const addComments = async () => {
    try {
      setIsLoading(true);
      const params = {
        userId: JSON.parse(user_info).accountId,
        postId: props.postId,
        commentTitle: commentTitle,
      };
      const response = await commentApi.sendComment(params);
      if (JSON.stringify(response).includes("error")) {
        setIsLoading(false);
        fetchComments();
        toast.error(response.error.message);
      }
      if (response.statusCode === 200) {
        setIsLoading(false);
        fetchComments();
        setCommentTitle("");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleDeleteComment = (commentId) => {
    setSelectedId(commentId);
    setOpenDeleteModal(true);
  };
  const handleUpdateComment = (commentId, commentTitle) => {
    setIsUpdating(true);
    setSelectedId(commentId);
    setUpdatedComment(commentTitle);
  };
  //xóa comment
  const deleteComment = async (commentId) => {
    setIsLoading(true);
    try {
      const params = { commentId: commentId };
      const response = await commentApi.delete(params);
      if (response.statusCode === 200) {
        fetchComments();
        setSelectedId("");
        setOpenDeleteModal(false);
        setIsLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  //Sửa comment
  const updateComment = async (commentId) => {
    setIsLoading(true);
    try {
      const params = {
        commentId: commentId,
        commentTitle: updatedComment,
        status: 1,
      };
      const response = await commentApi.update(params);
      if (response.statusCode === 200) {
        fetchComments();
        setSelectedId("");
        setIsUpdating(false);
        setIsLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleChange = (e) => {
    setCommentTitle(e.target.value);
  };
  const handleUpdateChange = (e) => {
    setUpdatedComment(e.target.value);
  };
  const handleCommentLenght = () => {
    setWarningMessage("Độ dài bình luận ít nhất phải lớn hơn 16 kí tự.");
  };
  useEffect(() => {
    if (props.postId) fetchPostDetail();
    if (props.postId) fetchComments();
    JSON.parse(user_info) !== null &&
      (JSON.parse(user_info).accountInfo.fullname !== null
        ? randomColor(JSON.parse(user_info).accountInfo.fullname)
        : randomColor(JSON.parse(user_info).accountId));
  }, []);
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 5000);
  }, []);
  useEffect(() => {
    if (props.postId) fetchComments();
  }, [temp]);

  return (
    <div>
      <LikeShareSection
        postId={props.postId}
        title={postDetail.title}
        numberOfComments={_numberOfComments}
        numberOfShares={_numberOfShares}
      />
      <CommentsHeader />
      {JSON.parse(user_info) !== null ? (
        <>
          <AddComment>
            <LetteredAvatar
              name={
                JSON.parse(user_info).accountInfo.fullname !== null
                  ? JSON.parse(user_info).accountInfo.fullname.substring(
                      JSON.parse(user_info).accountInfo.fullname.lastIndexOf(
                        " "
                      ),
                      JSON.parse(user_info).accountInfo.fullname.lastIndexOf(
                        " "
                      ) + 2
                    )
                  : JSON.parse(user_info).accountInfo.fullname.substring(
                      JSON.parse(user_info).accountInfo.fullname.lastIndexOf(
                        " "
                      ),
                      JSON.parse(user_info).accountInfo.fullname.lastIndexOf(
                        " "
                      ) + 2
                    )
              }
              className=""
              size={25}
              radius={100}
              color="#fff"
              backgroundColor={
                avatarColor.filter(
                  (e) =>
                    e.name ===
                    (JSON.parse(user_info).accountInfo.fullname !== null
                      ? JSON.parse(user_info).accountInfo.fullname
                      : JSON.parse(user_info).accountId)
                ).color
              }
            />
            <InputsContainer>
              <CFormTextarea
                autoFocus
                rows="2"
                className="input-lg w-200 mb-1 pl-2 ml-2"
                type="text"
                id="comment"
                value={commentTitle}
                onChange={handleChange}
                placeholder="Viết bình luận..."
                minLength={MIN_LENGTH_DESCRIPTION}
                maxLength={MAX_LENGTH_DESCRIPTION}
              />
              <PseudoText>
                {commentTitle.length}/{MAX_LENGTH_DESCRIPTION}
              </PseudoText>
            </InputsContainer>
          </AddComment>
          <p className="text-warning" style={{ marginLeft: "5rem" }}>
            {warningMessage}
          </p>
          {isLoading ? (
            <Button
              style={{
                background: "linear-gradient(to right,#56CCF2,#2F80ED)",
                color: "white",
                float: "right",
                paddingRight: "1rem",
              }}
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Đang gửi...
            </Button>
          ) : (
            <Button
              onClick={() =>
                commentTitle.length <= 16
                  ? handleCommentLenght()
                  : addComments()
              }
              style={{
                background: "linear-gradient(to right,#56CCF2,#2F80ED)",
                color: "white",
                float: "right",
                paddingRight: "1rem",
              }}
            >
              Gửi
            </Button>
          )}
          <br />
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <img
              alt="art"
              src="https://static.vecteezy.com/system/resources/previews/004/968/489/non_2x/you-are-not-logged-in-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
              width={100}
              height={100}
            />
          </div>
          <b className="d-flex justify-content-center">Bạn chưa đăng nhập</b>
          <Button
            block
            style={{
              background: "linear-gradient(to right,#56CCF2,#2F80ED)",
              color: "white",
              marginBottom: "0.5rem",
            }}
            onClick={() => (window.location.href = "/login")}
          >
            Đăng nhập ngay
          </Button>
        </>
      )}
      <h5>Bình luận</h5>
      <CommentScrollbar>
        {comments.length === 0 ? (
          <>
            <div className="d-flex justify-content-center">
              <img
                alt="art"
                src="https://cdn.dribbble.com/users/1003944/screenshots/10032634/media/a3165ce3eed01d0913652902582fe39f.gif"
                width={100}
                height={100}
              />
            </div>
            <b className="d-flex justify-content-center">
              Hãy là người đầu tiên bình luận
            </b>
          </>
        ) : (
          comments.map((comment) => (
            // comment.isDelete ===false
            // &&
            <CommentSection>
              <LetteredAvatar
                name={
                  comment.user.accountInfo.fullname !== null
                    ? comment.user.accountInfo.fullname.substring(
                        comment.user.accountInfo.fullname.lastIndexOf(" "),
                        comment.user.accountInfo.fullname.lastIndexOf(" ") + 2
                      )
                    : comment.user.accountId.substring(
                        comment.user.accountId.lastIndexOf(" "),
                        comment.user.accountId.lastIndexOf(" ") + 2
                      )
                }
                className=""
                size={40}
                radius={50}
                color="#fff"
                backgroundColor={
                  avatarColor.filter(
                    (e) =>
                      e.name ===
                      (comment.user.accountInfo.fullname !== null
                        ? comment.user.accountInfo.fullname
                        : comment.user.accountId)
                  ).color
                }
              />
              <div className="ml-2">
                <div className="comment-actions">
                  <div className="user-name">
                    {comment.user.accountInfo.fullname !== null
                      ? comment.user.accountInfo.fullname
                      : comment.user.accountId}
                  </div>{" "}
                  <div className="date">
                    - {moment(comment.createTime).locale("vi").fromNow()}
                  </div>
                  {isUpdating && comment.commentId === selectedId ? (
                    <Input
                      type="text"
                      name="comment"
                      value={updatedComment}
                      onChange={(e) => handleUpdateChange(e)}
                    />
                  ) : (
                    <div
                      className="comment"
                      style={{ overflowWrap: "break-word", width: "25rem" }}
                    >
                      {comment.commentTitle}
                    </div>
                  )}
                  {JSON.parse(user_info) !== null ? (
                    comment.user.accountId ===
                    JSON.parse(user_info).accountId ? (
                      !(isUpdating && comment.commentId === selectedId) ? (
                        <div className="settings">
                          <div
                            className="delete"
                            data-toggle="modal"
                            data-target="#confirmDelete"
                            onClick={() =>
                              handleDeleteComment(comment.commentId)
                            }
                          >
                            Xóa
                          </div>
                          <div
                            className="modify"
                            data-toggle="modal"
                            data-target="#updateComment"
                            onClick={() =>
                              handleUpdateComment(
                                comment.commentId,
                                comment.commentTitle
                              )
                            }
                          >
                            Chỉnh sửa
                          </div>
                          {/* Popup modal delete*/}
                          <Modal
                            isOpen={openDeleteModal}
                            toggle={() => toggle()}
                            className=""
                            size="lg"
                            style={{
                              maxWidth: "400px",
                              width: "40%",
                              paddingTop: "15rem",
                            }}
                          >
                            <ModalHeader
                              className="bg-danger"
                              toggle={() => toggle()}
                            >
                              Bạn chắc không?
                            </ModalHeader>
                            <ModalBody>
                              Bạn chắc chắn muốn xóa bình luận của mình?
                            </ModalBody>
                            <ModalFooter>
                              {isLoading ? (
                                <Button color="primary">
                                  <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>{" "}
                                  Đang Xóa
                                </Button>
                              ) : (
                                <Button
                                  color="primary"
                                  onClick={() => deleteComment(selectedId)}
                                >
                                  Xóa
                                </Button>
                              )}
                              <Button
                                color="secondary"
                                onClick={() => toggle()}
                              >
                                Hủy
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </div>
                      ) : (
                        <>
                          <div className="settings">
                            <div
                              className="delete"
                              onClick={() => setIsUpdating(false)}
                            >
                              Hủy
                            </div>
                            <div
                              className="modify"
                              onClick={() => updateComment(selectedId)}
                            >
                              Chỉnh sửa
                            </div>
                          </div>
                        </>
                      )
                    ) : (
                      <div className="settings"></div>
                    )
                  ) : (
                    <div className="settings"></div>
                  )}
                </div>
              </div>
            </CommentSection>
          ))
        )}
      </CommentScrollbar>
    </div>
  );
};
