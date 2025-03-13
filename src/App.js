import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { useSelector } from "react-redux";
import MenuList from "./components/MenuList";
import { MenuProvider } from "./context/useMenu";
import styled from "styled-components";
import Header from "./components/Header";
import { AuthorizationProvider } from "./context/useGetToken.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { ErrorProvider } from "./context/ErrorContext";

import { RenderRoutes } from "./utils/Routes.jsx";

function App() {
  const theme = useSelector((state) => state.theme);

  const [isMenuOpen, toggleMenu] = useState(false);

  const handleToggleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <AdminProvider>
            <AuthorizationProvider>
              <ErrorProvider>
                <VerticalContainer>
                  <Header />
                  <RenderRoutes />
                  <MenuList
                    isMenuOpen={isMenuOpen}
                    handleToggleMenu={handleToggleMenu}
                  />
                </VerticalContainer>
              </ErrorProvider>
            </AuthorizationProvider>
          </AdminProvider>
        </MenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// function AppContent() {
//   const [isMenuOpen, toggleMenu] = useState(false);
//   const { isVerified } = useContext(AdminContext);

//   const handleToggleMenu = () => {
//     toggleMenu(!isMenuOpen);
//   };

//   return (
//     <VerticalContainer>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Navigate to="/calendar" replace />} />
//         <Route
//           path="/calendar"
//           element={
//             <>
//               <Helmet>
//                 <title>ניהול סטודיו - מערכת שעות</title>
//                 <meta
//                   name="description"
//                   content="see private training, group training and cancel training"
//                 />
//                 <link
//                   rel="icon"
//                   type="image/png"
//                   href={calendarIcon}
//                   sizes="16x16"
//                 />
//               </Helmet>
//               <Calendar />
//             </>
//           }
//         />
//         {isVerified === false && (
//           <Route
//             path="/setgrouplesson"
//             element={<Navigate to="/notAuthorized" replace />}
//           />
//         )}

//         <Route
//           path="/notAuthorized"
//           element={
//             <>
//               <Helmet>
//                 <title>אין גישה לעמוד זה</title>
//                 <meta name="description" content="No access to this page" />
//               </Helmet>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexGrow: "1",
//                 }}
//               >
//                 <h1>403 error</h1>
//               </div>
//             </>
//           }
//         />

//         <Route
//           path="/setgrouplesson"
//           element={
//             <FormContainer>
//               {isVerified && (
//                 <>
//                   <Helmet>
//                     <title>ניהול סטודיו - צור אימון קבוצתי</title>
//                     <meta name="description" content="Set a Group Lesson" />
//                     <link
//                       rel="icon"
//                       type="image/png"
//                       href={groupIcon}
//                       sizes="16x16"
//                     />
//                   </Helmet>
//                   <Group2 />
//                 </>
//               )}

//               {isVerified === false && (
//                 <>
//                   <Helmet>
//                     <title>אין גישה לעמוד זה</title>
//                     <meta name="description" content="No access to this page" />
//                   </Helmet>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       flexGrow: "1",
//                     }}
//                   >
//                     <h1>403 error</h1>
//                   </div>
//                 </>
//               )}
//             </FormContainer>
//           }
//         />

//         <Route
//           path="/approveLink/:lessonId"
//           element={
//             isVerified ? (
//               <>
//                 <Helmet>
//                   <title>אישור אימון פרטי</title>
//                   <meta
//                     name="description"
//                     content="Aproove request for private training"
//                   />
//                 </Helmet>
//                 <ApproveLink />
//               </>
//             ) : (
//               <>
//                 <Helmet>
//                   <title>אין גישה לעמוד זה</title>
//                   <meta name="description" content="No access to this page" />
//                 </Helmet>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexGrow: "1",
//                   }}
//                 >
//                   <h1>403 error</h1>
//                 </div>
//               </>
//             )
//           }
//         />

//         <Route path="/signin" element={<SignIn />} />

//         <Route path="*" element={<Navigate to="/calendar" replace />} />
//       </Routes>
//       <MenuList isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
//     </VerticalContainer>
//   );
// }

const VerticalContainer = styled.div`
  flex: 1;
  display: flex;
  max-width: 100vw;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
`;

export default App;
