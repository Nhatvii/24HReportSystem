import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../styles/featuredPosts.css";
import postApi from "../../../../api/postApi";
import { Col, Row } from "reactstrap";
import TitleBreakLine from "./TitleBreakLine";
import MostSharedNews from "./News/MostSharedNews";
import { Link } from "react-router-dom";
import OtherNews from "./News/OtherNews";
const limit = 25;

export default function ViewAllPost(props) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  const fetchPostList = async () => {
    setTitle(localStorage.getItem("title"));
    try {
      const params = {
        isViewCount: true,
        SearchContent:
          localStorage.getItem("SearchContent") !== "null"
            ? localStorage.getItem("SearchContent")
            : "",
        status:
          localStorage.getItem("status") !== "null"
            ? localStorage.getItem("status")
            : "",
        CategoryID:
          localStorage.getItem("categoryID") !== "null"
            ? localStorage.getItem("categoryID")
            : "",
      };
      const response = await postApi.getAll(params);
      setPosts(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    localStorage.setItem(
      "categoryID",
      props.history.location.state.categoryID !== undefined
        ? props.history.location.state.categoryID
        : null
    );
    localStorage.setItem(
      "SearchContent",
      props.history.location.state.SearchContent !== undefined
        ? props.history.location.state.SearchContent
        : null
    );
    localStorage.setItem(
      "status",
      props.history.location.state.status !== undefined
        ? props.history.location.state.status
        : null
    );
    localStorage.setItem(
      "title",
      props.history.location.state.title !== undefined
        ? props.history.location.state.title
        : null
    );

    fetchPostList();
  }, [props]);
  return (
    <div className="featured">
      <div
        className="row"
        style={{ marginLeft: "10rem", marginRight: "10rem" }}
      >
        <div className="col-sm-8 col-md-8 col-lg-8">
          <div className="pl-5 pr-3 pb-2">
            <div class="col-6 align-self-center">
              <h2 class="widget-title">{title}</h2>
            </div>
            <TitleBreakLine />
            {posts.length > 0 ? (
              posts.map((post) => (
                <Row>
                  <div className="col-sm-6 col-xl-6 col-md-6">
                    <a href={`/postDetail/${post.postId}`}>
                      <img
                        src={
                          post.image.includes("http")
                            ? post.image
                            : "https://kpopnews.atsit.in/vi/wp-content/uploads/2021/10/astros-moonbin-boyfriend-material-pictures.png"
                        }
                        style={{
                          width: "100%",
                          display: "inline-block",
                        }}
                        class="img-responsive"
                        height="300px"
                        className="card-img mb-2 rounded"
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
                  </div>
                  <div className="col-sm-6 col-xl-6 col-md-6">
                    <h4>{post.title}</h4>
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
                            lúc {post.createTime.substring(0, 10)}{" "}
                          </span>
                        </Col>
                        <Col xs="12" md="12" sm="12" lg="12" xl="3">
                          <span>
                            <i className="icon-like"></i>{" "}
                            <a
                              class="text-gray font-weight-bold"
                              href={`/postDetail/${post.postId}`}
                            >
                              {post.likeCount}
                            </a>{" "}
                            <i className="icon-bubble"></i>{" "}
                            <a
                              class="text-gray font-weight-bold"
                              href={`/postDetail/${post.postId}`}
                            >
                              {post.commentCount}
                            </a>{" "}
                            <i className="icon-share"></i>{" "}
                            <a
                              class="text-gray font-weight-bold"
                              href={`/postDetail/${post.postId}`}
                            >
                              {post.shareCount !== null ? post.shareCount : 0}
                            </a>{" "}
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <br />
                    <p>{post.subTitle}</p>

                    <br />
                  </div>
                </Row>
              ))
            ) : (
              <div className="ml-100 justify-content-center mt-5">
                <div className="d-flex justify-content-center">
                  <img
                    src="http://2.bp.blogspot.com/-Yhh9vCfKRmc/VqHdQ4vvLOI/AAAAAAAAEy4/GzsAl4ILgvM/s1600/c580ab_b095ac191368455486184245c68a63d1.gif"
                    width={300}
                    height={300}
                    className="rounded-circle"
                  />
                </div>
                <b className="h3 text-primary d-flex justify-content-center pb-5 pt-2">
                  Không có bài viết liên quan
                </b>
              </div>
            )}
          </div>
        </div>

        <div className="col-sm-4 col-md-4 col-lg-4 pr-5">
          <div class="row">
            <div class="col-6 align-self-center">
              <h2 class="widget-title">Có thể bạn sẽ thích</h2>
            </div>
            <div class="col-6 text-right align-self-center">
              {" "}
              <Link
                to={{
                  pathname: "/view-all",
                  state: { status: 2, title: "Có thể bạn sẽ thích" },
                }}
                className="see_all mb20"
              >
                <b>Xem tất cả</b>
              </Link>
            </div>
          </div>
          <TitleBreakLine />
          {/* Most shared here */}
          <MostSharedNews />
          {/* Tin khác */}
          <br />
          <div>
            <div class="row">
              <div class="col-6 align-self-center">
                <h2 class="widget-title">Phòng tránh lừa đảo </h2>
              </div>
              <div class="col-6 text-right align-self-center">
                {" "}
                <Link
                  to={{
                    pathname: "/view-all",
                    state: { status: 3, title: "Phòng tránh lừa đảo" },
                  }}
                  className="see_all mb20"
                >
                  <b>Xem tất cả</b>
                </Link>
              </div>
            </div>
            <TitleBreakLine />
            <OtherNews />
          </div>
          {/* **************************************  */}
        </div>
      </div>
    </div>
  );
}
