import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledMenuList = styled(motion.ul)`
  background-color: #ffffff;
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1;
  overflow: hidden;
  position: ${(props) =>
    props.isVerified ? "sticky" : "fixed"}; 
  bottom: 0px;
  padding-inline-start: 0px !important;
  margin-block-start: 0em !important;
  margin-block-end: 0em !important;
`;

export const Item = styled.li`
  border-top: 1px solid grey !important;
  color: black;
  background-color: #ffffff;
  width: 50%;
  flex-grow: 1;
  padding: 2rem;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  button {
    all: unset;
  }

  ${({ isactive }) =>
    isactive &&
    `
      border-top: 1px solid #00d180 !important;
      color: #00d180;

      h2 {
        color: #00d180;
      }
    `}

  &:hover {
    border-top: 1px solid #00d180 !important;

    h2 {
      color: #00d180;
    }
  }
  button:hover {
    cursor: pointer;
  }

  h2 {
    padding: 1rem;
    color: inherit;
  }

  @media (orientation: landscape) {
    width: 50%;
  }

  @media (orientation: portrait) {
    width: 50%;
  }

  &.focused {
    border-top: 1px solid #00d180 !important;
    color: #00d180;
    h2 {
      color: #00d180;
    }
  }
`;
