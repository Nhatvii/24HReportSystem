import styled from "styled-components";

export const RadioContainer = styled.div`
  font-size: 0.8rem;
  padding: 0 20px;
`;

export const RadioWrapper = styled.div`
  text-transform: capitalize;
  color: primary;
  margin: 13px 0;
  font-size: 1rem;
  label {
    display: block;
    position: relative;
    cursor: pointer;
    padding-left: 20px;
    input[type="radio"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      :checked ~ span:nth-of-type(2) {
        background-color: black;
        border-color: gray;
        ::after {
          display: block;
        }
      }
    }
    span:nth-of-type(1) {
      padding-left: 13px;
    }
    span:nth-of-type(2) {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: transparent;
      border: 1px solid var(--darkGrayColour);
      border-radius: 50%;
      transition: 0.2s;
      ::after {
        content: "";
        position: absolute;
        display: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: white;
      }
    }
  }
`;
