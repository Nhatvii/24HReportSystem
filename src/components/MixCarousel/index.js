import React, { useState } from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import Swiper from "react-id-swiper";
import ModalVideo from "react-modal-video";
import moment from "moment";

const MixCarousel = ({ className, dark, data }) => {
  const [swiper, setSwiper] = useState(null);
  const [vModal, setvModal] = useState(false);
  const [videoId] = useState("0r6C3z3TEKw");

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  const params = {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  };
  return (
    <div className={`mix_area ${className ? className : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={`mix_carousel ${dark ? "primay_bg" : ""}`}>
              {/*CAROUSEL START*/}
              <div className="single_mix_carousel nav_style3">
                <Swiper
                  getSwiper={setSwiper}
                  {...params}
                  observer
                  observeParents
                >
                  {data.map((item, i) => (
                    <div key={i} className="single_post post_type6 post_type9">
                      <div className="post_img gradient1">
                        <div className="img_wrap">
                          <Link className="play_btn" to="/">
                            <img
                              src={
                                item.image.includes("http")
                                  ? item.image
                                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"
                              }
                              alt="news"
                              height={400}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="single_post_text">
                        <div className="meta">
                          <Link
                            to={{
                              pathname: "/search",
                              state: {
                                title: "Danh mục: " + item.category.type,
                                CategoryID: item.category.categoryId,
                              },
                            }}
                          >
                            {item.category.type}
                          </Link>
                          <Link to={`/post-detail/${item.postId}`}>
                            {moment(item.publicTime).format("DD.MM.YYYY")}
                          </Link>
                        </div>
                        <h6>
                          <Link to={`/post-detail/${item.postId}`}>
                            {item.title.substring(0, 70) + "..."}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  ))}
                </Swiper>

                <div className="owl-nav">
                  <div onClick={goPrev} className="owl-prev">
                    <FontAwesome name="angle-left" />
                  </div>
                  <div onClick={goNext} className="owl-next">
                    <FontAwesome name="angle-right" />
                  </div>
                </div>
              </div>
            </div>
            {/*CAROUSEL END*/}
          </div>
        </div>
      </div>
      <div className="space-30" />
      <ModalVideo
        channel="youtube"
        isOpen={vModal}
        videoId={videoId}
        onClose={() => setvModal(false)}
      />
    </div>
  );
};

export default MixCarousel;
