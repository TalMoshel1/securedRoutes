import styled from "styled-components";
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  height: fit-content;
  transform: translatey(50%);
  display: flex;
  align-items: center;
  margin: 0.5rem;
  color: black !important;
  border-radius: 20px;
  &:focus {
    outline: 2px solid black;
  }
`;

export const InfoButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  right: 3rem;
  top: 0;
  padding: 0.5rem;
`;

export const ListContainer = styled.ul`
  flex-grow: 1;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 34.5vh;
  list-style-type: none;
  border: none;
  margin: 0;
  direction: rtl;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  border-radius: 20px;
  margin-bottom: 3rem;
  margin-block-start: 0em;
  margin-block-end: 0em;
  padding-inline-start: 0px;

  filter: ${(props) => (props.isModalOpen ? "blur(5px)" : "none")};
  pointer-events: ${(props) => (props.isModalOpen ? "none" : "auto")};
  opacity: ${(props) => (props.isModalOpen ? 0.6 : 1)};
`;

export const ListItem = styled.li`
  box-shadow: 1px 5px 10px 1px #e9e9e9;
  background-color: #ffffff;
  color: black;
  position: relative;
  // text-align: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  flex-grow: 1;
  max-width: 215px;
  display: flex;
  justify-content: space-evenly;
`;