import React, { Fragment } from "react";
import Heading from "../uiStyle/Heading";
import TrendingNewsSlider from "../TrendingNewsSlider";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";

const trendingNews = [
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image: "https://picsum.photos/700/500",
    viewCount: "200",
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
    viewCount: 54,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCoun: 53,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 54,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCoun: 53,
  },
];

const TrendingNews = ({ dark }) => {
  return (
    <Fragment>
      <Heading title="Tin nổi bật" />
      <TrendingNewsSlider />
      {dark ? (
        <div className="border_white" />
      ) : (
        <div className="border_black" />
      )}
      <div className="space-30" />
      <div className="row">
        <div className="col-lg-6">
          {trendingNews.slice(0, 3).map((item, i) => (
            <Fragment key={i}>
              <div className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <img
                      src={item.image}
                      alt="thumb"
                      height={"100%"}
                      width={"100%"}
                    />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="eye" />
                  </span>
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
                    <Link to={`/post-detail/${item.postId}`}>{item.date}</Link>
                  </div>
                  <h4>
                    <Link to={`/post-detail/${item.postId}`}>{item.title}</Link>
                  </h4>
                </div>
              </div>
              <div className="space-15" />
              {dark ? (
                <div className="border_white" />
              ) : (
                <div className="border_black" />
              )}
              <div className="space-15" />
            </Fragment>
          ))}
        </div>
        <div className="col-lg-6">
          {trendingNews.slice(3, 6).map((item, i) => (
            <Fragment key={i}>
              <div className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <img
                      src={item.image}
                      alt="thumb"
                      height={"100%"}
                      width={"100%"}
                    />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="eye" />
                  </span>
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
                      {item.publicTime}
                    </Link>
                  </div>
                  <h4>
                    <Link to={`/post-detail/${item.postId}`}>{item.title}</Link>
                  </h4>
                </div>
              </div>
              <div className="space-15" />
              {dark ? (
                <div className="border_white" />
              ) : (
                <div className="border_black" />
              )}
              <div className="space-15" />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TrendingNews;
