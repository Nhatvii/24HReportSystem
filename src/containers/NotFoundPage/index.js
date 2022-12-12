import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// images
import erroImg from "../../doc/img/bg/404.png";

const NotFoundPage = () => {
  return (
    <Fragment>
      <div className="inner_table">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="space-50" />
              <div className="area404 text-center">
                <img src={erroImg} alt="404" />
              </div>
              <div className="space-30" />
              <div className="back4040 text-center col-lg-6 m-auto">
                <h3>Không tìm thấy trang</h3>
                <div className="space-10" />
                <p>
                  Trang bạn tìm không tồn tại. Thử tìm lại hoặc thử các cách
                  sau:
                </p>
                <div className="space-20" />
                <div className="button_group">
                  <Link to="/" className="cbtn2">
                    Về trang chủ
                  </Link>
                  <Link to="/contact" className="cbtn3">
                    Liên hệ với chúng tôi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-50" />
      </div>

      {/* <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-6 align-self-center">
                  <div className="heading">
                    <h2 className="widget-title">Archive</h2>
                  </div>
                </div>
                <div className="col-6 text-right">
                  <div className="calender">
                    <img src={calendar} alt="calendar" />
                  </div>
                </div>
              </div>
              <div className="about_posts_tab">
                <div className="row justify-content-center">
                  <RecommendedNews
                    headerHide={true}
                    recommended={entertainments}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="cpagination">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <Link
                            className="page-link"
                            to="/"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">
                              <FontAwesome name="caret-left" />
                            </span>
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/">
                            ..
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/">
                            5
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/" aria-label="Next">
                            <span aria-hidden="true">
                              <FontAwesome name="caret-right" />
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <WidgetTab />
              <FollowUs title="Theo dõi chúng tôi" />
              <WidgetTrendingNews />
              <div className="banner2 mb30">
                <Link to="/">
                  <img src={banner2} alt="thumb" />
                </Link>
              </div>
              <MostShareWidget title="Chia sẻ nhiều" />
              <NewsLetter />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" /> */}
    </Fragment>
  );
};

export default NotFoundPage;
