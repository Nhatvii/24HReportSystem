import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from "react-id-swiper";
import moment from "moment";

// images
const mostShared = [
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image: "https://picsum.photos/700/500",
    viewCount: 45,
    shareCount: 45,
  },
  {
    category: { subCategory: "Lừa đảo" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://d3jyiu4jpn0ihr.cloudfront.net/wp-content/uploads/sites/6/20190918160006/ve-may-bay-di-sai-gon1.jpg",
    viewCount: 43,
    shareCount: 43,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 74,
    shareCount: 53,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCount: 54,
    shareCount: 54,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 46,
    shareCount: 65,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCount: 53,
    shareCount: 4,
  },
];

const MostShareWidget = ({ title, dark }) => {
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
          {mostShared
            .sort((a, b) => a.shareCount - b.shareCount)
            .reverse()
            .map((item, i) => (
              <div key={i} className="carousel_items">
                <div className="single_post widgets_small widgets_type4">
                  <div className="post_img number">
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
                      <Link>{item.title}</Link>
                    </h4>
                    <ul className="inline socail_share">
                      <li>
                        <Link to={`/post-detail/${item.postId}`}>
                          <FontAwesome name="share" />
                          {item.shareCount}
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
