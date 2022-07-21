import React, { Component } from "react";
class UserFooter extends Component {
  render() {
    // eslint-disable-next-line
    return (
      <footer class="footer footer-bg pt-110">
        <div class="container">
          <div class="footer__main pb-100">
            <div class="row mt-none-40">
              <div class="footer__widget col-lg-3 col-md-6 mt-40">
                <div class="footer__logo mb-20">
                  <a class="footer__logo mb-20" href="/">
                    <img
                      src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/209/7405193209_dafd8c3c-9a54-4e9e-87b7-9b4257430f5e.png?cb=1654526260"
                      alt="Report 24h Logo"
                    />
                  </a>
                </div>
                <div class="apps-img mt-25 ul_li">
                  <div class="app mt-15">
                    <a href="<?php echo esc_url($app['app_Store_link']);?>">
                      <img src="" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer__bottom ul_li_center">
            <div class="footer__copyright mt-15">
              © 2022 Magezix . All Rights Reserved
            </div>

            <div class="footer__social mt-15">
              <a href="">
                <i class="f_icon"></i>
              </a>
            </div>

            <div class="footer__links mt-15">
              <a href=""></a>

              <a href=""></a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default UserFooter;
