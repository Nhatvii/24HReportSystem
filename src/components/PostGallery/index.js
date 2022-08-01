import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WidgetTab from "../WidgetTab";
import "../../../node_modules/slick-carousel/slick/slick.css";
import ModalVideo from "react-modal-video";

import "./style.scss";
import Slider from "react-slick";
import postApi from "../../api/postApi";
import moment from "moment";
// Thumbnail nhỏ

const PostGallery = (props) => {
  const [nav2, setNav2] = useState(null);
  const [vModal, setVModal] = useState(false);
  const [videoId, setVideoId] = useState("0r6C3z3TEKw");
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    loadPostList();
  }, []);

  const loadPostList = async () => {
    try {
      const params = { Status: 3, isRecentDate: true };
      const response = await postApi.getByStatusAndRecent(params);
      localStorage.setItem(
        "carousel-post",
        JSON.stringify(response.slice(0, 4))
      );
      setPostList(JSON.parse(localStorage.getItem("carousel-post")));
    } catch (err) {
      console.log(err.message);
    }
  };
  const { className } = props;
  return (
    <div className={`post_gallary_area mb20 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-xl-8">
                <div className="slider_demo2">
                  <Slider
                    asNavFor={nav2}
                    arrows={false}
                    fade={true}
                    autoplay
                    autoplaySpeed={5000}
                  >
                    {JSON.parse(localStorage.getItem("carousel-post")) &&
                    JSON.parse(localStorage.getItem("carousel-post")).length > 0
                      ? JSON.parse(localStorage.getItem("carousel-post")).map(
                          (item, i) => (
                            <div
                              key={i}
                              className="single_post post_type6 xs-mb0"
                            >
                              <div className="post_img gradient1">
                                <img
                                  src={item.image}
                                  alt="image"
                                  style={{
                                    width: "100%",
                                    height: "29.25rem",
                                    display: "inline-block",
                                  }}
                                  class="img-responsive"
                                />
                                {/* <span
                              onClick={() => this.modalHandler(true)}
                              className="tranding"
                            >
                              <FontAwesome name="play" />
                            </span> */}
                              </div>
                              <div className="single_post_text">
                                <div className="meta meta_separator1">
                                  <Link
                                    to={{
                                      pathname: "/search",
                                      state: {
                                        title:
                                          "Danh mục: " +
                                          item.category.subCategory,
                                        CategoryID: item.category.categoryId,
                                      },
                                    }}
                                  >
                                    {item.category.subCategory}
                                  </Link>
                                  <Link to={`/post-detail/${item.postId}`}>
                                    {moment(item.publicTime).format(
                                      "dddd, Do MM YYYY"
                                    )}
                                  </Link>
                                </div>
                                <h4>
                                  <Link
                                    className="play_btn"
                                    to={`/post-detail/${item.postId}`}
                                  >
                                    {item.title}
                                  </Link>
                                </h4>
                                <div className="space-10" />
                                <p className="post-p">{item.subTitle}</p>
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </Slider>
                </div>
              </div>
              <div className="col-xl-4">
                <WidgetTab dark={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={vModal}
        videoId={videoId}
        onClose={() => this.modalHandler(false)}
      />
    </div>
  );
};

export default PostGallery;
