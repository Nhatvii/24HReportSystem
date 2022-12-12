/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import React from "react";
import ImgAsset from "../../../assets/icons/index.js";
const UserHistoryList = (props) => {
  const {
    historyListDetails,
    onDeleteHistoryItem,
    handleSelectSearch,
    isPopular,
  } = props;
  const { title, id } = historyListDetails;
  const onDeleteHistory = () => {
    onDeleteHistoryItem(id);
  };
  return (
    <li className="history-list-item">
      <li onClick={() => handleSelectSearch(title)}>
        <div className="time-container">
          <div classNam="history-content-container">
            <div className="content-card">
              <p className="browser-title">
                {title.length > 13 ? title.slice(0, 14) + "..." : title}
              </p>
            </div>
          </div>
        </div>
      </li>
      {!isPopular && (
        <div className="history-delate-container">
          <button
            type="button"
            className="delete-button"
            onClick={onDeleteHistory}
            testid="delete"
          >
            <img
              className="browser-delete-icon"
              src={ImgAsset.delete}
              alt="Trash Can"
            ></img>
          </button>
        </div>
      )}
    </li>
  );
};

export default UserHistoryList;
