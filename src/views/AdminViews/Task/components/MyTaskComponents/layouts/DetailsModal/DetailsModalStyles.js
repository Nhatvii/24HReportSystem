import styled from "styled-components";

export const ModalContainer = styled.div`
  display: ${(props) => props.visible};
  opacity: ${(props) => props.opacity};
  justify-content: left;
  margin-top: -10rem;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: 0.2s opacity ease-in-out;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50rem;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 7px;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.translate};
  transition: 0.2s ease-in-out;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const HeaderTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;
  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 80%;
    height: 1px;
    background-color: gray;
    ::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 1px;
      left: 0;
      background-color: gray;
      transform: rotate(90deg);
    }
  }
`;

export const Separator = styled.aside`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 20px 0;
`;

export const ChangeSection = styled.div``;

export const DescriptionContainer = styled.div`
  position: flex;
`;

export const ProrityButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.activeBackground};
  color: ${(props) => props.activeForeground};
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  margin: 20px 0;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

export const ProrityWrapper = styled.div`
  display: ${(props) => props.display};
  width: 100%;
  height: auto;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  background-color: #fff;
`;

export const SubmitButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) =>
    props.typeCSS === "close" ? "lightgray" : "#632eb8"};
  color: ${(props) => (props.typeCSS === "close" ? "#000" : "#fff")};
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  margin-right: ${(props) => (props.typeCSS === "close" ? "20px" : "0")};
  text-transform: capitalize;
  padding: 10px;
  transition: 0.2s ease-in-out;
  :hover {
    background-color: ${(props) =>
      props.typeCSS === "close" ? "gray" : "#b789ff"};
  }
`;
