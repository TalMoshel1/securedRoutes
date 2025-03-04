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

    return (
      <CalendarContainer className="calendar">
        <CalendarHeader className="calendar header" />
        <Content className="content">
            <Days className='days' />
          </Content>
      </CalendarContainer>
    );

  

};

export default React.memo(Calendar);
