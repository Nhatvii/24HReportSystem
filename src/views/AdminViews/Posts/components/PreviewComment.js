import React from "react";
import { LikeShareSection } from "../../../UserViews/Post/components/LikeShareSection";
import LetteredAvatar from "react-lettered-avatar";
import {
  AddComment,
  CommentSection,
  InputsContainer,
  PseudoText,
} from "../../../UserViews/Post/components/styles";
import { CommentsHeader } from "../../../UserViews/Post/components/CommentsHeader";
import { CFormTextarea } from "@coreui/react-pro";
import { Button } from "reactstrap";

const MIN_LENGTH_DESCRIPTION = 10;
const MAX_LENGTH_DESCRIPTION = 100;
export function PreviewComment(props) {
  return (
    <div>
      <LikeShareSection
        postId="0a857f92-91b5-4584-a985-e86fcf43c516"
        title={props.title}
        numberOfComments={123}
        numberOfShares={123}
      />
      <CommentsHeader />
      <AddComment>
        <LetteredAvatar
          name="Test"
          className=""
          size={25}
          radius={100}
          color="#fff"
          backgroundColor="#000"
        />
        <InputsContainer>
          <CFormTextarea
            autoFocus
            rows="2"
            className="input-lg w-200 mb-1 pl-2 ml-2"
            type="text"
            id="comment"
            value="Preview comment"
            placeholder="Viết bình luận..."
            minLength={MIN_LENGTH_DESCRIPTION}
            maxLength={MAX_LENGTH_DESCRIPTION}
          />
          <PseudoText>0/{MAX_LENGTH_DESCRIPTION}</PseudoText>
        </InputsContainer>
      </AddComment>

      <Button
        style={{
          background: "linear-gradient(to right,#56CCF2,#2F80ED)",
          color: "white",
          float: "right",
          paddingRight: "1rem",
        }}
      >
        Gửi
      </Button>

      <br />

      <h5>Bình luận</h5>
      <CommentSection>
        <LetteredAvatar
          name="Test"
          style={{ display: "inline-block" }}
          size={40}
          radius={100}
          color="#fff"
          backgroundColor="#000"
        />
        <div className="ml-2">
          <div className="comment-actions">
            <div className="user-name">Preview user</div>{" "}
            <div className="date">- vài giây trước</div>
            <div
              className="comment"
              style={{ overflowWrap: "break-word", width: "25rem" }}
            >
              Preview comment
            </div>
          </div>
        </div>
      </CommentSection>
    </div>
  );
}
