import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
export default function SideTab() {
  const [key, setKey] = useState("one");

  return (
    <>
      <Tabs id="tinyTab" activeKey={key} onSelect={(e) => setKey(e)}>
        <Tab
          eventKey="one"
          title="Xu hướng"
          style={{
            overflow: "auto",
            height: "47rem",
            scrollBehavior: "smooth",
          }}
        >
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
        </Tab>
        <Tab eventKey="recommended" title="Gợi ý cho bạn">
          <p>reccomended news</p>
        </Tab>
        <Tab eventKey="popular" title="Nổi bật">
          <p>Popular news here</p>
        </Tab>
      </Tabs>
    </>
  );
}
