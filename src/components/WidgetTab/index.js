import React, { Fragment, useEffect, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, Fade } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import moment from "moment";

const WidgetTabPane = ({ arr, a_id, id }) => {
  return (
    <Fade in={id === a_id}>
      <div className="widget ">
        {arr &&
          arr.map((item, i) => (
            <Fragment key={i}>
              <div className="single_post widgets_small">
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
                      />
                    </Link>
                  </div>
                </div>
                <div className="single_post_text">
                  <div className="meta2 meta_separator1">
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
                    <Link to={`/post-detail/${item.postId}`}>
                      {item.title.substring(0, 45) + "..."}
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="space-15" />
              {arr.length - 1 === i && (
                <Link
                  id="search"
                  style={{ float: "right" }}
                  to={{
                    pathname: "/search",
                    state: {
                      title: id,
                      SearchContent: " ",
                    },
                  }}
                >
                  Xem thêm...
                </Link>
              )}
            </Fragment>
          ))}
      </div>
    </Fade>
  );
};

const WidgetTab = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [widgetPosts, setWidgetPosts] = useState([]);
  const { data, className } = props;
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <div className={`widget_tab md-mt-30 ${className}`}>
        <Nav>
          <NavItem>
            <Link
              to="#"
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Nổi bật
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="#"
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Gần đây
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="#"
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Đề xuất
            </Link>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} style={{ border: "none" }}>
          <TabPane tabId="1">
            <WidgetTabPane
              a_id={activeTab}
              id="1"
              arr={
                data &&
                data.sort((a, b) => a.viewCount - b.viewCount).slice(0, 4)
              }
            />
          </TabPane>
          <TabPane tabId="2">
            <WidgetTabPane
              a_id={activeTab}
              id="2"
              arr={
                data &&
                data
                  .sort(
                    (a, b) =>
                      new moment(a.publicTime) - new moment(b.publicTime)
                  )
                  .slice(0, 4)
              }
            />
          </TabPane>
          <TabPane tabId="3">
            <WidgetTabPane
              a_id={activeTab}
              id="3"
              arr={
                data &&
                data.sort((a, b) => a.likeCount - b.likeCount).slice(0, 4)
              }
            />
          </TabPane>
        </TabContent>
      </div>
      <div className="space-30" />
    </>
  );
};

export default WidgetTab;
