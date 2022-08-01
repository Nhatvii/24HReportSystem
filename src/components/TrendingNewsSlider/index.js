import React, { useState } from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import Swiper from "react-id-swiper";
import moment from "moment";

const trendingNews = [
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image: "https://picsum.photos/700/500",
    viewCount: "200",
  },
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://d3jyiu4jpn0ihr.cloudfront.net/wp-content/uploads/sites/6/20190918160006/ve-may-bay-di-sai-gon1.jpg",
    viewCount: 43,
  },
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 54,
  },
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCoun: 53,
  },
];
const TrendingNewsSlider = () => {
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
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };
  return (
    <div className="carousel_post2_type3 nav_style1">
      <Swiper getSwiper={setSwiper} className="trancarousel" {...params}>
        {trendingNews.map((item, i) => (
          <div key={i} className="single_post post_type3">
            <div className="post_img">
              <div className="img_wrap">
                <img src={item.image} alt="thumb" width={400} height={200} />
              </div>
              <span className="tranding">
                <FontAwesome name="eye" /> {item.viewCount}
              </span>
            </div>
            <div className="single_post_text">
              <div className="meta3">
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
                <Link to={`/post-detail/${item.postId}`}>{item.title}</Link>
              </h4>
              <div className="space-10" />
              <p className="post-p">{item.subTitle}</p>
            </div>
          </div>
        ))}
      </Swiper>
      <div className="navBtns">
        <div onClick={goPrev} className="navBtn prevtBtn">
          <FontAwesome name="angle-left" />
        </div>
        <div onClick={goNext} className="navBtn nextBtn">
          <FontAwesome name="angle-right" />
        </div>
      </div>
    </div>
  );
};

export default TrendingNewsSlider;
