import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Item = styled.li`
  border-top: 1px solid grey !important;
  color: black;
  background-color: #ffffff;
  width: 50%;
  flex-grow:1;
  padding: 2rem;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  height: 100%;

  ${({ isactive }) =>
    isactive &&
    `
    border-top: 1px solid #00d180 !important;
    color: #00d180;

    h2 {
      color: #00d180;
    }
  `}

  &:hover, &:active {
    border-top: 1px solid #00d180 !important;

    h2 {
      color: #00d180;
    }
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

  h2 {
    all: unset;
  }
`;

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // Function to handle navigation
  const handleClick = (endpoint) => {
    console.log('Navigating to:', `/${endpoint}`);
    navigate(`/${endpoint}`);
  };

  const isCalendarActive = location.pathname.endsWith("/calendar");
  const isSetGroupLessonActive = location.pathname.endsWith("/setgrouplesson");
  const isSignInActive = location.pathname.endsWith("/signin");

  return (
    <StyledMenuList>
      <Item onClick={() => handleClick("calendar")} isactive={isCalendarActive}>
        <h2 style={{ fontSize: "1rem", width: '100%' }}>מערכת שעות</h2>
      </Item>


      <Item onClick={() => handleClick("setgrouplesson")} isactive={isSetGroupLessonActive}>
        <h2 style={{ fontSize: "1rem", padding: "1rem", width:'100%' }}>קביעת אימונים שבועיים</h2>
      </Item>

      <Item onClick={() => handleClick("signin")} isactive={isSignInActive}>
        <h2 style={{ fontSize: "1rem", padding: "1rem", width:'100%' }}>התחברות</h2>
      </Item>
    </StyledMenuList>
  );
};

const StyledMenuList = styled(motion.ul)`
  background-color: #ffffff;
  width: 100vw;
  height: 10svh;
  display: flex;
  align-items: center;
  justify-content:space-evenly;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  bottom: 0px;
  padding-inline-start: 0px !important;
  margin-block-start: 0em !important;
  margin-block-end: 0em !important;
`;

export default MenuList;
