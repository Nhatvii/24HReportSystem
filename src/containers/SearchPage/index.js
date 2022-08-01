import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import FollowUs from "../../components/FollowUs";

// images
import banner2 from "../../doc/img/bg/sidebar-1.png";
import postApi from "../../api/postApi";

const SearchPage = (props) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const fetchPostList = async () => {
    console.log(props.history.location.state.categoryID);
    setTitle(localStorage.getItem("title"));
    try {
      const params = {
        isViewCount: true,
        SearchContent:
          localStorage.getItem("SearchContent") !== "null"
            ? localStorage.getItem("SearchContent")
            : "",
        status: 3,
      };
      const response = await postApi.getAll(params);
      setPosts(
        props.history.location.state.categoryID === undefined
          ? response
          : response.filter(
              (item) =>
                item.category.categoryId ===
                props.history.location.state.CategoryID
            )
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    localStorage.setItem(
      "categoryID",
      props.history.location.state.categoryId !== undefined
        ? props.history.location.state.CategoryId
        : null
    );
    localStorage.setItem(
      "SearchContent",
      props.history.location.state.SearchContent !== undefined
        ? props.history.location.state.SearchContent
        : null
    );
    localStorage.setItem(
      "title",
      props.history.location.state.title !== undefined
        ? props.history.location.state.title
        : null
    );

    fetchPostList();
  }, [props]);
  return (
    <Fragment>
      <BreadCrumb title={title} />
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="businerss_news">
                <div className="row">
                  <div className="col-12 align-self-center">
                    <div className="categories_title">
                      <h5>{title}</h5>
                    </div>
                  </div>
                </div>

                {/* <div className="row">
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
                            <Link
                              className="page-link"
                              to="/"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <FontAwesome name="caret-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <WidgetTab />
              <WidgetTrendingNews />
              <NewsLetter />
              <FollowUs title="Theo dõi chúng tôi" />
              <div className="banner2 mb30">
                <Link to="/">
                  <img src={banner2} alt="thumb" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </Fragment>
  );
};

export default SearchPage;
