import React, { createContext, useEffect, useState } from "react";

export const TokenErrorContext = createContext();

export const TokenErrorProvider = ({ children }) => {

  const [isError, setIsError] = useState(false);

  const setError = () => {return setIsError(true)};

  const unSetError = () => {return setIsError(false)};


  return (
    <TokenErrorContext.Provider value={{ isError, setError, unSetError}}>
      {children}
    </TokenErrorContext.Provider>
  );
};
