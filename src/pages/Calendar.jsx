import React, { useState } from "react";
import "../App.css";
import { StyledDisabledWrapper } from "./Calendar/styled-components.jsx";
import styled from "styled-components";
import CalendarHeader from "../containers/CalendarHeader.jsx";
import Days from "../containers/Days.jsx";
import { useSelector } from "react-redux";
import "../pages/Calendar/Calendar.css";
import { CalendarContainer, Content } from "./Calendar/styled-components.jsx";

const Calendar = () => {
  const isDeleteLessonModalOpen = useSelector(
    (state) => state.calendar.isDeleteLessonModalOpen
  );

  return (
    <StyledDisabledWrapper isDisabled={isDeleteLessonModalOpen}>
      <CalendarContainer className="calendar">
        <CalendarHeader className="calendar header" />
        <Content className="content">
          <Days className="days" />
        </Content>
      </CalendarContainer>
    </StyledDisabledWrapper>
  );
};

export default React.memo(Calendar);
