import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from "react-id-swiper";
import moment from "moment";
import { Button } from "react-bootstrap";

const MostShareWidget = ({ title, dark, data }) => {
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
    slidesPerView: 1,
    slidesPerColumn: 6,
  };
  return (
    <div className="widget tab_widgets mb30">
      <h2 className="widget-title">{title ? title : "Most View"}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Swiper getSwiper={setSwiper} {...params}>
          {data &&
            data
              .sort((a, b) => a.shareCount - b.shareCount)
              .reverse()
              .slice(0, 3)
              .map((item, i) => (
                <div key={i} className="carousel_items">
                  <div className="single_post widgets_small widgets_type4">
                    <div
                      className={`post_img number${
                        i < 3 ? i + 1 : ""
                      } shinning`}
                    >
                      <h2>{i + 1}</h2>
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
                          {moment(item.publicTime).format("DD.MM.YYYY")}
                        </Link>
                      </div>
                      <h4>
                        <Link to={`/post-detail/${item.postId}`}>
                          {item.title}
                        </Link>
                      </h4>
                      <ul className="inline socail_share">
                        <li>
                          <Link to={`/post-detail/${item.postId}`}>
                            <FontAwesome name="share" />{" "}
                            {item.shareCount === null ? 0 : item.shareCount}{" "}
                            lượt chia sẻ
                          </Link>
                        </li>
                      </ul>
                      <div className="space-15" />
                      {dark ? (
                        <div className="border_white" />
                      ) : (
                        <div className="border_black" />
                      )}
                    </div>
                  </div>
                  <div className="space-15" />
                </div>
              ))}
        </Swiper>
        <Link
          id="search"
          style={{ float: "right" }}
          to={{
            pathname: "/search",
            state: {
              title: "Chia sẻ nhiều",
              SearchContent: " ",
            },
          }}
        >
          <Button
            style={{
              color: "#1ab7ea !important",
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

export default MostShareWidget;
