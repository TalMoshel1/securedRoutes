import React, { createContext, useEffect, useState } from "react";

export const VerifyTokenContext = createContext();

export const VerifyTokenProvider = ({ children }) => {

  const [isVerified, setIsVerified] = useState(null);

  const verify = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        setIsVerified(false);
      }
      const data = await response.json();
      if (data.message !== "Token is valid") {
        return setIsVerified(false);
      }
      setIsVerified(true);
      return data.message;
    } catch (error) {
      console.error("Error sending POST request:", error);
      setIsVerified(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <VerifyTokenContext.Provider value={{ isVerified, verify, setIsVerified }}>
      {children}
    </VerifyTokenContext.Provider>
  );
};
