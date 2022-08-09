import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from "react-id-swiper";
import moment from "moment";

const MostView = ({ no_margin, title, data }) => {
  // const { data } = props;
  const [swiper, setSwiper] = useState(null);
  const [mostViewPosts, setMostViewPosts] = useState([]);

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
    slidesPerView: 1,
    slidesPerColumn: 6,
  };
  return (
    <div className={`widget tab_widgets ${no_margin ? "" : "mb30"}`}>
      <h2 className="widget-title">{title ? title : "Xem nhiều"}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Swiper getSwiper={setSwiper} {...params} observer observeParents>
          {data
            .sort((a, b) => a.viewCount - b.viewCount)
            .reverse()
            .map((item, i) => (
              <div key={i} className="single_post2_carousel">
                <div className="single_post widgets_small type8">
                  <div className="post_img">
                    <div className="img_wrap">
                      <img
                        src={
                          item.image.includes("http")
                            ? item.image
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"
                        }
                        alt="thumb"
                        height={"100px"}
                      />
                    </div>
                  </div>
                  <div className="single_post_text">
                    <div className="meta2">
                      <Link
                        to={{
                          pathname: "/search",
                          state: {
                            title: "Danh mục: " + item.category.subCategory,
                            CategoryID: item.category.categoryId,
                          },
                        }}
                      >
                        {item.category.subCategory}
                      </Link>
                      <Link to={`/post-detail/${item.postId}`}>
                        {moment(item.publicTime).format("DD-MMMM-YYYY")}
                      </Link>
                    </div>
                    <h6>
                      <Link to={`/post-detail/${item.postId}`}>
                        {item.title.substring(0, 50) + "..."}
                      </Link>
                    </h6>
                  </div>
                  {/* <div className="type8_count">
                    <h5>
                      {item.viewCount}{" "}
                      <FontAwesome name="eye" style={{ fontSize: " 0.73em" }} />
                    </h5>
                  </div> */}
                </div>
                {i + 2 < mostViewPosts.length ? (
                  <Fragment>
                    <div className="space-15" />
                    <div className="border_black" />
                    <div className="space-15" />
                  </Fragment>
                ) : null}
              </div>
            ))}
        </Swiper>
        <Link
          id="search"
          style={{ float: "right" }}
          to={{
            pathname: "/search",
            state: {
              title: "Xem nhiều",
              SearchContent: " ",
            },
          }}
        >
          Xem thêm...
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

export default MostView;
