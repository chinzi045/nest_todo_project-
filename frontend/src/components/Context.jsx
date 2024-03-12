import React, { createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// Create context
const MyContext = createContext();

// Context provider component
const ContextProvider = ({ children }) => {
  const token = Cookies.get("token");
  const decode = token ? jwtDecode(token) : null;

  return (
    <MyContext.Provider value={{ token, decode }}>
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider, MyContext };
