import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import NewsLetter from "../../components/NewsLetter";
import MostShareWidget from "../../components/MostShareWidget";
import FollowUs from "../../components/FollowUs";
import { Markup } from "interweave";
// images
import SuggestionPost from "../../components/SuggestionPost";
import postDetailApi from "../../api/postDetailApi";
import moment from "moment";
import { Comments } from "../../views/UserViews/Post/components/Comments";
import "./style.css";
const PostOnePage = (props) => {
  const [postDetail, setPostDetail] = useState([]);
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
                      <h4>{postDetail.category && postDetail.category.type}</h4>
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
                          {postDetail.shareCount === null
                            ? 0
                            : postDetail.shareCount}
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
                {postDetail.video === "null" ||
                postDetail.video === "string" ? (
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
                ) : (
                  <div class="h_iframe">
                    <img class="ratio" alt="img " src={postDetail.image} />
                    <iframe
                      title={postDetail.title}
                      frameborder="0"
                      height="465px"
                      width="470px"
                      scrolling="no"
                      src={postDetail.video}
                      allowfullscreen
                    ></iframe>
                  </div>
                )}
                <div className="space-20" />
                <div className="row">
                  <div className="col-lg-6 align-self-center">
                    <div className="author">
                      <div className="author_img">
                        <div className="author_img_wrap">
                          <img
                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                            alt="author2"
                            width={50}
                            height={50}
                          />
                        </div>
                      </div>
                      <Link to="/">
                        {postDetail.editor &&
                          postDetail.editor.accountInfo.fullname}
                      </Link>
                      <ul>
                        <li className="capitalize">
                          <Link to="/">
                            {moment(postDetail.createTime).format(
                              "dddd, Do/MM/YYYY"
                            )}
                          </Link>
                        </li>
                        <li className="capitalize">
                          {postDetail.updateTime &&
                            "cập nhật lần cuối" +
                              moment(postDetail.updateTime).format(
                                "dddd, Do/MM/YYYY"
                              )}
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
      <SuggestionPost
        data={JSON.parse(localStorage.getItem("carousel-post"))}
      />
      <div className="space-100" />
    </Fragment>
  );
};

export default PostOnePage;
