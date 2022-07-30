import React from "react";
import styled from "styled-components";
const Header = styled.div`
  h4 {
    display: inline-block;
    margin-right: 16px;
  }
`;
export function CommentsHeader(props) {
  return (
    <Header>
      <h4>{props.amountComments} Bình luận</h4>
      {/* <Button basic compact icon labelPosition="left">
        <Icon name="align left" />
        Lọc
      </Button> */}
    </Header>
  );
}
