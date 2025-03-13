import React, { createContext, useEffect, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [Error, setError] = useState(null);

  const setErrorString = (string) => {
    return setError(string);
  };

  const SetErrorNull = () => {
    return setError(null);
  };

  return (
    <ErrorContext.Provider value={{ Error, setErrorString, SetErrorNull }}>
      {children}
    </ErrorContext.Provider>
  );
};
