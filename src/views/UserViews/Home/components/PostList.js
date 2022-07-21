import React, { useEffect, useState } from "react";
import postApi from "../../../../api/postApi";
import EmergencyNews from "./News/EmergencyNews";
import LocalNews from "./News/LocalNews";
import MostSharedNews from "./News/MostSharedNews";
import OtherNews from "./News/OtherNews";
import TitleBreakLine from "./TitleBreakLine";
import TodayNews from "./News/TodayNews";
import { Link } from "react-router-dom";

export default function PostList() {
  return (
    <section className="section-content">
      <div className="featured">
        <div className="row ">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div class="row">
              <div class="col-6 align-self-center">
                <h2 class="widget-title">Tin hôm nay</h2>
              </div>
              <div class="col-6 text-right align-self-center">
                {" "}
                <Link
                  to={{
                    pathname: "/view-all",
                    state: { status: 3, title: "Tin hôm nay" },
                  }}
                  className="see_all mb20"
                >
                  <b>Xem tất cả</b>
                </Link>
              </div>
            </div>
            <TitleBreakLine />
            <TodayNews />
            <br />
            <div class="row">
              <div class="col-6 align-self-center">
                <h2 class="widget-title">Tin trong khu vực</h2>
              </div>
              <div class="col-6 text-right align-self-center">
                {" "}
                <Link
                  to={{
                    pathname: "/view-all",
                    state: { status: 3, title: "Tin trong khu vực" },
                  }}
                  className="see_all mb20"
                >
                  <b>Xem tất cả</b>
                </Link>
              </div>
            </div>
            <TitleBreakLine />
            <LocalNews />
            <div class="row">
              <div class="col-6 align-self-center">
                <h2 class="widget-title">Tin khẩn cấp</h2>
              </div>
              <div class="col-6 text-right align-self-center">
                {" "}
                <Link
                  to={{
                    pathname: "/view-all",
                    state: { status: 1, title: "Tin khẩn cấp" },
                  }}
                  className="see_all mb20"
                >
                  <b>Xem tất cả</b>
                </Link>
              </div>
            </div>
            <TitleBreakLine />
            <EmergencyNews />
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <div class="row">
              <div class="col-6 align-self-center">
                <h2 class="widget-title">Chia sẻ nhiều</h2>
              </div>
              <div class="col-6 text-right align-self-center">
                {" "}
                <Link
                  to={{
                    pathname: "/view-all",
                    state: { status: 2, title: "Chia sẻ nhiều" },
                  }}
                  className="see_all mb20"
                >
                  <b>Xem tất cả</b>
                </Link>
              </div>
            </div>
            <TitleBreakLine />
            {/* Most shared here */}
            <MostSharedNews />
            {/* Tin khác */}
            <br />
            <div>
              <div class="row">
                <div class="col-6 align-self-center">
                  <h2 class="widget-title">Tin khác</h2>
                </div>
                <div class="col-6 text-right align-self-center">
                  {" "}
                  <Link
                    to={{
                      pathname: "/view-all",
                      state: { status: 3, title: "Tin khác" },
                    }}
                    className="see_all mb20"
                  >
                    <b>Xem tất cả</b>
                  </Link>
                </div>
              </div>
              <TitleBreakLine />
              <OtherNews />
            </div>
            {/* **************************************  */}
          </div>
        </div>
      </div>
    </section>
  );
}
