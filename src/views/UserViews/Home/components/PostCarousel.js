import React, { useEffect, useState } from "react";
import { A11y, Navigation, Pagination } from "swiper";
import { Col, Row } from "reactstrap";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
import postApi from "../../../../api/postApi";
import { Link } from "react-router-dom";

const limit = 50;
export default function PostCarousel() {
  SwiperCore.use([Autoplay]);
  const [posts, setPosts] = useState([]);
  const fetchPostList = async () => {
    try {
      const params = { isViewCount: true, Status: 3 };
      const response = await postApi.getAll(params);
      localStorage.setItem("carousel-post", JSON.stringify(response));
      setPosts(JSON.parse(localStorage.getItem("carousel-post")));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPostList();
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={1000}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
    >
      {JSON.parse(localStorage.getItem("carousel-post")) &&
        (JSON.parse(localStorage.getItem("carousel-post")).length > 0 ? (
          JSON.parse(localStorage.getItem("carousel-post")).map((post) => (
            <SwiperSlide>
              <div class="card border-0 rounded-0 text-light overflow zoom">
                <div class="position-relative">
                  <div class="position-absolute pt-2 pl-2 w-10  ">
                    <div
                      style={{
                        marginLeft: "auto",
                        background: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <i className="icon-eye"> {post.viewCount} lượt xem</i>
                    </div>
                  </div>
                  <div class="ratio_left-cover-1 image-wrapper ">
                    <a href={`/postDetail/${post.postId}`}>
                      <img
                        style={{
                          width: "100%",
                          display: "inline-block",
                        }}
                        class="img-responsive"
                        height="630"
                        src={
                          post.image.includes("http") ||
                          post.image.includes("data:image/jpeg;base64,")
                            ? post.image
                            : "https://kpopnews.atsit.in/vi/wp-content/uploads/2021/10/astros-moonbin-boyfriend-material-pictures.png"
                        }
                        alt="Bootstrap news template"
                      />
                    </a>
                  </div>
                  <div
                    class="position-absolute p-2 p-lg-3 b-0 w-100  "
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Link to={`/postDetail/${post.postId}`}>
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
                      <h3 class=" h3 text-white my-1">
                        {post.title.length > limit * 3
                          ? post.title.substring(0, limit * 3 - 1) + "..."
                          : post.title}
                      </h3>
                    </Link>
                    <h6 class="h6 text-white my-1">
                      {post.subTitle.length > limit * 6
                        ? post.subTitle.substring(0, limit * 6 - 1) + "..."
                        : post.subTitle}
                    </h6>
                    <div class="news-meta space-between ">
                      <Row>
                        <Col xs="12" sm="9" lg="9" xl="9" md="3">
                          <span class="news-author">
                            viết bởi{" "}
                            <a class="text-white font-weight-bold" href="#">
                              {post.editor.accountInfo.username}{" "}
                            </a>
                          </span>
                          <span class="news-date">
                            lúc {post.createTime.substring(0, 10)}
                          </span>
                        </Col>
                        <Col
                          xs="12"
                          sm="2"
                          lg="2"
                          xl="2"
                          md="2"
                          className="text-right"
                        >
                          <span>
                            <i className="icon-like"></i>{" "}
                            <a
                              class="text-white font-weight-bold"
                              href={`/postDetail/${post.postId}`}
                            >
                              {post.likeCount}
                            </a>{" "}
                            <i className="icon-bubble"></i>{" "}
                            <a
                              class="text-white font-weight-bold"
                              href={`/postDetail/${post.postId}`}
                            >
                              {post.commentCount}
                            </a>{" "}
                            <i className="icon-share"></i>
                            <a
                              class="text-white font-weight-bold"
                              href={`/postDetail/${post.postId}`}
                            >
                              {" "}
                              {post.shareCount !== null ? post.shareCount : 0}
                            </a>
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <Row className="d-flex justify-content-center mt-5">
            <div class="spinner-border text-primary" role="status" />
          </Row>
        ))}
    </Swiper>
  );
}
