import React from "react";
import styled from "styled-components";
import { formatThreeLettersMonthAndDaysToHebrew } from "../utils/formatThreeLettersMonthAndDaysToHebrew";
import { DayHeader } from "./Day/styled-component";
//   padding-left: 0.5rem;
//   padding-right: 0.5rem;
//   color: ${(props) => props.theme.calendarHeaderColor};
//   height: fit-content !important;

//   h1 {
//     font-size: 1rem;
//   }

//   .date {
//     background-color: ${(props) =>
//       props.isToday ? props.isToday : props.isSelected ? "#00d180" : "none"};
//     border-radius: 20px;
//     width: 2rem;
//     height: 2rem;
//     align-content: center;
//   }

//   .date:focus {
//     outline: 2px solid black;
//     border-radius: 20px;
//   }
// `;

const Day = ({ date, lessons, isSelected, onSelectDate, isToday }) => {
  const dayOfTheWeek = date.displayedDate.split(",")[0];

  return (
    <div className="day" onClick={onSelectDate}>
      <DayHeader isSelected={isSelected} isToday={isToday}>
        <h1 style={{ color: "#C5C6C7" }}>
          {formatThreeLettersMonthAndDaysToHebrew("day", dayOfTheWeek)}
        </h1>
        <h1
          className="date"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelectDate();
            }
          }}
        >
          {new Date(date.date).getDate()}
        </h1>
      </DayHeader>
    </div>
  );
};

export default React.memo(Day);
