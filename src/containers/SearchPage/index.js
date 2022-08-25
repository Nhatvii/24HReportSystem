import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import WidgetTab from "../../components/WidgetTab";
import NewsLetter from "../../components/NewsLetter";
import FollowUs from "../../components/FollowUs";
// images
import postApi from "../../api/postApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "./pagination";
import "./style.css";

const SearchPage = (props) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [searchContent, setSearchContent] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [rootCategoryID, setRootCategoryID] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);
  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  };
  const fetchPostList = async () => {
    try {
      const params1 = {
        isViewCount: true,
        SubCategoryID: categoryID,
        status: 3,
      };
      const params2 = {
        isViewCount: true,
        SearchContent: searchContent,
        status: 3,
      };
      const params3 = {
        isViewCount: true,
        RootCategoryID: rootCategoryID,
        status: 3,
      };
      if (searchContent !== undefined) {
        const response = await postApi.searchByContent(params2);
        setPosts(response);
      }
      if (categoryID !== undefined) {
        const response = await postApi.searchByCategory(params1);
        setPosts(response);
      }
      if (rootCategoryID !== undefined) {
        const response = await postApi.searchByRootCategory(params3);
        setPosts(response);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    if (props.history.location.state !== undefined) {
      if (props.history.location.state.SearchContent !== searchContent) {
        setSearchContent(props.history.location.state.SearchContent);
      }
      if (props.history.location.state.CategoryID !== categoryID) {
        setCategoryID(props.history.location.state.CategoryID);
      }
      if (props.history.location.state.RootCategoryID !== rootCategoryID) {
        setRootCategoryID(props.history.location.state.RootCategoryID);
      }
      setTitle(props.history.location.state.title);
    }
  }, [props]);
  useEffect(() => {
    fetchPostList();
  }, [searchContent, categoryID, rootCategoryID, title]);
  return (
    <Fragment>
      {console.log(posts)}
      <BreadCrumb title={title} />
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="businerss_news">
                <div className="row">
                  <div className="col-12 align-self-center">
                    <div className="categories_title">
                      <h5>
                        {title === "1"
                          ? "Nổi bật"
                          : title === "2"
                          ? "Gần đây"
                          : title === "3"
                          ? "Đề xuất"
                          : title}
                      </h5>
                    </div>
                  </div>
                </div>
                {pageOfItems.length > 0 && posts.length > 0 ? (
                  pageOfItems.map((item, i) => (
                    <div key={i} className="col-lg-12">
                      <div className="single_post post_type12 mb30">
                        <div className="post_img">
                          <div className="img_wrap">
                            <Link to={`/post-detail/${item.postId}`}>
                              <img
                                src={
                                  item.image.includes("http")
                                    ? item.image
                                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"
                                }
                                alt="thumb"
                                height={200}
                                width={200}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="single_post_text">
                          <div className="meta3">
                            <Link
                              to={{
                                pathname: "/search",
                                state: {
                                  title:
                                    "Danh mục: " + item.category.subCategory,
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
                            <Link to={`/post-detail/${item.postId}`}>
                              {item.title}
                            </Link>
                          </h4>
                          <div className="space-10" />
                          <p className="post-p">{item.subTitle}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="ml-100 justify-content-center mt-5">
                    <div className="d-flex justify-content-center">
                      <img
                        src="https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
                        width={400}
                        height={400}
                        className="rounded-circle"
                      />
                    </div>
                    <b className="h3 text-primary d-flex justify-content-center pb-5 pt-2">
                      Không tìm thấy bài viết liên quan
                    </b>
                  </div>
                )}
              </div>
              {posts.length > 0 && (
                <Pagination items={posts} onChangePage={onChangePage} />
              )}
            </div>

            <div className="col-md-6 col-lg-4">
              <WidgetTab
                data={JSON.parse(localStorage.getItem("carousel-post"))}
              />
              <NewsLetter />
              <FollowUs title="Theo dõi chúng tôi" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </Fragment>
  );
};

export default SearchPage;
