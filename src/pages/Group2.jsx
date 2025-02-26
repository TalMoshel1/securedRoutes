import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StyledBox } from "./Private2.jsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import * as styledGroup from "../groupHelpers/styled-component.js";
import * as groupFunctions from "../groupHelpers/functions.js";
import ClipLoader from "react-spinners/ClipLoader.js";

const Group2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainer: "דוד",
    name: "",
    description: "",
    day: "",
    startTime: "",
    endTime: "",
    repeatsWeekly: false,
    repeatMonth: "1",
    isApproved: true,
    type: "group",
  });
  const [message, setMessage] = useState("");
  const [displayPage, setDisplayPage] = useState(true);
  const [showMonthsOptions, setShowMonthsOptions] = useState(false);
  const monthRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dayRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

  const textColor = formData.repeatsWeekly ? 'black' : 'grey';


  const handleDisplayMonth = () => {
    if (formData.repeatsWeekly && !showMonthsOptions) {
      return setShowMonthsOptions(true);
    }
    setShowMonthsOptions(false);

  };

  const handleMonthChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      repeatMonth: value,
    }));
    setShowMonthsOptions(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) {
        setShowMonthsOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [monthRef]);

  const generateMonthOptions = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return months.map((month) => (
      <div
        key={month}
        className="option"
        onClick={() => {
          handleMonthChange(month);
        }}
      >
        {month}
      </div>
    ));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: e.$d,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      nameRef.current.focus();
      return;
    }
    if (!formData.description) {
      descriptionRef.current.focus();
      return;
    }
    if (!formData.day) {
      dayRef.current.focus();
      return;
    }
    if (!timePattern.test(formData.startTime)) {
      startTimeRef.current.focus();
      return;
    }
    if (!timePattern.test(formData.endTime)) {
      endTimeRef.current.focus();
      return;
    }

    const { repeatMonth, ...formDataToSend } = formData;
    let day = new Date(formData.day);
    day.setDate(day.getDate() + 1);

    const repeatEnd = repeatEndDate(day, parseInt(repeatMonth, 10));

    try {
      setDisplayPage(false)
      const token = JSON.parse(localStorage.getItem("boxing"))?.token;
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            ...formDataToSend,
            repeatEndDate: repeatEnd,
            day: day,
          }),
        }
      );
      const data = await response.json();
      if (!data.message) {
        setDisplayPage(true)
        return navigate("/calendar");
      }
      setMessage(data.message);
      handleCloseCreateGroupLesson();
    } catch (error) {
      console.error("Error creating group lesson:", error);
      setMessage("Error");
      handleCloseCreateGroupLesson();
    }
  };

  const handleCloseCreateGroupLesson = () => {
    dispatch(toggleSetGroupModal());
  };

  const handleCloseError = () => {
    setMessage("");
  };

  useEffect(() => {
    groupFunctions.authenticateRequest(navigate, setDisplayPage);
  }, []);

  if (message) {
    return (
      <styledGroup.Main>
        <div onClick={handleCloseError} style={{ direction: "rtl" }}>
          X
        </div>
        <strong>{message}</strong>
      </styledGroup.Main>
    );
  }

  // if (displayPage) {
  //   return  <div style={{width:'100%', display: 'flex', justifyContent:'center'}}><ClipLoader color="#000000" loading={true} size={150} /></div>
  // }

  return (
    <>
      <styledGroup.RequestForm onSubmit={handleSubmit}>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>

        <h1
          style={{
            textAlign: "center",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginBottom: "0.5rem",
            color: "black",
          }}
        >
          קביעת אימון קבוצתי
        </h1>

        <div className="line3">
          <styledGroup.FormItemContainer
            style={{ flexDirection: "row", height: "2.35rem", gap: "0.5rem" }}
          >
            <label style={{ color: textColor }}>אימון חוזר:</label>
            <styledGroup.StyledCheckbox
              type="checkbox"
              name="repeatsWeekly"
              checked={formData.repeatsWeekly}
              onChange={handleChange}
            />

            <styledGroup.StyledSelectContainer
              ref={monthRef}
              style={{
                width: "100%",
                minWidth: "6.820625rem",
                flexGrow: "1",
                height: "100%",
                color: "black !important",
              }}
            >
              <div
                className="custom-select"
                onClick={() =>
                  handleDisplayMonth()
                }
                style={{
                  height: "100%",
                  maxHeight: "2.35rem",
                  overflow: "hidden",
                  width: "100%",
                  top: "33%",
                  cursor: formData.repeatsWeekly ? "pointer" : "not-allowed", // Disable cursor
                  backgroundColor: formData.repeatsWeekly
                    ? "#e6e5eb"
                    : "#f0f0f0", 
                }}
              >
                <label
                  htmlFor="months"
                  name="months"
                  style={{
                    color: formData.repeatsWeekly ? "black" : "grey", 
                    cursor: formData.repeatsWeekly ? "pointer" : "not-allowed",
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "block",
                  }}
                >
                  {formData.repeatsWeekly ? (
                    <span>{formData.repeatMonth}</span>
                  ) : (
                    <span style={{ color: "grey", fontSize: '1rem'}}>לכמה חודשים</span>
                  )}
                </label>
              </div>
              <div
                className={`options-container ${
                  showMonthsOptions ? "show" : ""
                }`}
                ref={monthRef}
              >
                {showMonthsOptions}
                
                {generateMonthOptions()}
              </div>
            </styledGroup.StyledSelectContainer>
          </styledGroup.FormItemContainer>
        </div>

        <div className="line3">
          <styledGroup.FormItemContainer>
            <label>תאריך האימון:</label>
            <Box
              className="date-picker-container"
              style={{
                direction: "rtl",
                width: "100%",
                fontSize: "1rem",
                flexGrow: "1",
                height: "2.35rem",
                textAlign: "right",
                verticalAlign: "baseline",
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                style={{ width: "100% !important" }}
              >
                <StyledBox>
                  <DatePicker
                    value={formData.day ? dayjs(formData.day) : null}
                    onAccept={(e) => {
                      const value = dayjs(e.$d);
                      handleDateChange(value);
                    }}
                    slotProps={{
                      textField: {
                        placeholder: "תאריך",
                        sx: { color: "black" },
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                      />
                    )}
                  />
                </StyledBox>
              </LocalizationProvider>
            </Box>
          </styledGroup.FormItemContainer>
        </div>

        <div className="line3">
          <styledGroup.FormItemContainer>
            <label>שם האימון:</label>
            <input
              placeholder="שם"
              ref={nameRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </styledGroup.FormItemContainer>
          <styledGroup.FormItemContainer>
            <label>תיאור האימון:</label>
            <input
              style={{ alignContent: "center" }}
              placeholder="תיאור"
              ref={descriptionRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </styledGroup.FormItemContainer>
        </div>

        <div className="line3">
          <styledGroup.FormItemContainer>
            <label>שעת התחלה:</label>
            <input
              placeholder="שעה התחלה"
              ref={startTimeRef}
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              pattern={timePattern.source}
              required
            />
          </styledGroup.FormItemContainer>

          <styledGroup.FormItemContainer>
            <label>שעת סיום:</label>
            <input
              placeholder="שעת סיום"
              ref={endTimeRef}
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              pattern={timePattern.source}
              required
            />
          </styledGroup.FormItemContainer>
        </div>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>

        {displayPage ? <button type="submit" onClick={(e) => handleSubmit(e)} style={{border: 'none'}}>
          הוסף אימון
        </button> : <button style={{ display: 'flex', justifyContent:'center', border:'none'}}><ClipLoader color="#000000" loading={true} size={20} /></button> }
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>
      </styledGroup.RequestForm>
    </>
  );
};

export default Group2;