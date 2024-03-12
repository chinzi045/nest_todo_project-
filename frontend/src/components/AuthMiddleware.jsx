import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  // const [allowed, setAllowed] = useState(false);

  const token = Cookies.get("token");

  // if (token) {
  //   const tokenDecoded = jwtDecode(token);

  //   // TODO
  //   // send the decoded token back to server for checking the authorization
  //   // if authorized, setAllowed(true)

  //   setAllowed(true);
  // }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthMiddleware;
