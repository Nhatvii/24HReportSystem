import React, { useState } from "react";
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import Swiper from "react-id-swiper";
import ModalVideo from "react-modal-video";
import moment from "moment";

const mixArray = [
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

const MixCarousel = ({ className, dark }) => {
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
                <Swiper getSwiper={setSwiper} {...params}>
                  {mixArray.map((item, i) => (
                    <div key={i} className="single_post post_type6 post_type9">
                      <div className="post_img gradient1">
                        <div className="img_wrap">
                          <Link className="play_btn" to="/">
                            <img src={item.image} alt="news" height={400} />
                          </Link>
                        </div>
                      </div>
                      <div className="single_post_text">
                        <div className="meta">
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
