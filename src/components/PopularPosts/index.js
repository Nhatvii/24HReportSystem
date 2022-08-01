import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from "react-id-swiper";

// images
import popularsm1 from "../../doc/img/popular/popularsm1.jpg";
import popularsm2 from "../../doc/img/popular/popularsm2.jpg";
import popularsm3 from "../../doc/img/popular/popularsm3.jpg";
import popularsm4 from "../../doc/img/popular/popularsm4.jpg";
import popularsm5 from "../../doc/img/popular/popularsm5.jpg";

import "./style.scss";

const popularPost = [
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image: "https://picsum.photos/700/500",
    viewCount: 45,
  },
  {
    category: { subCategory: "Lừa đảo" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://d3jyiu4jpn0ihr.cloudfront.net/wp-content/uploads/sites/6/20190918160006/ve-may-bay-di-sai-gon1.jpg",
    viewCount: 43,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 74,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCount: 54,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 46,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCount: 53,
  },
];

const PopularPosts = () => {
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
    slidesPerColumn: 6,
  };
  return (
    <div className="popular_carousel_area mb30 md-mt-30">
      <h2 className="widget-title">Tin nóng</h2>
      <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Swiper getSwiper={setSwiper} {...params}>
          {popularPost.slice(0, 5).map((item, i) => (
            <div key={i} className="single_post type10 widgets_small mb15">
              <div className="post_img">
                <div className="img_wrap">
                  <Link>
                    <img src={item.image} alt="thumb" height={100} />
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
                        title: "Danh mục: " + item.category.subCategory,
                        CategoryID: item.category.categoryId,
                      },
                    }}
                  >
                    {item.category.subCategory}
                  </Link>
                </div>
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
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default PopularPosts;
