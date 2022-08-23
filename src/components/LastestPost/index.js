import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from "react-modal-video";
import PopularPosts from "../PopularPosts";
import moment from "moment";
import Slider from "react-slick";

const LastestPost = ({ className, dark, data }) => {
  const [vModal, setvModal] = useState(false);
  // MÃ Video Youtube
  const [videoId] = useState("3cpeBj-biwg");
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
              <Slider
                asNavFor={null}
                arrows={false}
                fade={true}
                autoplay
                autoplaySpeed={5000}
              >
                {JSON.parse(localStorage.getItem("carousel-post")) &&
                JSON.parse(localStorage.getItem("carousel-post")).length > 0
                  ? JSON.parse(localStorage.getItem("carousel-post"))
                      .sort((a, b) => a.publicTime - b.publicTime)
                      .map((item, i) => (
                        <div key={i} className="single_post post_type6 xs-mb0">
                          <div className="post_img gradient1">
                            <img
                              src={
                                item.image.includes("http")
                                  ? item.image
                                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"
                              }
                              alt="image"
                              style={{
                                width: "100%",
                                height: "29.25rem",
                                display: "inline-block",
                              }}
                              class="img-responsive"
                            />
                          </div>
                          <div className="single_post_text">
                            <div className="meta meta_separator1">
                              <Link
                                to={{
                                  pathname: "/search",
                                  state: {
                                    title:
                                      "Danh mục: " + item.category.subCategory,
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
                      ))
                  : null}
              </Slider>
            </div>
            <div className="col-lg-4">
              <PopularPosts data={data} />
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
