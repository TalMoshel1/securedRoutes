import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));



    const sendPostRequest = async () => {
      try {
        const response = await fetch(
          "https://appointment-back-qd2z.onrender.com/api/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "demouser4@gmail.com",
              password: "987687765",
            }),
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }
  
        const data = await response.json();
        localStorage.setItem(
          "boxing",
          JSON.stringify({ token: data.data.token, user: data.data.user })
        );
        setBoxing(
          JSON.stringify({ token: data.data.token, user: data.data.user })
        );

      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };

  useEffect(()=>{
    if (!boxing) {
      sendPostRequest()

    } else {
    }

  },[])

  return (
    <AuthContext.Provider value={{ boxing }}>
      {children}
    </AuthContext.Provider>
  );
};


