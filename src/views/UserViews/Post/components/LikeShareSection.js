import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import styled from "styled-components";
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import emotionApi from "../../../../api/EmotionApi";
import postApi from "../../../../api/postApi";
import { OverlayTrigger, Popover } from "react-bootstrap";
import SocialShare from "./SocialShare";
import { toast } from "react-toastify";
//styled component
const Header = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;
const PostData = styled.div`
  padding-top: 0.5rem;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-evenly;
  font-size: medium;
  color: gray;
  padding: 0.25rem;
`;
const LikeData = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex: auto;
  p {
    padding-top: 0.5rem;
    margin-left: 5px;
    font-size: 12px;
  }
`;
const CommentShareData = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: auto;
  span {
    margin-right: 5px;
    font-size: 12px;
  }
`;
const PostOptions = styled.div`
  padding-top: 0.5rem;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-evenly;
  font-size: small;
  color: gray;
  cursor: pointer;
  padding: 0.25rem;
`;
const PostOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  :hover {
    background-color: #eff2f5;
    border-radius: 5px;
  }
  p {
    padding-top: 0.5rem;
    margin-left: 10px;
    font-size: small;
  }
`;
export function LikeShareSection(props) {
  const user_info = localStorage.getItem("user_info");
  const [_isLiked, _setIsLiked] = useState(false);
  const [_numberOfLikes, _setNumberOfLikes] = useState(null);
  const [url, setUrl] = useState(window.location.href);
  //Add view count of users to post
  const UpdateViewCount = async () => {
    try {
      const params = {
        postId: props.postId,
        userId: JSON.parse(user_info).email,
      };
      const response = await postApi.updateViewCount(params);
      console.log(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const LoadEmotion = async () => {
    try {
      const params = {
        postId: props.postId,
        userId: JSON.parse(user_info).email,
      };
      const response = await emotionApi.getEmotion(params);
      if (response.length === 0) {
        _setIsLiked(false);
      } else {
        _setIsLiked(response[0].emotionStatus);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const LoadNumberOfLike = async () => {
    try {
      const params = { postId: props.postId, emotionStatus: true };
      const response = await emotionApi.getNumberOfLike(params);
      console.log(response);
      if (response.length !== 0) {
        _setNumberOfLikes(response.length);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const Like = async () => {
    _setIsLiked(!_isLiked);
    _setNumberOfLikes(_isLiked ? _numberOfLikes - 1 : _numberOfLikes + 1);
    try {
      const params = {
        postId: props.postId,
        userId: JSON.parse(user_info).email,
      };
      const response = await emotionApi.sendEmotion(params);
      console.log(response);
      // if (response.statusCode === 200) {
      //   LoadEmotion();
      // }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (JSON.parse(user_info) !== null) {
      if (props.postId) UpdateViewCount();
      LoadEmotion();
    }
    LoadNumberOfLike();
  }, []);
  useEffect(() => {
    const timerId = setInterval(() => {}, 3000);

    return () => clearInterval(timerId);
  });
  return (
    <Header>
      <PostData>
        <LikeData>
          {_numberOfLikes !== null && (
            <>
              <span class="fa fa-stack small" style={{ verticalAlign: "top" }}>
                <i
                  class="fa fa-solid fa-circle fa-stack-2x"
                  style={{ color: "#1da1f2" }}
                ></i>
                <i
                  class="fa fa-solid fa-thumbs-up fa-stack-1x fa-inverse"
                  style={{ color: "#fff" }}
                ></i>
              </span>{" "}
              {_isLiked ? (
                _numberOfLikes === 1 ? (
                  <p>Bạn đã thích</p>
                ) : (
                  <p>Bạn và {_numberOfLikes - 1} người khác đã thích</p>
                )
              ) : _numberOfLikes === 0 ? (
                <p>Hãy là người đầu tiên thích</p>
              ) : (
                <p>{_numberOfLikes}</p>
              )}
            </>
          )}
        </LikeData>
        <CommentShareData>
          <span>{props.numberOfComments} bình luận</span>
          <span>{props.numberOfShares} chia sẻ</span>
        </CommentShareData>
      </PostData>
      <PostOptions>
        {JSON.parse(user_info) !== null ? (
          <PostOption onClick={() => Like()}>
            {_isLiked ? (
              <>
                <i class="fa fa-solid fa-thumbs-up" style={{ color: "blue" }} />
                <p>Đã Thích</p>
              </>
            ) : (
              <>
                <i class="fa fa-regular fa-thumbs-up" />
                <p>Thích</p>
              </>
            )}
          </PostOption>
        ) : (
          <PostOption onClick={() => (window.location.href = "/login")}>
            <>
              <i class="fa fa-regular fa-thumbs-up" />
              <p>Thích</p>
            </>
          </PostOption>
        )}

        <PostOption
          onClick={() =>
            JSON.parse(user_info) === null && (window.location.href = "/login")
          }
        >
          <i class="fa fa-solid fa-comment"></i>
          <p>Bình luận</p>
        </PostOption>
        <PostOption>
          <OverlayTrigger
            trigger={["click", "focus"]}
            placement="bottom"
            data-trigger="focus"
            overlay={
              <Popover id="popover-contained">
                <Popover.Header>Chia sẻ</Popover.Header>
                <Popover.Body>
                  <SocialShare
                    title={props.title}
                    url={url}
                    id={props.postId}
                  />
                </Popover.Body>
              </Popover>
            }
          >
            <div
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "gray",
                fontSize: "medium",
              }}
            >
              <PostOption>
                <i class="fa fa-solid fa-share"></i>
                <p>Chia sẻ</p>
              </PostOption>
            </div>
          </OverlayTrigger>
        </PostOption>
      </PostOptions>
    </Header>
  );
}
