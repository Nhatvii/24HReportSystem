import React, { useRef } from "react";
import { Col, Row } from "reactstrap";
import { Comments } from "./components/Comments";
import { PostDataDetail } from "./components/PostDataDetail";
import { OtherPosts } from "./components/OtherPosts";
import {
  CommentArea,
  Container,
  Item,
  Number,
  OtherView,
  PostData,
  SlickBar,
  Text,
} from "./components/styles";

const PostDetail = (props) => {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  return (
    <div>
      <Container>
        <SlickBar>
          <Item exact to="#" onClick={executeScroll}>
            <i className="icon-like" />
            <Number>
              <Text></Text>
            </Number>
          </Item>
          <Item to="#" onClick={executeScroll}>
            <i className="icon-bubble" />
            <Number>
              <Text></Text>
            </Number>
          </Item>
          <Item to="#" onClick={executeScroll}>
            <i className="icon-share" />
            <Number>
              <Text></Text>
            </Number>
          </Item>
        </SlickBar>
      </Container>
      <Row style={{ paddingLeft: "15rem", paddingRight: "15rem" }}>
        <Col>
          <PostData>
            <PostDataDetail postId={props.match.params.id} />
          </PostData>
        </Col>
        <Col>
          <CommentArea ref={myRef}>
            <Comments className="comments" postId={props.match.params.id} />
          </CommentArea>
        </Col>
      </Row>
      <OtherView>
        <OtherPosts />
      </OtherView>
    </div>
  );
};

export default PostDetail;
