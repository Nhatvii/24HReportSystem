import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: none;
  @media (max-width: 600px) {
    position: fixed;
    z-index: 2;
    display: fixed;
  }
`;

export const SlickBar = styled.ul`
  color: white;
  bottom: 0;
  justify-content: space-between;
  height: 7vh;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border: 1px solid silver;
  padding: 1rem 0;
  margin-bottom: 0;
  position: fixed;
  width: 100%;
  transition: all 0.5s ease;
  border-radius: 10px 10px 0px 0px;
`;

export const Item = styled(NavLink)`
  text-decoration: none;
  color: blue;
  width: 100%;
  padding: 1vh 0;
  cursor: pointer;
  display: flex;
  padding-left: 1.5rem;
  padding-top: 1rem;
`;
export const Number = styled.p`
  text-decoration: none;
  color: black;
  width: 100%;
  padding: 1vh 0;
  cursor: pointer;
  display: flex;
  padding-top: 0;
  padding-left: 1.25rem;
`;
export const Text = styled.p`
  width: 100%;
  overflow: hidden;
  margin-left: 0;
  transition: all 0.3s ease;
`;
export const PostData = styled.div`
  background-color: #fff;
  backdrop-filter: blur(5px);
  width: 45vw;
  height: 100%;
  display: block;
  justify-content: start;
  align-items: left;
  padding: 2rem;
  overflow: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  margin-top: 1rem;
  margin-right: 2rem;
  border-radius: 10px 10px 10px 10px;
  img {
    width: 40vw;
    height: 30vw;
  }
  h3 {
    font-size: 3rem;

    color: black!;
    font-weight: bold;
  }
  @media (max-width: 1500px) {
    width: 70vw;
    height: 100vh;
    display: block;
    justify-content: start;
    align-items: left;
    padding-left: 6rem;
    padding-right: 5rem;
    padding-top: 2rem;
    margin-left: 4rem;
    img {
      width: 50vw;
      height: 40vw;
    }
    h1 {
      font-size: 2rem;
      background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  @media (max-width: 1200px) {
    width: 93vw;
    height: 100vh;
    display: block;
    justify-content: start;
    align-items: left;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2rem;
    margin-left: 3rem;
    img {
      width: 60vw;
      height: 40vw;
    }
    h1 {
      font-size: 2rem;
      background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  @media (max-width: 600px) {
    width: 85vw;
    height: 100vh;
    display: block;
    justify-content: start;
    align-items: left;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2rem;
    margin-left: 2rem;
    img {
      width: 60vw;
      height: 40vw;
    }
    h1 {
      font-size: 2rem;
      background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
export const CommentArea = styled.div`
  background-color: #fff;
  backdrop-filter: blur(5px);
  width: 25vw;
  height: 55rem;
  display: inline-block;
  justify-content: start;
  align-items: left;
  padding: 1rem;
  margin: 1rem;
  border-radius: 15px 15px 15px 15px;

  @media (max-width: 1500px) {
    height: 90%;
    width: 95%;
    justify-content: start;
    align-items: left;
    margin: 0.5rem;
  }
  @media (max-width: 1200px) {
    width: 95%;
    justify-content: start;
    align-items: left;
    padding: 2rem;
    margin: 3rem;
    margin-top: 1rem;
  }
  @media (max-width: 600px) {
    width: 88%;
    height: 95%;
    justify-content: start;
    align-items: left;
    padding: 1rem;
    margin-left: 2rem;
    margin-top: 1rem;
  }
`;
export const OtherView = styled.div`
  width: 100vw;
  height: 100%;
  display: inline-block;
  justify-content: start;
  align-items: left;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 3rem;
  h1 {
    font-size: 2rem;
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (max-width: 1500px) {
    padding-top: 3rem;
    padding-left: 5rem;
    padding-right: 5rem;
    padding-top: 2rem;
  }
  @media (max-width: 1200px) {
    padding-top: 3rem;
    padding-left: 4rem;
    padding-right: 3rem;
    padding-top: 2rem;
  }
`;
export const CommentScrollbar = styled.div`
  overflow: auto;
  height: 40vh;
  scroll-behavior: smooth;
  background-color: #fff;
  padding: 0.5rem;
  padding-top: 0.5rem;
  border-radius: 15px 15px 15px 15px;
`;
export const AddComment = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 10px;
  width: 100%;
  .user-image {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
export const CommentSection = styled.div`
  display: flex;
  margin: 8px 0;

  .user-image {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    font-weight: 600;
    margin-bottom: 4px;
    display: inline;
  }
  .date {
    display: inline;
    color: grey;
  }
  .comment-actions {
    margin-top: 4px;
    button {
      margin-left: 8px;
    }
  }
  .comment {
    display: block;
  }
  .settings {
    margin-top: 4px;
  }
  .delete {
    display: inline;
    margin-right: 1rem;
    color: red;
    :hover {
      cursor: pointer;
    }
  }
  .modify {
    display: inline;
    color: blue;
    :hover {
      cursor: pointer;
    }
  }
`;
export const InputsContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const PseudoText = styled.span`
  position: absolute;
  right: 20px;
  bottom: 10px;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: darkgray;
`;
