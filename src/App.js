import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Calendar from "./pages/Calendar";
import DeleteLesson from "./components/deleteLesson";
import DetailsLesson from "./components/detailsLesson";
import Modal from "./components/Modal";
import ApproveLink from "./features/ApprovalLink/Page.jsx";
import "./App.css";
import { useSelector } from "react-redux";
import FormContainer from "./components/formContainer";
import MenuList from "./components/MenuList";
import { MenuProvider } from "./context/useMenu";
import styled from "styled-components";
import DateSliderDays from "./components/DateSliderDays";
import DateSliderWeeks from "./components/DateSliderWeeks";
import Private2 from "./pages/Private2";
import Header from "./New UI/Header";
import Group2 from "./pages/Group2";
import { AuthenticationProvider } from "./context/useGetToken.jsx";
import {
  VerifyTokenContext,
  VerifyTokenProvider,
} from "./context/verifyTokenContext.jsx";
import {TokenErrorContext, TokenErrorProvider} from "./context/tokenErrorContext";
import SignIn from "./pages/SignIn.jsx";
import { Helmet } from "react-helmet";
import calendarIcon from "./assets/calendarPage.png";
import groupIcon from "./assets/groupPage.png";
import RequireLoginAlert from "./components/requireLoginAlert.jsx";


function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <VerifyTokenProvider>
            <AuthenticationProvider>
              <TokenErrorProvider>
              <AppContent />
              </TokenErrorProvider>
            </AuthenticationProvider>
          </VerifyTokenProvider>
        </MenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const [isMenuOpen, toggleMenu] = useState(false);
  const { isVerified } = useContext(VerifyTokenContext);
  const {isError} = useContext(TokenErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isVerified === false) {
      // navigate("/signin");
    }
  }, [isVerified]);

  const handleToggleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  const isDeleteLessonModalOpen = useSelector(
    (state) => state.calendar.isDeleteLessonModalOpen
  );

  const isDetailsLessonModalOpen = useSelector(
    (state) => state.calendar.isDetailsLessonModalOpen
  );

  return (
    <VerticalContainer>
      <Header />
      <MenuList isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />

      {isError && <RequireLoginAlert />}

      {isDeleteLessonModalOpen && isVerified && (
        <Modal type="delete">
          <DeleteLesson />
        </Modal>
      )}

      {isDetailsLessonModalOpen && isVerified && (
        <Modal type="details">
          <DetailsLesson />
        </Modal>
      )}

      <Routes>
        {/* Default route should now redirect to calendar */}
        <Route path="/" element={<Navigate to="/calendar" replace />} />
        <Route
          path="/calendar"
          element={
            <>
              <Helmet>
                <title>מערכת שעות</title>
                <meta
                  name="description"
                  content="see private training, group training and cancel training"
                />
                <link
                  rel="icon"
                  type="image/png"
                  href={calendarIcon}
                  sizes="16x16"
                />
              </Helmet>

              <StyledDisabledWrapper
                isDisabled={isDeleteLessonModalOpen || isDetailsLessonModalOpen}
              >
                <Calendar />
              </StyledDisabledWrapper>
            </>
          }
        />
        <Route
          path="/setgrouplesson"
          element={
            <FormContainer>
              {isVerified && (
                <>
                  <Helmet>
                    <title>צור אימון קבוצתי</title>
                    <meta name="description" content="Set a Group Lesson" />
                    <link
                      rel="icon"
                      type="image/png"
                      href={groupIcon}
                      sizes="16x16"
                    />
                  </Helmet>
                  <Group2 />
                </>
              )}

              {isVerified === false && (
                <>
                  <Helmet>
                    <title>אין גישה לעמוד זה</title>
                    <meta name="description" content="No access to this page" />
                  </Helmet>
                  <h1>403 error</h1>
                </>
              )}
            </FormContainer>
          }
        />

        <Route
          path="/approveLink/:lessonId"
          element={
            isVerified ? (
              <>
                <Helmet>
                  <title>אישור אימון פרטי</title>
                  <meta
                    name="description"
                    content="Aproove request for private training"
                  />
                </Helmet>
                <ApproveLink />
              </>
            ) : (
              <>
                <Helmet>
                  <title>אין גישה לעמוד זה</title>
                  <meta name="description" content="No access to this page" />
                </Helmet>
                <h1>403 error</h1>
              </>
            )
          }
        />
        <Route
          path="/requestPrivte"
          element={
            <FormContainer>
              <Private2 />
            </FormContainer>
          }
        />
        <Route path="/datesliderdays" element={<DateSliderDays />} />
        <Route path="/datesliderweeks" element={<DateSliderWeeks />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="*" element={<Navigate to="/calendar" replace />} />
      </Routes>
    </VerticalContainer>
  );
}

export const DisabledWrapper = ({ isDisabled, children, ...props }) => (
  <div {...props}>{children}</div>
);

export const StyledDisabledWrapper = styled(DisabledWrapper)`
  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    width: 100vw;
  `}
`;

const VerticalContainer = styled.div`
  flex: 1;
  display: flex;
  max-width: 100vw;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
`;

export default App;
