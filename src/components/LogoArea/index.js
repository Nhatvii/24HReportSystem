import React from "react";
import { Link } from "react-router-dom";
import tp_banner from "../../doc/img/bg/banner.jpg";

const LogoArea = ({ className, dark }) => {
  return (
    <div className={`logo_area ${className ? className : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 align-self-center">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/209/7405193209_dafd8c3c-9a54-4e9e-87b7-9b4257430f5e.png?cb=1654526260"
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-10 align-self-center">
            <div className="banner1">
              <Link to="#">
                <img src={tp_banner} alt="banner" height="160" width="1082" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoArea;
