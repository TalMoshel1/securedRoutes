import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { openWhatsApp } from "../utils/sendWhatsApp.js";
import { useKickOut } from "../hooks/KickOut";
import { removeCookie } from "../utils/removeCookie.js";
import CustonAlert from "../components/CustomAlert.jsx";
import { ErrorContext } from "../context/ErrorContext.jsx";
import { AdminContext } from "../context/AdminContext.jsx";

const ApprovalLink = () => {
  const { lessonId } = useParams();
  const [isApproved, setIsApproved] = useState(false);
  // const {isVerified} = useContext(AdminContext)
  const [approvedLesson, setApprovedLesson] = useState();
  const { setErrorString } = useContext(ErrorContext);

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await fetch(
          `http/api/lessons/approveLink/${lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          removeCookie();
          setErrorString("שגיאה באימות!");
          throw new Error(
            `http error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data) {
          setApprovedLesson(data.lesson);
          return setIsApproved(data);
        }
      } catch (error) {
        setIsApproved({ message: "שיעור כבר קבוע במערכת בזמן זה" });
      }
    };

    if (lessonId) {
      sendPostRequest();
    }
  }, [lessonId]);

  if (isApproved) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
          flexGrow: "1",
        }}
      >
        <p>
          {isApproved.message === "שיעור כבר קבוע במערכת בזמן זה"
            ? isApproved.message
            : "השיעור אושר"}
        </p>
        {isApproved.message !== "שיעור כבר קבוע במערכת בזמן זה" && (
          <button
            style={{
              width: "max-content",
              padding: "1rem",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#F0F0F0",
              fontSize: "1rem",
            }}
            onClick={() =>
              openWhatsApp(approvedLesson, approvedLesson.studentPhone)
            }
          >
            שלח תזכורת למתאמן
          </button>
        )}
        <CustonAlert />
      </div>
    );
  }
};

export default ApprovalLink;
