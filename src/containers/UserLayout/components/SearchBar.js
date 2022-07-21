import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass,
} from "./styles";
import React from "react";
import { Link } from "react-router-dom";
function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("Kết quả tìm kiếm của #" + searchValue);
  const showSearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      document.getElementById("search").click();
      // window.location.reload();
      console.log("enter");
    }
  };
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showSearchInput}
    >
      <SearchInput
        ref={targetRef}
        showSearchInput={showSearchInput}
        value={searchValue}
        placeholder="Nhập từ khóa tìm kiếm"
        onChange={(e) => (
          setSearchValue(e.target.value),
          setTitle("Kết quả tìm kiếm của #" + e.target.value)
        )}
        onKeyDown={(e) => _handleKeyDown(e)}
      />
      {showSearchInput ? (
        <>
          <IconRightArrow
            onClick={() => document.getElementById("search").click()}
          />
          <Link
            id="search"
            to={{
              pathname: "/view-all",
              state: { title: title, SearchContent: searchValue },
            }}
          />
        </>
      ) : (
        <IconMagnifyingGlass />
      )}
    </Container>
  );
}

export default Search;
