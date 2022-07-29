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
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
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
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const toggle = () => {
    setOpenDeleteModal(!openDeleteModal);
    setIsLoading(false);
  };
  const toggle2 = () => {
    setOpenUpdateModal(!openUpdateModal);
    setIsLoading(false);
  };
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
      response.map((comment) =>
        randomColor(
          comment.user.accountInfo.username !== null
            ? comment.user.accountInfo.username
            : comment.user.email
        )
      );
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
        userId: JSON.parse(user_info).email,
        postId: props.postId,
        commentTitle: commentTitle,
      };
      const response = await commentApi.sendComment(params);
      if (JSON.stringify(response).includes("error")) {
        setIsLoading(false);
        fetchComments();
        setCommentTitle("");
        setWarningMessage(response.error.message);
      }
      if (response.statusCode === 200) {
        setIsLoading(false);
        fetchComments();
        setCommentTitle("");
        setWarningMessage("");
      }
    } catch (e) {
      toast.error(e.message);
    }
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
        setOpenUpdateModal(false);
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
    console.log(JSON.parse(user_info));
    JSON.parse(user_info) !== null &&
      (JSON.parse(user_info).accountInfo.username !== null
        ? randomColor(JSON.parse(user_info).accountInfo.username)
        : randomColor(JSON.parse(user_info).email));
  }, []);

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
                JSON.parse(user_info).accountInfo.username !== null
                  ? JSON.parse(user_info).accountInfo.username.substring(
                      JSON.parse(user_info).accountInfo.username.lastIndexOf(
                        " "
                      ),
                      JSON.parse(user_info).accountInfo.username.lastIndexOf(
                        " "
                      ) + 2
                    )
                  : JSON.parse(user_info).email.substring(
                      JSON.parse(user_info).email.lastIndexOf(" "),
                      JSON.parse(user_info).email.lastIndexOf(" ") + 2
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
                    (JSON.parse(user_info).accountInfo.username !== null
                      ? JSON.parse(user_info).accountInfo.username
                      : JSON.parse(user_info).email)
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
                  comment.user.accountInfo.username !== null
                    ? comment.user.accountInfo.username.substring(
                        comment.user.accountInfo.username.lastIndexOf(" "),
                        comment.user.accountInfo.username.lastIndexOf(" ") + 2
                      )
                    : comment.user.email.substring(
                        comment.user.email.lastIndexOf(" "),
                        comment.user.email.lastIndexOf(" ") + 2
                      )
                }
                className=""
                size={40}
                radius={100}
                color="#fff"
                backgroundColor={
                  avatarColor.filter(
                    (e) =>
                      e.name ===
                      (comment.user.accountInfo.username !== null
                        ? comment.user.accountInfo.username
                        : comment.user.email)
                  ).color
                }
              />
              <div className="ml-2">
                <div className="comment-actions">
                  <div className="user-name">
                    {comment.user.accountInfo.username !== null
                      ? comment.user.accountInfo.username
                      : comment.user.email}
                  </div>{" "}
                  <div className="date">
                    - {moment(comment.createTime).locale("vi").fromNow()}
                  </div>
                  <div
                    className="comment"
                    style={{ overflowWrap: "break-word", width: "25rem" }}
                  >
                    {comment.commentTitle}
                  </div>
                  {JSON.parse(user_info) !== null ? (
                    comment.user.email === JSON.parse(user_info).email ? (
                      <div className="settings">
                        <div
                          className="delete"
                          data-toggle="modal"
                          data-target="#confirmDelete"
                          onClick={() => (
                            setSelectedId(comment.commentId),
                            setOpenDeleteModal(true)
                          )}
                        >
                          Xóa
                        </div>
                        <div
                          className="modify"
                          data-toggle="modal"
                          data-target="#updateComment"
                          onClick={() => (
                            setOpenUpdateModal(true),
                            setSelectedId(comment.commentId)
                          )}
                        >
                          Chỉnh sửa
                        </div>
                        {/* Popup model update*/}
                        <Modal
                          isOpen={openUpdateModal}
                          toggle={() => toggle2()}
                          className=""
                          size="lg"
                          style={{
                            maxWidth: "400px",
                            width: "40%",
                            paddingTop: "15rem",
                          }}
                        >
                          <ModalHeader
                            className="bg-primary"
                            toggle={() => toggle2()}
                          >
                            Sửa bình luận
                          </ModalHeader>
                          <ModalBody>
                            <CFormTextarea
                              rows="3"
                              className="input-lg w-200 mb-1"
                              type="text"
                              id="update"
                              value={updatedComment}
                              onChange={handleUpdateChange}
                              placeholder="Viết bình luận..."
                            />
                          </ModalBody>
                          <ModalFooter>
                            {isLoading ? (
                              <Button color="primary">
                                <span
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>{" "}
                                Đang sửa
                              </Button>
                            ) : (
                              <Button
                                color="primary"
                                onClick={() => updateComment(selectedId)}
                              >
                                Sửa
                              </Button>
                            )}
                            <Button color="secondary" onClick={() => toggle2()}>
                              Hủy
                            </Button>
                          </ModalFooter>
                        </Modal>
                        <div
                          class="modal fade"
                          id="updateComment"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="updateCommentTitle"
                          aria-hidden="true"
                          data-backdrop="false"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  class="modal-title"
                                  id="exampleModalLongTitle"
                                >
                                  Sửa bình luận
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <CFormTextarea
                                  rows="3"
                                  className="input-lg w-200 mb-1"
                                  type="text"
                                  id="update"
                                  value={updatedComment}
                                  onChange={handleUpdateChange}
                                  placeholder="Viết bình luận..."
                                />
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Đóng
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-dismiss="modal"
                                  onClick={() => updateComment(selectedId)}
                                >
                                  Sửa
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Popup model delete*/}
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
                            <Button color="secondary" onClick={() => toggle()}>
                              Hủy
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
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
