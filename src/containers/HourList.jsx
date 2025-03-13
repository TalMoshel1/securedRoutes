import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { toggleSetDeleteLessonModal } from "../redux/calendarSlice";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
  CloseButton,
  HourContainer,
  Hour,
  HourEventContainer,
  HourEvent,
  InfoButton,
} from "./Modal";
import { AdminContext } from "../context/AdminContext";

const Lesson = ({ lesson, removeLesson }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const {isVerified} = useContext(AdminContext)

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lessonId) => {
    return dispatch(toggleSetDeleteLessonModal(lessonId));
  };

  if (lesson.lesson.type === "private" && lesson.lesson.isApproved === true && isVerified) {
    return (
      <HourContainer>
          <CloseButton onClick={() => handleOpenDeleteModal(lesson)}>
            <CloseIcon style={{ fontSize: "1rem" }} />
          </CloseButton>
        <InfoButton>
          <InfoIcon style={{ fontSize: "1rem", color: "black" }} />
        </InfoButton>
        <Hour>
          {lesson.lesson.startTime} - {lesson.lesson.endTime}
        </Hour>
        <strong>אימון אישי {lesson.lesson.trainer}</strong>

        <HourEventContainer>
          <HourEvent style={{ fontSize: "0.4rem" }}>
            <strong>
              {" "}
              לחילח
              {lesson.lesson.studentName}
              <br />
              {lesson.lesson.studentPhone}
            </strong>
          </HourEvent>
        </HourEventContainer>
      </HourContainer>
    );
  }
  if (lesson.lesson.type === "group") {
    const wordsArray = lesson.lesson.name.match(/[\u0590-\u05FFa-zA-Z0-9-]+/g);
    return (
      <HourContainer>
        {user?.user?.role === "admin" && (
          <CloseButton onClick={() => handleOpenDeleteModal(lesson)}>
            <CloseIcon style={{ fontSize: "1rem" }} />
          </CloseButton>
        )}
        <Hour>
          <strong>
            {lesson.lesson.startTime} - {lesson.lesson.endTime}
          </strong>
        </Hour>
        <HourEventContainer>
          <HourEvent>
            <h2 style={{ fontWeight: "normal" }}>{lesson.lesson.trainer}</h2>
            <h3>
              {wordsArray.map((w, i) => (
                <React.Fragment key={i}>
                  {w}
                  {i !== wordsArray.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h3>
          </HourEvent>
        </HourEventContainer>
      </HourContainer>
    );
  }
};

export default Lesson;
