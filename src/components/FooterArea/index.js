import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterCopyright from "../FooterCopyright";
import FontAwesome from "../uiStyle/FontAwesome";

const FooterArea = ({ className }) => {
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setEmail("");
  };
  return (
    <div className={`footer footer_area1 ${className ? className : ""}`}>
      <div className="container">
        <div className="cta">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <div>
                <h1 style={{ color: "white" }}>Report 24h</h1>
              </div>
              <div className="social2">
                <ul className="inline">
                  <li>
                    <Link to="#">
                      <FontAwesome name="twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="youtube-play" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <FontAwesome name="instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-lg-2 align-self-center">
              <div className="signup_form">
                <form onSubmit={submitHandler}>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="signup"
                    type="email"
                    placeholder="Email nhận tin"
                  />
                  <button type="submit" className="cbtn">
                    Theo dõi
                  </button>
                </form>
                <p>Nhận tin mới nhất qua email</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border_white" />
      </div>
      <FooterCopyright />
    </div>
  );
};

export default FooterArea;
