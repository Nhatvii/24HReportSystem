import React, { useEffect, useState } from "react";
import postApi from "../../../../../api/postApi";
const limit = 25;

export default function EmergencyNews() {
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
      <div className="row mb-2">
        <div className="col-sm-6 col-md-6 col-lg-6">
          <img
            src="https://cdn-imgix.headout.com/tour/28481/TOUR-IMAGE/2bbd5c6c-e3dc-4dc4-b4d5-11c94baad3e3-15133-dubai-combo-img-worlds-of-adventure---free-burj-khalifa-at-the-top-with-coffee-06.JPG"
            className="card-img"
          />
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
          <h5>Copa America: from devastated US</h5>
          <p>
            The property, complete with 30-seat screening from room, a 100-seat
            amphitheater and a swimming pond with sandy shower…
          </p>
          <button className="btn btn-button">Xem chi tiết</button>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-sm-6 col-md-6 col-lg-6">
          <img
            src="https://cdn-imgix.headout.com/tour/28481/TOUR-IMAGE/2bbd5c6c-e3dc-4dc4-b4d5-11c94baad3e3-15133-dubai-combo-img-worlds-of-adventure---free-burj-khalifa-at-the-top-with-coffee-06.JPG"
            className="card-img"
          />
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
          <h5>Copa America: from devastated US</h5>
          <p>
            The property, complete with 30-seat screening from room, a 100-seat
            amphitheater and a swimming pond with sandy shower…
          </p>
          <button className="btn btn-button">Xem chi tiết</button>
        </div>
      </div>
    </>
  );
}
