import React, { Component } from "react";
class Page404 extends Component {
  render() {
    return (
      <section class="error__page pb-90">
        <div class="container">
          <div class="error__text text-center">
            <h1>404</h1>
            <h3>'Ấy... Có vẻ trang này không tồn tại!'</h3>
            <h4>Ây da! Trang này không tồn tại hoặc đã bị xóa</h4>
            <div class="go-back-btn mt-50">
              <a class="thm-btn thm-btn__main" href="home_url( '/' )">
                Về trang chủ
                <i class="fa fa-long-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Page404;
