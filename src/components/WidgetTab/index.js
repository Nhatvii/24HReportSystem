import React, { Fragment, useEffect, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, Fade } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import postApi from "../../api/postApi";
import moment from "moment";

const WidgetTabPane = ({ arr, a_id, id, dark }) => {
  return (
    <Fade in={id === a_id}>
      <div className="widget ">
        {arr.map((item, i) => (
          <Fragment key={i}>
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to="#">
                    <img src={item.image} alt="thumb" />
                  </Link>
                </div>
              </div>
              <div className="single_post_text">
                <div className="meta2 meta_separator1">
                  <Link to="#">{item.category.subCategory}</Link>
                  <Link to="#">
                    {moment(item.createTime).format("DD.MM.YYYY")}
                  </Link>
                </div>
                <h4>
                  <Link to="/post1">{item.title.substring(0, 45) + "..."}</Link>
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
              arr={widgetPosts}
            />
          </TabPane>
          <TabPane tabId="2">
            <WidgetTabPane
              dark={dark}
              a_id={activeTab}
              id="2"
              arr={widgetPosts}
            />
          </TabPane>
          <TabPane tabId="3">
            <WidgetTabPane
              dark={dark}
              a_id={activeTab}
              id="3"
              arr={widgetPosts}
            />
          </TabPane>
        </TabContent>
      </div>
      <div className="space-30" />
    </>
  );
};

export default WidgetTab;
