import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import postDetailApi from "../../../../api/postDetailApi";
import { Markup } from "interweave";
export function PostDataDetail(props) {
  const [postDetail, setPostDetail] = useState([]);
  const [description, setDescription] = useState([]);
  const fetchPostDetail = async () => {
    try {
      await postDetailApi.getAll(props.postId).then((data) => {
        const editedDescription = JSON.stringify(data.description)
          .replace(
            "<img",
            '<img style="width:55rem;height:30rem;margin-left: auto; margin-right: auto;display:block"'
          )
          .replace(
            "<iframe",
            '<iframe style="width:55rem;height:30rem;margin-left: auto; margin-right: auto"'
          )
          .replace(/\\n/g, "<br/>")
          .replace(/\\/g, "");

        setDescription(
          "<div>" +
            editedDescription.substring(1, editedDescription.length - 1) +
            "</div>"
        );
        setPostDetail(data);
      });
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    fetchPostDetail();
  }, []);
  return (
    <>
      {postDetail.postId != null ? (
        <div>
          <h3 className="h3">{postDetail.title}</h3>
          <h5 className="h5 text-muted">
            viết bởi <b>{postDetail.editor.accountInfo.username}</b> lúc{" "}
            {postDetail.publicTime}
          </h5>
          <div>
            <div style={{ whiteSpace: "pre-wrap" }}>
              <Markup content={description} />
            </div>
          </div>
        </div>
      ) : (
        <div className="col ml-100">
          <Row className="d-flex justify-content-center">
            <span className="h5 text-primary">Không có dữ liệu</span>
            <div
              class="spinner-grow spinner-grow-sm text-primary ml-1"
              role="status"
            />
            <div
              class="spinner-grow spinner-grow-sm text-primary ml-1"
              role="status"
            />
            <div
              class="spinner-grow spinner-grow-sm text-primary ml-1"
              role="status"
            />
          </Row>
        </div>
      )}
    </>
  );
}
