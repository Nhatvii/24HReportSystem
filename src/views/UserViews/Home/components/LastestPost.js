import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
// import Swiper core and required modules

import postApi from "../../../../api/postApi";
import { Link } from "react-router-dom";

const limit = 45;
export default function LastestPost() {
  const [posts, setPosts] = useState([]);
  const fetchPostList = async () => {
    try {
      const params = { isRecentDate: true, Status: 3 };
      const response = await postApi.getAll(params);
      localStorage.setItem("latest-post", JSON.stringify(response));
      setPosts(JSON.parse(localStorage.getItem("latest-post")));
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    fetchPostList();
  }, []);
  return (
    <>
      {JSON.parse(localStorage.getItem("latest-post")) &&
        (JSON.parse(localStorage.getItem("latest-post")).length > 0 ? (
          JSON.parse(localStorage.getItem("latest-post")).map((post) => (
            <>
              <div class="col-12 pb-1 pl-1 pr-1 pt-0 rounded bg-transparent">
                <div class="card border-0 rounded-0 text-white overflow zoom">
                  <div class="position-relative ">
                    <div class="ratio_right-cover-2 image-wrapper ">
                      <Link to={`/postDetail/${post.postId}`}>
                        <img
                          style={{
                            width: "100%",
                            display: "inline-block",
                            borderRadius: "5px",
                          }}
                          class="img-responsive"
                          height=" 180rem"
                          src={
                            post.image.includes("http") ||
                            post.image.includes("data:image/jpeg;base64,")
                              ? post.image
                              : "https://kpopnews.atsit.in/vi/wp-content/uploads/2021/10/astros-moonbin-boyfriend-material-pictures.png"
                          }
                          alt="image"
                        />
                      </Link>
                    </div>
                    <div
                      class="position-absolute p-1 p-lg-2 b-0 w-100  "
                      style={{
                        background: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <a
                        class="p-1 badge rounded-0"
                        style={{
                          background:
                            "linear-gradient(to right,#56CCF2,#2F80ED)",
                          color: "white",
                        }}
                        href="#"
                      >
                        {post.category.type}
                      </a>

                      <Link to={`/postDetail/${post.postId}`}>
                        <p class="text-white my-1">
                          {post.length > limit
                            ? post.title.substring(0, limit - 1) + "..."
                            : post.title}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <Row className="d-flex justify-content-center">
            <div class="spinner-border text-primary mt-5 mt-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </Row>
        ))}
    </>
  );
}
