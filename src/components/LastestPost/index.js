import React, { useState } from "react";
import { Link } from "react-router-dom";
import video1 from "../../doc/img/video/video1.jpg";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from "react-modal-video";
import PopularPosts from "../PopularPosts";
import moment from "moment";

const LastestPost = ({ className, dark }) => {
  const [vModal, setvModal] = useState(false);
  // MÃ Video Youtube
  const [videoId] = useState("4Z-ayfkRiSI");
  return (
    <div className={`video_posts ${className ? className : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white">
              <h2 className="widget-title">Tin nóng hổi</h2>
            </div>
          </div>
        </div>
        <div className="space-50" />
        <div className={`viceo_posts_wrap ${dark ? "primay_bg" : ""}`}>
          <div className="row">
            <div className="col-lg-8">
              <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                <div className="post_img">
                  <div className="img_wrap">
                    <Link to="/" className="play_btn">
                      <img
                        src="https://res.klook.com/image/upload/q_85/c_fill,w_750/v1595998129/blog/nnkzuqga2usqfgdg9j9u.png"
                        alt="video1"
                      />
                    </Link>
                  </div>
                  <p onClick={() => setvModal(true)} className="youtube_middle">
                    <FontAwesome name="youtube-play" />
                  </p>
                </div>
                <div
                  className={`single_post_text padding30 ${
                    dark ? "dark-2" : "fourth_bg"
                  }`}
                >
                  <div className="meta3">
                    <Link to="#">Giải trí</Link>
                    <Link to="#">{moment().format("DD.MM.YYYY")}</Link>
                  </div>
                  <h4>
                    <Link to="#">Sài gòn có gì chơi??</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <PopularPosts />
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={vModal}
        videoId={videoId}
        onClose={() => setvModal(false)}
      />
    </div>
  );
};

export default LastestPost;
