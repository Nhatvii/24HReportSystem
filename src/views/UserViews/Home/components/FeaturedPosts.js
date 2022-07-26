import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../styles/featuredPosts.css";
import SideTab from "./SideTab";
import PostList from "./PostList";
import TitleBreakLine from "./TitleBreakLine";
import LastestPost from "./LastestPost";
import { Label } from "./styles";
export default function FeaturedPosts() {
  return (
    <div className="featured pl-5 pr-5">
      <div style={{ textAlign: "left" }}>
        <div class="row">
          <div class="col-sm-9 col-xl-9 col-sm-12 pb-5">
            <Label>Tin mới nhất</Label>
            <TitleBreakLine />
            <div className="maincontainer">
              <div class="row">
                <div class="col-12">
                  <section class="row">
                    <div
                      className="col-sm-12 col-xl-3 mb-3 mb-lg-2 d-lg-down-none d-md-down-none "
                      style={{
                        overflow: "auto",
                        height: "45rem",
                        scrollBehavior: "smooth",
                      }}
                    >
                      <LastestPost />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-xl-3">
            <SideTab />
          </div>
        </div>
        <PostList />
      </div>
    </div>
  );
}
