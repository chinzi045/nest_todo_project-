import React, { useContext, useState } from "react";
import { MyContext } from "./Context";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminMiddleware = () => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  (async () => {
    try {
      const token = Cookies.get("token");

      const data = await fetch("http://localhost:4000/verify", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!data.ok) throw data;

      setAllowed(true);
    } catch (error) {
      navigate("/");
    }
  })();

  return allowed ? <Outlet /> : <div>Loading</div>;
};

export default AdminMiddleware;
