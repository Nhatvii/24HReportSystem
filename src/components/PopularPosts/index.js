import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from "react-id-swiper";

import "./style.scss";
import { Button } from "react-bootstrap";

const PopularPosts = ({ data }) => {
  const [swiper, setSwiper] = useState(null);

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
    loops: true,
    slidesPerView: 1,
    slidesPerColumn: 4,
  };
  return (
    <div className="popular_carousel_area mb30 md-mt-30">
      <h2 className="widget-title">Tin nóng</h2>
      <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Swiper getSwiper={setSwiper} {...params} observer observeParents>
          {data
            .sort((a, b) => a.publicTime - b.publicTime)
            .map((item, i) => (
              <div key={i} className="single_post type10 widgets_small mb15">
                <div className="post_img">
                  <div className="img_wrap">
                    <Link>
                      <img
                        src={
                          item.image.includes("http")
                            ? item.image
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"
                        }
                        alt="thumb"
                        height={100}
                      />
                    </Link>
                  </div>
                </div>
                <div className="single_post_text">
                  <h4>
                    <Link to={`/post-detail/${item.postId}`}>{item.title}</Link>
                  </h4>
                  <div className="meta4">
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
                  </div>
                </div>
              </div>
            ))}
        </Swiper>
        <Link
          id="search"
          style={{ float: "right" }}
          to={{
            pathname: "/search",
            state: {
              title: "Tin nóng",
              SearchContent: " ",
            },
          }}
        >
          <Button
            style={{
              color: "#21ccff !important",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Xem thêm
          </Button>
        </Link>
        <div className="navBtns">
          <div onClick={goPrev} className="navBtn prevtBtn">
            <FontAwesome name="angle-left" />
          </div>
          <div onClick={goNext} className="navBtn nextBtn">
            <FontAwesome name="angle-right" />
          </div>
        </div>
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default PopularPosts;
