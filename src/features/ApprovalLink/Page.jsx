import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { openWhatsApp } from "../../utils/sendWhatsApp";
import { VerifyTokenContext } from "../../context/verifyTokenContext";

const ApprovalLink = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isApproved, setIsApproved] = useState(false);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const [approvedLesson, setApprovedLesson] = useState();
useContext(VerifyTokenContext);

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/lessons/approveLink/${lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
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
  }, [lessonId, boxing]);

  if (isApproved) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
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
      </div>
    );
  }
};

export default ApprovalLink;
