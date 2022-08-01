import moment from "moment";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const RecommendedNews = ({ recommended }) => {
  return (
    <Fragment>
      {recommended.map((item, i) => (
        <div key={i} className="col-lg-6">
          <div className="single_post post_type3 mb30">
            <div className="post_img">
              <div className="img_wrap">
                <Link to={`/post-detail/${item.postId}`}>
                  <img src={item.image} alt="thumb" height={200} width={400} />
                </Link>
              </div>
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
        </div>
      ))}
    </Fragment>
  );
};

export default RecommendedNews;
