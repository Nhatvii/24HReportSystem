import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from "react-modal-video";
import PopularPosts from "../PopularPosts";
import moment from "moment";
import postApi from "../../api/postApi";

const LastestPost = ({ className, dark, data }) => {
  const [vModal, setvModal] = useState(false);
  // MÃ Video Youtube
  const [video, setVideo] = useState(null);
  const [postList, setPostList] = useState([]);
  const loadPostList = async () => {
    try {
      const params = { Status: 3 };
      const response = await postApi.getByStatus(params);
      setPostList(response.filter((e) => e.video !== "null"));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    loadPostList();
  }, []);
  const handleClick = (videoUrl) => {
    setvModal(true);
    setVideo(videoUrl);
    console.log(videoUrl);
  };
  return (
    <div className={`video_posts ${className ? className : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white">
              <h2 className="widget-title" id="most_view">
                Tin nóng hổi
              </h2>
            </div>
          </div>
        </div>
        <div className="space-50" />
        <div className={`viceo_posts_wrap ${dark ? "primay_bg" : ""}`}>
          <div className="row">
            <div className="col-lg-8">
              {postList.length > 0 &&
                postList.slice(0, 1).map((post) => (
                  <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                    <div className="post_img">
                      <div className="img_wrap">
                        <Link to="/" className="play_btn">
                          <img
                            src={post.image}
                            alt="video1"
                            width={800}
                            height={400}
                          />
                        </Link>
                      </div>
                      <p
                        onClick={() => handleClick(post.video)}
                        className="youtube_middle"
                      >
                        <FontAwesome name="youtube-play" />
                      </p>
                    </div>
                    <div
                      className={`single_post_text padding30 ${
                        dark ? "dark-2" : "fourth_bg"
                      }`}
                    >
                      <div className="meta3">
                        <Link
                          to={{
                            pathname: "/search",
                            state: {
                              title: "Danh mục: " + post.category.subCategory,
                              CategoryID: post.category.categoryId,
                            },
                          }}
                        >
                          {post.category.subCategory}
                        </Link>
                        <Link to="#">
                          {moment(post.publicTime).format("DD.MM.YYYY")}
                        </Link>
                      </div>
                      <h4>{post.title}</h4>
                      <p>{post.subTitle}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-4">
              <PopularPosts data={data} />
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="custom"
        url={video}
        isOpen={vModal}
        onClose={() => setvModal(false)}
      />
    </div>
  );
};

export default LastestPost;
