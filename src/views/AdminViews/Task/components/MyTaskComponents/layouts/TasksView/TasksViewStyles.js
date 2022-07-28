import styled from "styled-components";

export const TasksContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  max-height: 80vh;
  overflow-y: auto;
`;

export const SingleTask = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  width: calc(100% - 20px);
  background-color: transparent;
  border: none;
  align-items: left;
  font-size: 1.1rem;
  margin: 6px 10px;
  color: black;
  border-bottom: 1px solid lightgray;
  margin-bottom: 1rem;
  padding: 15px;
  opacity: ${(props) => props.taskFinish || 1};
  :hover {
    background-color: var(--lightGrayColour);
    border-radius: 7px;
  }
`;

export const TaskTitle = styled.div`
  flex-basis: 20%;
  text-align: left;
  text-decoration: ${(props) => props.taskFinish || "none"};
  color: ${(props) =>
    props.taskFinish === "line-through" ? "lightgray" : "black"};
  :hover {
    cursor: pointer;
  }
`;

export const TaskPriority = styled.div`
  margin-left: 2px;
  flex-basis: 10%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: left;
  span:nth-child(1) {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: 15px;
    background-color: ${(props) => props.priorityColour};
  }
  span:nth-child(2) {
    text-transform: capitalize;
  }
  @media only screen and (max-width: 777px) {
    font-size: 0;
    flex-basis: 10%;
  }
`;

export const TaskDate = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 10%;
  font-size: 0.9rem;
  align-items: center;
  color: gray;
  text-align: left;
`;
export const DeadlineDate = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 10%;
  font-size: 0.9rem;
  align-items: center;
  font-weight: bold;
  color: red;
  text-align: left;
`;
