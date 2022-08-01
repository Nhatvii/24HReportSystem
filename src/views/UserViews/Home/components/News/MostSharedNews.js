import React, { useEffect, useState } from "react";
import postApi from "../../../../../api/postApi";
const limit = 25;

export default function MostSharedNews() {
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
      <div class="row pb-2">
        <div class="col-xl-3 col-sm-3 ">
          <img
            src="https://storage.googleapis.com/pik-buk/inspitrip/2019_c29adcbb-8eb4-4a57-810b-5040097dfedf.jpg?w=800"
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-xl-9 col-sm-9 pl-3">
          <span> Fraud / 23.05.2022</span>
          <h6 class="h6 mt-1">Test title</h6>
        </div>
      </div>
      <div class="row pb-2">
        <div class="col-xl-3 col-sm-3 ">
          <img
            src="https://storage.googleapis.com/pik-buk/inspitrip/2019_c29adcbb-8eb4-4a57-810b-5040097dfedf.jpg?w=800"
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-xl-9 col-sm-9 pl-3">
          <span> Fraud / 23.05.2022</span>
          <h6 class="h6 mt-1">Test title</h6>
        </div>
      </div>
      <div class="row pb-2">
        <div class="col-xl-3 col-sm-3 ">
          <img
            src="https://storage.googleapis.com/pik-buk/inspitrip/2019_a673faf2-4626-4262-8edd-a5fef4689879.jpg?w=800"
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-xl-9 col-sm-9 pl-3">
          <span> Telephone fraud / 23.05.2022</span>
          <h6 class="h6 mt-1">Test title 2</h6>
        </div>
      </div>
      <div class="row pb-2">
        <div class="col-xl-3 col-sm-3 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgolBdeaXdt7hZ4G28YiA8shOCg4jkBg08uA&usqp=CAU"
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-xl-9 col-sm-9 pl-3">
          <span> Accident / 23.05.2022</span>
          <h6 class="h6 mt-1">Test title 3</h6>
        </div>
      </div>
      <div class="row pb-2">
        <div class="col-xl-3 col-sm-3 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFrulB6fJD8ypW94qO4gfj-qqxPtTjDznsZA&usqp=CAU"
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-xl-9 col-sm-9 pl-3">
          <span> Thief / 23.05.2022</span>
          <h6 class="h6 mt-1">Test title 4</h6>
        </div>
      </div>
      <div class="row pb-2">
        <div class="col-xl-3 col-sm-3 ">
          <img
            src="https://storage.googleapis.com/pik-buk/inspitrip/2019_c29adcbb-8eb4-4a57-810b-5040097dfedf.jpg?w=800"
            width="100%"
            height="100%"
          />
        </div>
        <div class="col-xl-9 col-sm-9 pl-3">
          <span> Fraud / 23.05.2022</span>
          <h6 class="h6 mt-1">Test title</h6>
        </div>
      </div>
    </>
  );
}
