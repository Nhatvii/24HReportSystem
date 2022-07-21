import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import postApi from "../../../../../api/postApi";
const limit = 25;

export default function TodayNews(props) {
  const [posts, setPosts] = useState([]);

  const fetchPostList = async () => {
    try {
      const params = { isRecentDate: true, Status: 3 };
      const response = await postApi.getAll(params);
      console.log(response);
      setPosts(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostList();
  }, []);
  return (
    <div className="row mb-2">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="col-sm-6 col-xl-6 ">
            <a href={`/postDetail/${post.postId}`}>
              <img
                src={
                  post.image.includes("http") ||
                  post.image.includes("data:image/jpeg;base64,")
                    ? post.image
                    : "https://kpopnews.atsit.in/vi/wp-content/uploads/2021/10/astros-moonbin-boyfriend-material-pictures.png"
                }
                style={{
                  width: "100%",
                  display: "inline-block",
                }}
                class="img-responsive"
                height=" 300rem"
                className="card-img mb-2"
              />
            </a>
            <a
              class="p-1 badge badge-primary rounded-0"
              href={`/postDetail/${post.postId}`}
              style={{
                background: "linear-gradient(to right,#56CCF2,#2F80ED)",
                color: "white",
              }}
            >
              {post.category.type}
            </a>
            <h3>{post.title}</h3>
            <div class="news-meta">
              <Row justifyContent="space-between">
                <Col xs="12" md="12" sm="12" lg="12" xl="9">
                  <span class="news-author">
                    viết bởi{" "}
                    <a
                      class="text-gray font-weight-bold"
                      href={`/postDetail/${post.postId}`}
                    >
                      {post.editor.accountInfo.username}{" "}
                    </a>
                  </span>
                  <span class="news-date">
                    lúc {post.createTime.substring(0, 10)}
                    {"  "}
                  </span>
                </Col>
                <Col xs="12" md="12" sm="12" lg="12" xl="3">
                  <span>
                    <i className="icon-like"></i>
                    {"  "}
                    <a
                      class="text-gray font-weight-bold"
                      href={`/postDetail/${post.postId}`}
                    >
                      {post.likeCount}
                    </a>{" "}
                    <i className="icon-bubble"></i>
                    {"  "}
                    <a
                      class="text-gray font-weight-bold"
                      href={`/postDetail/${post.postId}`}
                    >
                      {post.commentCount}
                    </a>
                    {"  "}
                    <i className="icon-share"></i>
                    {"  "}
                    <a
                      class="text-gray font-weight-bold"
                      href={`/postDetail/${post.postId}`}
                    >
                      {post.shareCount !== null ? post.shareCount : 0}
                    </a>
                  </span>
                </Col>
              </Row>
            </div>
            <br />
            <p>
              {post.subTitle.length > limit * 5
                ? post.subTitle.substring(0, limit * 5 - 1) + "..."
                : post.subTitle}
            </p>

            <br />
          </div>
        ))
      ) : (
        <div className="col ml-100">
          <Row className="d-flex justify-content-center mt-5">
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
    </div>
  );
}
