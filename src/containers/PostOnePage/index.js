import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import MostShareWidget from "../../components/MostShareWidget";
import FollowUs from "../../components/FollowUs";
import PostOnePagination from "../../components/PostOnePagination";
import { Markup } from "interweave";

// images
import author2 from "../../doc/img/author/author2.png";

import OurBlogSection from "../../components/OurBlogSection";
import postDetailApi from "../../api/postDetailApi";
import moment from "moment";
import { Comments } from "../../views/UserViews/Post/components/Comments";

const PostOnePage = (props) => {
  const [postDetail, setPostDetail] = useState([]);
  const [description, setDescription] = useState([]);
  const fetchPostDetail = async () => {
    try {
      await postDetailApi.getAll(props.match.params.id).then((data) => {
        setPostDetail(data);
      });
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    console.log(props);
    fetchPostDetail();
  }, [props]);
  return (
    <Fragment>
      <div className="fifth_bg archives post post1">
        <BreadCrumb className="shadow5 padding-top-10" title="Bài viết" />
        <span className="space-30" />
        {postDetail !== null && (
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-8">
                <div className="row">
                  <div className="col-6 align-self-center">
                    <div className="page_category">
                      <h4>
                        {postDetail.category && postDetail.category.subCategory}
                      </h4>
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <div className="page_comments">
                      <ul className="inline">
                        <li>
                          <FontAwesome name="thumbs-up" />
                          {postDetail.likeCount}
                        </li>
                        <li>
                          <FontAwesome name="comment" />
                          {postDetail.commentCount}
                        </li>
                        <li>
                          <FontAwesome name="share" />
                          {postDetail.shareCount}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-30" />
                <div className="single_post_heading">
                  <h1>{postDetail.title}</h1>
                  <div className="space-10" />
                  <p>
                    <b>{postDetail.subTitle}</b>
                  </p>
                </div>
                <div className="space-40" />
                <img
                  src={postDetail.image}
                  alt="thumb"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                    display: "inline-block",
                  }}
                  class="img-responsive"
                />
                <div className="space-20" />
                <div className="row">
                  <div className="col-lg-6 align-self-center">
                    <div className="author">
                      <div className="author_img">
                        <div className="author_img_wrap">
                          <img src={author2} alt="author2" />
                        </div>
                      </div>
                      <Link to="/">
                        {postDetail.editor &&
                          postDetail.editor.accountInfo.username}
                      </Link>
                      <ul>
                        <li className="capitalize">
                          <Link to="/">
                            {moment(postDetail.createTime).format(
                              "dddd, Do MM YYYY"
                            )}
                          </Link>
                        </li>
                        <li className="capitalize">
                          {postDetail.updateTime &&
                            "cập nhật lần cuối" +
                              moment(postDetail.updateTime).format(
                                "dddd, Do MM YYYY"
                              )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="author_social inline text-right">
                      <ul>
                        <li>
                          <Link to="/">
                            <FontAwesome name="instagram" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                            <FontAwesome name="facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                            <FontAwesome name="youtube" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                            <FontAwesome name="instagram" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-20" />
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <Markup content={postDetail.description} />
                </div>
                <div className="space-40" />
                <div className="border_black" />
                {/* Comment like share */}
                <Comments className="comments" postId={props.match.params.id} />
                <div className="space-60" />
              </div>
              <div className="col-md-6 col-lg-4">
                <WidgetTab
                  data={JSON.parse(localStorage.getItem("carousel-post"))}
                />
                <FollowUs title="Theo dõi chúng tôi" />
                <MostShareWidget
                  title="Chia sẻ nhiều"
                  data={JSON.parse(localStorage.getItem("carousel-post"))}
                />
                <NewsLetter />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-60" />
      <OurBlogSection
        data={JSON.parse(localStorage.getItem("carousel-post"))}
      />
      <div className="space-100" />
    </Fragment>
  );
};

export default PostOnePage;
