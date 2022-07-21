import React, { useEffect, useState } from "react";
import { Markup } from "interweave";
import moment from "moment";
import "moment/locale/vi";
export function PreviewDetail(props) {
  return (
    <div className="mb-1">
      <h3 className="h3">{props.title ? props.title : "Tiêu đề bài viết"}</h3>
      <h5 className="h5 text-muted">
        viết bởi <b>{JSON.parse(localStorage.getItem("user_info")).email}</b>{" "}
        lúc {moment().format("dddd, Do MMMM YYYY, h:mm:ss")}
      </h5>
      <div>
        <div style={{ whiteSpace: "pre-wrap" }}>
          <Markup
            allowAttributes
            allowElements
            content={JSON.stringify(props.text)
              .replace(
                "<img",
                '<img style="width:55rem;height:30rem;margin-left: auto; margin-right: auto;display:block"'
              )
              .replace(
                "<iframe",
                '<iframe style="width:55rem;height:30rem;margin-left: auto; margin-right: auto"'
              )
              .replace(/\\n/g, "<br/>")
              .replace(/\\/g, "")
              .substring(1, props.text.length)}
          />
        </div>
      </div>
    </div>
  );
}
