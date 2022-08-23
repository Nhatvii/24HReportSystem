import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

export const Box = styled.div`
  padding-top: 6rem;
  background: #0081fe;
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: center;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Container = styled.div`
  background: white;
  max-width: 100%;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
class UserFooter extends Component {
  render() {
    // eslint-disable-next-line
    return (
      <footer className="kilimanjaro_area">
        <div className="foo_top_header_one section_padding_100_70">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="kilimanjaro_part">
                  <h5>About Us</h5>
                  <p>Thông tin cơ bản của trang web</p>
                </div>
                <div className="kilimanjaro_part m-top-15">
                  <h5>Social Links</h5>
                  <ul className="kilimanjaro_social_links">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>{" "}
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>{" "}
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest" aria-hidden="true"></i>{" "}
                        Pinterest
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-youtube" aria-hidden="true"></i>{" "}
                        YouTube
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>{" "}
                        Linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="kilimanjaro_part">
                  <h5>Tags Widget</h5>
                  <ul className=" kilimanjaro_widget">
                    <li>
                      <a href="#">classNamey</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Creative</a>
                    </li>
                    <li>
                      <a href="#">One Page</a>
                    </li>
                    <li>
                      <a href="#">Multipurpose</a>
                    </li>
                    <li>
                      <a href="#">Minimal</a>
                    </li>
                    <li>
                      <a href="#">classNameic</a>
                    </li>
                    <li>
                      <a href="#">Medical</a>
                    </li>
                  </ul>
                </div>

                <div className="kilimanjaro_part m-top-15">
                  <h5>Important Links</h5>
                  <ul className="kilimanjaro_links">
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        About Licences
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        Help & Support
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        Community & Forum
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="kilimanjaro_part">
                  <h5>Latest News</h5>
                  <div className="kilimanjaro_blog_area">
                    <div className="kilimanjaro_thumb">
                      <img
                        className="img-fluid"
                        src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg"
                        alt=""
                      />
                    </div>
                    <a href="#">Your Blog Title Goes Here</a>
                    <p className="kilimanjaro_date">21 Jan classNameName2022</p>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                  <div className="kilimanjaro_blog_area">
                    <div className="kilimanjaro_thumb">
                      <img
                        className="img-fluid"
                        src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg"
                        alt=""
                      />
                    </div>
                    <a href="#">Your Blog Title Goes Here</a>
                    <p className="kilimanjaro_date">21 Jan 2022</p>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                  <div className="kilimanjaro_blog_area">
                    <div className="kilimanjaro_thumb">
                      <img
                        className="img-fluid"
                        src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg"
                        alt=""
                      />
                    </div>
                    <a href="#">Your Blog Title Goes Here</a>
                    <p className="kilimanjaro_date">21 Jan 2022</p>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="kilimanjaro_part">
                  <h5>Quick Contact</h5>
                  <div className="kilimanjaro_single_contact_info">
                    <h5>Phone:</h5>
                    <p>
                      +0123456789 <br /> +0987654321
                    </p>
                  </div>
                  <div className="kilimanjaro_single_contact_info">
                    <h5>Email:</h5>
                    <p>
                      support@email.com <br /> company@email.com
                    </p>
                  </div>
                </div>
                <div className="kilimanjaro_part">
                  <h5>Latest Works</h5>
                  <div className="kilimanjaro_works">
                    <a
                      className="kilimanjaro_works_img"
                      href="img/gallery/1.jpg"
                    >
                      <img src="img/gallery/1.jpg" alt="" />
                    </a>
                    <a
                      className="kilimanjaro_works_img"
                      href="img/gallery/4.jpg"
                    >
                      <img src="img/gallery/4.jpg" alt="" />
                    </a>
                    <a
                      className="kilimanjaro_works_img"
                      href="img/gallery/5.jpg"
                    >
                      <img src="img/gallery/5.jpg" alt="" />
                    </a>
                    <a
                      className="kilimanjaro_works_img"
                      href="img/gallery/7.jpg"
                    >
                      <img src="img/gallery/7.jpg" alt="" />
                    </a>
                    <a
                      className="kilimanjaro_works_img"
                      href="img/gallery/10.jpg"
                    >
                      <img src="img/gallery/10.jpg" alt="" />
                    </a>
                    <a
                      className="kilimanjaro_works_img"
                      href="img/gallery/11.jpg"
                    >
                      <img src="img/gallery/11.jpg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" kilimanjaro_bottom_header_one section_padding_50 text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>
                  © All Rights Reserved by{" "}
                  <a href="#">
                    Report 24h<i className="fa fa-love"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default UserFooter;
