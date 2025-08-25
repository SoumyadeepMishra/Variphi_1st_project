import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("access_token") || "");

  const setToken = (t) => {
    localStorage.setItem("access_token", t);
    setTokenState(t);
  };

  const clearToken = () => {
    localStorage.removeItem("access_token");
    setTokenState("");
  };

  return (
    <TokenContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);

export const setToken = (t) => {
  localStorage.setItem("access_token", t);
};
export const clearToken = () => {
  localStorage.removeItem("access_token");
};
export const getToken = () => localStorage.getItem("access_token");