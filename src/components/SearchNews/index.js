import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const SearchNews = ({ searchNews, headerHide }) => {
  return (
    <div className="row">
      {console.log(searchNews)}
      <div className="col-12">
        <div className="businerss_news">
          {headerHide ? (
            ""
          ) : (
            <div className="row">
              <div className="col-6 align-self-center">
                <h2 className="widget-title">Tìm kiếm</h2>
              </div>
              <div className="col-6 text-right align-self-center">
                <Link to="/" className="see_all mb20">
                  Xem tất cả
                </Link>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12">
              {searchNews.map((item, i) => (
                <div
                  key={i}
                  className="single_post post_type3 post_type12 mb30"
                >
                  <div className="post_img">
                    <div className="img_wrap">
                      <Link to="/">
                        <img src={item.image} alt="thumb" />
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
                      <Link to="#">
                        {moment(item.createTime).format("DD.MM.YYYY")}
                      </Link>
                    </div>
                    <h4>
                      <Link to={`/post-detail/${item.postId}`}>
                        {item.title}
                      </Link>
                    </h4>
                    <div className="space-10" />
                    <p className="post-p">{item.subTitle}</p>
                    <div className="space-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchNews;
