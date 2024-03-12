import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";
const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <div className="main">
      <img src="./logo.png" alt="logo picture" className="logo_img" />

      <ul className="main_link">
        <li>
          <Link to="/" className="link">
            Active
          </Link>
        </li>
        <li>
          <Link to="/complete" className="link">
            Completed
          </Link>
        </li>
        <li>
          <Link to="/users" className="link">
            Users
          </Link>
        </li>
        <button onClick={logoutHandle} className="btn_logout">
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
