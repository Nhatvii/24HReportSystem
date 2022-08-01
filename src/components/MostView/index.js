import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from "react-id-swiper";
import postApi from "../../api/postApi";
import { toast } from "react-toastify";
import moment from "moment";
const mostView = [
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
const MostView = ({ no_margin, title, dark }) => {
  const [swiper, setSwiper] = useState(null);
  const [mostViewPosts, setMostViewPosts] = useState([]);
  const loadMostViewPosts = async () => {
    try {
      const params = { Status: 3 };
      const response = await postApi.getByStatus(params);
      setMostViewPosts(
        response.sort((a, b) => new a.viewCount() - b.viewCount).slice(0, 4)
      );
    } catch (e) {
      toast.error("Không thể tải bài viết");
    }
  };
  useEffect(() => {
    loadMostViewPosts();
  }, [mostViewPosts]);
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
        <Swiper getSwiper={setSwiper} {...params}>
          {mostView
            .sort((a, b) => a.viewCount - b.viewCount)
            .reverse()
            .slice(0, 6)
            .map((item, i) => (
              <div key={i} className="single_post2_carousel">
                <div className="single_post widgets_small type8">
                  <div className="post_img">
                    <div className="img_wrap">
                      <img src={item.image} alt="thumb" height={"100px"} />
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
                        {item.title}
                      </Link>
                    </h6>
                  </div>
                  <div className="type8_count">
                    <h5>{item.viewCount}</h5>
                  </div>
                </div>
                {i + 2 < mostViewPosts.length ? (
                  <Fragment>
                    <div className="space-15" />
                    {dark ? (
                      <div className="border_white" />
                    ) : (
                      <div className="border_black" />
                    )}
                    <div className="space-15" />
                  </Fragment>
                ) : null}
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

export default MostView;
