import React, { useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StyledMenuList, Item } from "./MenuList/styled-component.jsx";
import { AdminContext } from "../context/AdminContext.jsx";

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRefs = [useRef(null), useRef(null), useRef(null)];
  const { isVerified } = useContext(AdminContext);

  const handleClick = (endpoint) => {
    navigate(`/${endpoint}`);
  };

  const handleFocus = (index) => {
    buttonRefs.forEach((ref, i) => {
      if (ref.current) {
        if (i === index) {
          ref.current.parentElement.classList.add("focused");
        } else {
          ref.current.parentElement.classList.remove("focused");
        }
      }
    });
  };

  const handleBlur = (index) => {
    if (buttonRefs[index].current) {
      buttonRefs[index].current.parentElement.classList.remove("focused");
    }
  };

  const isCalendarActive = location.pathname.endsWith("/calendar");
  const isSetGroupLessonActive = location.pathname.endsWith("/setgrouplesson");
  const isSignInActive = location.pathname.endsWith("/signin");

 

  return (
    <StyledMenuList tabIndex={-1} isVerified={isVerified}>
      <Item isactive={isCalendarActive} tabIndex={0}>
        <button
          ref={buttonRefs[0]}
          onFocus={() => handleFocus(0)}
          onBlur={() => handleBlur(0)}
          onClick={() => handleClick("calendar")}
          style={{ fontSize: "1rem", display: "inline" }}
        >
          מערכת שעות
        </button>
      </Item>

      <Item isactive={isSetGroupLessonActive}>
        <button
          ref={buttonRefs[1]}
          onFocus={() => handleFocus(1)}
          onBlur={() => handleBlur(1)}
          onClick={() => handleClick("setgrouplesson")}
          style={{ fontSize: "1rem", display: "inline" }}
        >
          קביעת אימונים שבועיים
        </button>
      </Item>

      <Item isactive={isSignInActive}>
        <button
          ref={buttonRefs[2]}
          onFocus={() => handleFocus(2)}
          onBlur={() => handleBlur(2)}
          onClick={() => handleClick("signin")}
          style={{ fontSize: "1rem", display: "inline" }}
        >
          התחברות
        </button>
      </Item>
    </StyledMenuList>
  );
};

export default MenuList;
