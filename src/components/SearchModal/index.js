import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SuggestionPost from "../SuggestionPost";
import FontAwesome from "../uiStyle/FontAwesome";
import UserHistoryList from "./components";
const initialHistoryList = [
  {
    id: 0,
    title: "ngân hàng",
  },
  {
    id: 1,
    title: "tour du lịch giá rẻ",
  },
  {
    id: 2,
    title: "ứng dụng",
  },
  {
    id: 3,
    title: "bán hàng online",
  },
  {
    id: 4,
    title: "ma túy",
  },
];
const SearchModal = ({ searchShow, setSearchShow }) => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("Kết quả tìm kiếm của #" + search);
  const [historyList, setHistoryList] = useState([]);
  const [autoSearch, setAutoSearch] = useState(false);
  const submitHandler = (e) => {
    console.log("3");
    e.preventDefault();
    setSearch("");
  };
  const _handleKeyDown = (e) => {
    console.log("2");
    if (e.key === "Enter") {
      document.getElementById("search").click();
      setSearchShow(false);
      historyList.push({ id: uuid(), title: search });
      localStorage.setItem("search-history-list", JSON.stringify(historyList));
    }
  };
  const handleSearch = () => {
    document.getElementById("search").click();
    setSearchShow(false);
    setAutoSearch(false);
    historyList.push({ id: uuid(), title: search });
    localStorage.setItem("search-history-list", JSON.stringify(historyList));
  };
  const handleInputChange = (e) => {
    setTitle("Kết quả tìm kiếm của #" + e);
    setSearch(e);
  };
  const handleSelectSearch = (e) => {
    setTitle("Kết quả tìm kiếm của #" + e);
    setSearch(e);
    setAutoSearch(true);
  };
  useEffect(() => {
    if (autoSearch) {
      handleSearch();
    }
  });
  useEffect(() => {
    if (!(localStorage.getItem("search-history-list") === null))
      setHistoryList(JSON.parse(localStorage.getItem("search-history-list")));
  }, []);
  const onDeleteHistoryItem = (id) => {
    const filteredHistoryList = historyList.filter(
      (eachHistoryItem) => eachHistoryItem.id !== id
    );
    setHistoryList(filteredHistoryList);
    localStorage.setItem(
      "search-history-list",
      JSON.stringify(filteredHistoryList)
    );
  };
  return (
    <div className="searching active">
      <div className="container">
        <div className="row">
          <div className="col-11 text-center mt-5">
            <div className="v1search_form">
              <form onSubmit={submitHandler}>
                <input
                  value={search}
                  onChange={(e) => handleInputChange(e.target.value)}
                  type="search"
                  placeholder="Tìm kiếm..."
                  onKeyDown={(e) => _handleKeyDown(e)}
                />
                <Link
                  id="search"
                  to={{
                    pathname: "/search",
                    state: { title: title, SearchContent: search },
                  }}
                />
              </form>
            </div>
          </div>
          <div className="col-1 text-center mt-5 pt-2 btn btn-primary">
            <div onClick={() => handleSearch(search)}>
              <div className="single_social social_vimeo">
                <span className="follow_icon mr-2">
                  <FontAwesome name="search" />
                </span>
                <span className="icon_text h4">Tìm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pt-2">
              <h4>
                <b className="text-white">Gần đây</b>
              </h4>
            </div>
            {historyList.length > 0 ? (
              <ul className="history-list">
                {historyList.slice(-5).map((eachHistoryItem) => (
                  <UserHistoryList
                    historyListDetails={eachHistoryItem}
                    key={eachHistoryItem.id}
                    onDeleteHistoryItem={onDeleteHistoryItem}
                    handleSelectSearch={handleSelectSearch}
                  />
                ))}
              </ul>
            ) : (
              <div className="h4 text-secondary text-center">
                Lịch sử tìm kiếm không có gì
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pt-2">
              <h4>
                <b className="text-white">Tìm kiếm phổ biến</b>
              </h4>
            </div>
            <ul className="history-list">
              {initialHistoryList.map((eachHistoryItem) => (
                <UserHistoryList
                  historyListDetails={eachHistoryItem}
                  key={eachHistoryItem.id}
                  handleSelectSearch={handleSelectSearch}
                  isPopular={true}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="pt-2">
            <SuggestionPost
              data={JSON.parse(localStorage.getItem("carousel-post"))}
            />
          </div>
        </div>
      </div>
      <div
        className="close_btn"
        style={{ borderRadius: "50%" }}
        onClick={() => setSearchShow(false)}
      >
        <FontAwesome name="times" />
      </div>
    </div>
  );
};

export default SearchModal;
