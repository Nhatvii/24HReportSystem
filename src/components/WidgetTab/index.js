import React, { Fragment, useEffect, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, Fade } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import postApi from "../../api/postApi";
import moment from "moment";
const widget = [
  {
    category: { subCategory: "Chiếm đoạt tài sản" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image: "https://picsum.photos/700/500",
    viewCount: 45,
    likeCount: 12,
  },
  {
    category: { subCategory: "Lừa đảo" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://d3jyiu4jpn0ihr.cloudfront.net/wp-content/uploads/sites/6/20190918160006/ve-may-bay-di-sai-gon1.jpg",
    viewCount: 43,
    likeCount: 42,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 74,
    likeCount: 352,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCount: 54,
    likeCount: 65,
  },
  {
    category: { subCategory: "Mạng xã hội" },
    date: "March 26, 2020",
    title: "Lừa đảo sinh viên nghèo",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/1200/Images/phamquynh/2021/07/12/sai-gon-mua-thuong-1626066367.jpg",
    viewCount: 46,
    likeCount: 68,
  },
  {
    category: { subCategory: "Vay tín dụng đen" },
    date: "March 26, 2020",
    title: "Bị lừa khi tìm bạn gái trên Tinder",
    image:
      "https://vnn-imgs-f.vgcloud.vn/2021/11/05/21/thanh-nien-bo-lai-doi-dep-giua-cau-sai-gon-roi-lao-xuong-song-mat-tich-3.jpg",
    viewCount: 63,
  },
];
const WidgetTabPane = ({ arr, a_id, id, dark }) => {
  return (
    <Fade in={id === a_id}>
      <div className="widget ">
        {arr.map((item, i) => (
          <Fragment key={i}>
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to={`/post-detail/${item.postId}`}>
                    <img src={item.image} alt="thumb" />
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
            <div className="space-15" /> <div className="space-15" />
          </Fragment>
        ))}
      </div>
    </Fade>
  );
};

const WidgetTab = ({ className, dark }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [widgetPosts, setWidgetPosts] = useState([]);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const loadWidgetPosts = async () => {
    try {
      const params = { Status: 3 };
      const response = await postApi.getByStatus(params);
      localStorage.setItem("widget-post", JSON.stringify(response.slice(0, 4)));
      setWidgetPosts(JSON.parse(localStorage.getItem("widget-post")));
    } catch (e) {
      toast.error("Không thể tải bài viết");
    }
  };
  useEffect(() => {
    loadWidgetPosts();
  }, [widgetPosts]);
  return (
    <>
      <div className={`widget_tab md-mt-30 ${className}`}>
        <Nav>
          <NavItem>
            <Link
              to="/"
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
              to="/"
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
              to="/"
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
              dark={dark}
              a_id={activeTab}
              id="1"
              arr={widget.sort((a, b) => a.viewCount - b.viewCount).slice(0, 4)}
            />
          </TabPane>
          <TabPane tabId="2">
            <WidgetTabPane
              dark={dark}
              a_id={activeTab}
              id="2"
              arr={widget
                .sort(
                  (a, b) => new moment(a.publicTime) - new moment(b.publicTime)
                )
                .slice(0, 4)}
            />
          </TabPane>
          <TabPane tabId="3">
            <WidgetTabPane
              dark={dark}
              a_id={activeTab}
              id="3"
              arr={widget.sort((a, b) => a.likeCount - b.likeCount).slice(0, 4)}
            />
          </TabPane>
        </TabContent>
      </div>
      <div className="space-30" />
    </>
  );
};

export default WidgetTab;
