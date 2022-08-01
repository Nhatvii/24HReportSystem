import React, { Fragment } from "react";
import PostGallery from "../../components/PostGallery";
import TrendingNews from "../../components/TrendingNews";
import FollowUs from "../../components/FollowUs";
import MostView from "../../components/MostView";
import MixCarousel from "../../components/MixCarousel";
import { Link } from "react-router-dom";
import MostShareWidget from "../../components/MostShareWidget";
import NewsLetter from "../../components/NewsLetter";
import CategoriesWidget from "../../components/CategoriesWidget";

// images
import banner1 from "../../doc/img/bg/banner1.png";
import banner2 from "../../doc/img/bg/sidebar-1.png";
import LastestPost from "../../components/LastestPost";
import RecommendedNews from "../../components/RecommededNews";

const recommendeds = [
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

const HomePage = () => {
  return (
    <Fragment>
      <PostGallery className="fifth_bg" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews />
          </div>
          <div className="col-md-12 col-lg-4">
            <FollowUs title="Theo dõi tại" />
            <MostView />
          </div>
        </div>
      </div>
      <MixCarousel className="half_bg1" />
      <LastestPost className="pt30 half_bg60" />
      <div className="entertrainments">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title">Tin đề xuất</h2>
                  </div>
                </div>
              </div>
              {/*CAROUSEL START*/}
              <div className="entertrainment_carousel mb30">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <RecommendedNews recommended={recommendeds} />
                  </div>
                </div>
              </div>
              {/*CAROUSEL END*/}
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <MostShareWidget title="Chia sẻ nhiều" />
                </div>
                <div className="col-lg-12">
                  <NewsLetter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </Fragment>
  );
};

export default HomePage;
