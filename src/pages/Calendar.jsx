import React, { useState } from 'react';
import '../App.css'
import styled from "styled-components";
import CalendarHeader from "../components/CalendarHeader.jsx";
import Days from "../components/Days.jsx";
import { useSelector } from "react-redux";
import "../css-pages/Calendar.css";
import DateSliderDays from "../components/DateSliderDays.jsx";
import { useEffect } from "react";
import { IndividualDay } from "../components/IndividualDay.jsx";
import Header from '../New UI/Header.jsx';
import { useNavigate } from 'react-router-dom';


const Calendar = () => {

  const [displayPage, setDisplayPage] = useState(false)
  const navigate = useNavigate()

  const authenticateRequest = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("boxing"))?.token;
      if (!token) throw new Error("No token found");
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/auth/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message !== "Token is valid") {
        navigate("/signin", { state: { state: "/calendar" } });
      } else {
        setDisplayPage(true);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      navigate("/signin", { state: { state: "/calendar" } });
    }
  };

  useEffect(() => {
    authenticateRequest();
  }, []);
  

  const CalendarContainer = styled.div`
    width: 100%;
    direction:rtl;

    @media (orientation: landscape) {
      // margin-top: 5rem;
      // min-height: calc(100svh - 5rem);
    }

    @media (orientation: portrait) {
      // min-height: calc(100svh - 3rem);
    }

    display: flex;
    flex-direction: column;
  `;

  const Content = styled.div`
    display: flex;    
    direction: rtl;
    // justify-content: center;
    flex-direction: column;
    // min-height: 40svh;
    height: 73svh;
    overflow-x: none;
    overflow-y:scroll;
    gap: 1rem;
    direction:rtl;
    overflow: scroll;
    scrollbar-width: none; 
    overflow: auto;

    
  &::-webkit-scrollbar {
    overflow: hidden;
  }


  &::-ms-scrollbar {
  display: none; 
}



    &::-webkit-scrollbar {
    width: 102px;
}

@media (orientation: portrait) {
height: 73svh;
}

@media (orientation: landscape) {
height: 68svh;
}


  `;

  if (displayPage) {
    return (
      <CalendarContainer className="calendar">
        <CalendarHeader className="calendar header" />
        <Content className="content">
            <Days className='days' />
     
          </Content>
      </CalendarContainer>
    );

  }

};

export default React.memo(Calendar);
