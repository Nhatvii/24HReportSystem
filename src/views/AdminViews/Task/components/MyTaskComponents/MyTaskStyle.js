import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background: rgb(245, 246, 247);
  height: 100%;
  margin: auto;
`;
export const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 23rem;
  height: 100%;
  border-radius: 7px;
  background-color: #fff;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
`;
export const Option = styled.div`
  padding: 10px;
  border-bottom: 1px solid lightgray;
  span {
    font-size: 1.2rem;
    font-weight: 600;
    padding-left: 1rem;
  }
  :hover {
    cursor: pointer;
    color: #632eb8;
    font-size: 1.4rem;
  }
  #number {
    float: right;
    color: gray;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100rem;
  height: 100%;
  border-radius: 7px;
  background-color: #fff;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 2rem;
  margin-left: 1rem;
  margin-right: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;
