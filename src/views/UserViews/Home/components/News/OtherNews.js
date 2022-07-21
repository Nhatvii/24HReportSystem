import React, { useEffect, useState } from "react";
import postApi from "../../../../../api/postApi";
const limit = 25;

export default function OtherNews() {
  const [posts, setPosts] = useState([]);

  const fetchPostList = async () => {
    try {
      const params = { isRecentDate: true, Status: 3 };
      const response = await postApi.getAll(params);
      console.log(response);
      setPosts(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostList();
  }, []);
  return (
    <>
      <div className=".hero-bsns-content col-size">
        <div className="row">
          <div className="col">
            <img
              src="https://cdn-imgix.headout.com/tour/28481/TOUR-IMAGE/2bbd5c6c-e3dc-4dc4-b4d5-11c94baad3e3-15133-dubai-combo-img-worlds-of-adventure---free-burj-khalifa-at-the-top-with-coffee-06.JPG"
              width="100"
              height="80"
            />
          </div>
          <div className="col">
            <span>Technology / 23.07.2021</span>
            <h6 className="h6 mt-1"></h6>
          </div>
        </div>
      </div>
      <div className=".hero-bsns-content col-size">
        <div className="row">
          <div className="col">
            <img
              src="https://quomodosoft.com/html/newsprk/assets/img/flag/match1.png"
              width="100"
              height="80"
            />
          </div>
          <div className="col">
            <span>Tommorow / 23.07.2021</span>
            <h6 className="h6 mt-1">Germany VS France</h6>
          </div>
        </div>
      </div>
      <div className=".hero-bsns-content col-size">
        <div className="row">
          <div className="col">
            <img
              src="https://cdn-imgix.headout.com/tour/28481/TOUR-IMAGE/2bbd5c6c-e3dc-4dc4-b4d5-11c94baad3e3-15133-dubai-combo-img-worlds-of-adventure---free-burj-khalifa-at-the-top-with-coffee-06.JPG"
              width="100"
              height="80"
            />
          </div>
          <div className="col">
            <span>Tommorow / 23.07.2021</span>
            <h6 className="h6 mt-1">Germany VS France</h6>
          </div>
        </div>
      </div>
      <div className=".hero-bsns-content col-size">
        <div className="row">
          <div className="col">
            <img
              src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg"
              width="100"
              height="80"
            />
          </div>
          <div className="col">
            <span>Tommorow / 23.07.2021</span>
            <h6 className="h6 mt-1">Germany VS France</h6>
          </div>
        </div>
      </div>
      <div className=".hero-bsns-content col-size">
        <div className="row">
          <div className="col">
            <img
              src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg"
              width="100"
              height="80"
            />
          </div>
          <div className="col">
            <span>Tommorow / 23.07.2021</span>
            <h6 className="h6 mt-1">Germany VS France</h6>
          </div>
        </div>
      </div>
    </>
  );
}
