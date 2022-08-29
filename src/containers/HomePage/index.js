import React, { Fragment, useEffect, useState } from "react";
import PostGallery from "../../components/PostGallery";
import TrendingNews from "../../components/TrendingNews";
import FollowUs from "../../components/FollowUs";
import MostView from "../../components/MostView";
import MixCarousel from "../../components/MixCarousel";
import MostShareWidget from "../../components/MostShareWidget";
import NewsLetter from "../../components/NewsLetter";
// images
import LastestPost from "../../components/LastestPost";
import RecommendedNews from "../../components/RecommededNews";
import postApi from "../../api/postApi";

const HomePage = () => {
  const [postList, setPostList] = useState([]);
  const loadPostList = async () => {
    try {
      const params = { Status: 3 };
      const response = await postApi.getByStatus(params);
      localStorage.setItem(
        "carousel-post",
        JSON.stringify(response.filter((e) => e.video === "null"))
      );
      setPostList(JSON.parse(localStorage.getItem("carousel-post")));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadPostList();
  });
  function scrollTrending() {
    const id = "trending";
    const yOffset = -150;
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
  function scrollMostView() {
    const id = "most_view";
    const yOffset = -150;
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
  function scrollMostShare() {
    const id = "most_share";
    const yOffset = -150;
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
  return (
    <Fragment>
      {/* <div
        className="up_btn_trending up_btn_trending"
        onClick={() => scrollTrending()}
      >
        <FontAwesome name="bolt" />
      </div>
      <div
        className="up_btn_most_view up_btn_most_view"
        onClick={() => scrollMostView()}
      >
        <FontAwesome name="fire" />
      </div>
      <div
        className="up_btn_most_share up_btn_most_share"
        onClick={() => scrollMostShare()}
      >
        <FontAwesome name="star" />
      </div> */}
      <PostGallery className="fifth_bg" data={postList} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews data={postList} />
          </div>
          <div className="col-md-12 col-lg-4">
            {/* <FollowUs title="Theo dõi tại" /> */}
            <MostView data={postList} />
          </div>
        </div>
      </div>
      <MixCarousel className="half_bg1" data={postList} />
      <LastestPost className="pt30 half_bg60" data={postList} />
      <div className="entertrainments">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title" id="most_share">
                      Tin đề xuất
                    </h2>
                  </div>
                </div>
              </div>
              {/*CAROUSEL START*/}
              <div className="entertrainment_carousel mb30">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <RecommendedNews data={postList.slice(0, 4)} />
                  </div>
                </div>
              </div>
              {/*CAROUSEL END*/}
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <MostShareWidget title="Chia sẻ nhiều" data={postList} />
                </div>
                {/* <div className="col-lg-12">
                  <NewsLetter />
                </div> */}
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
