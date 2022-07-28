import React from "react";

const NewsLetter = ({ className, input_white, titleClass }) => {
  return (
    <div
      className={`box widget news_letter mb30 ${className ? className : ""}`}
    >
      <h2 className={`widget-title ${titleClass}`}>Đăng kí tin tức</h2>
      <p>Email của bạn sẽ nhận được tin tức mới nhất của chúng tôi .</p>
      <div className="space-20" />
      <div className="signup_form">
        <form>
          <input
            className={`signup ${input_white ? "white_bg" : ""}`}
            type="email"
            placeholder="Email của bạn"
          />
          <button type="button" className="cbtn">
            Đăng kí
          </button>
        </form>
        <div className="space-10" />
      </div>
    </div>
  );
};

export default NewsLetter;
