import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import categoryApi from "../../../../api/categoryApi";
import { LabelSmall } from "./styles";
const styles = {
  borderRadius: "25px",
  fontSize: "10px",
  padding: "3px",
  boxShadow: "1px 1px rgba(0, 0, 0, 30%)",
  marginLeft: "1rem",
  fontWeight: "bold",
};
const TrendingHashTag = () => {
  const [categoryList, setCategoryList] = useState([]);
  async function loadCategory() {
    try {
      const params = {};
      const response = await categoryApi.getAllSub(params);
      console.log(response);
      setCategoryList(response);
    } catch (e) {
      alert(e.message);
    }
  }
  useEffect(() => {
    loadCategory();
  }, []);
  return (
    <Row className="pl-3 align-center">
      <LabelSmall>Từ khóa nổi bật:</LabelSmall>
      {categoryList.length > 0 &&
        categoryList.map((category) => (
          <Link
            style={styles}
            color="#d9d7d9"
            to={{
              pathname: "/view-all",
              state: {
                categoryID: category.categoryId,
                title: "Tin liên quan đến #" + category.subCategory,
              },
            }}
          >
            #{category.subCategory}
          </Link>
        ))}
    </Row>
  );
};
export default TrendingHashTag;
