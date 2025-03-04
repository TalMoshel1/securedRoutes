import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const signIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "demouser4@gmail.com",
          password: "987687765",
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      localStorage.setItem("boxing", JSON.stringify({ user: data.user }));
      if (data.success === "success") {
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};
