import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";

const SearchModal = ({ searchShow, setSearchShow }) => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("Kết quả tìm kiếm của #" + search);
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch("");
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      document.getElementById("search").click();
      setSearchShow(false);
      // window.location.reload();
    }
  };
  return (
    <div className="searching active">
      <div className="container">
        <div className="row">
          <div className="col-8 text-center m-auto">
            <div className="v1search_form">
              <form onSubmit={submitHandler}>
                <input
                  value={search}
                  onChange={(e) => (
                    setTitle("Kết quả tìm kiếm của #" + e.target.value),
                    setSearch(e.target.value)
                  )}
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
        </div>
      </div>
      <div className="close_btn" onClick={() => setSearchShow(false)}>
        <FontAwesome name="times" />
      </div>
    </div>
  );
};

export default SearchModal;
