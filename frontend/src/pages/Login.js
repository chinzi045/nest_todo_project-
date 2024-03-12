import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas/index1";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { values, handleSubmit, touched, handleChange, handleBlur, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        const data = await fetch("http://localhost:4000/login", {
          method: "post",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        if (response.message) {
          toast.warn("Invalid username or password");
          return;
        } else {
          // console.log(response.token, "reeee");
          const token = response.token;
          Cookies.set("token", token, { expires: 7, secure: true });
          const decoded = jwtDecode(token);
          console.log(decoded, "infoooo");

          navigate("/");
        }
      },
    });
  return (
    <>
      <div className="login">
        <div className="img_div">
          <h3>
            <span>
              <img src="./logo.png" alt="logo img" className="login_img" />
            </span>
            Todo App
          </h3>
        </div>
        <form className="login_main" onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Email</label>
            <br />
            <input
              type="email"
              className="login_inputs"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              <br />
              {errors.email && touched.email ? (
                <span className="error">{errors.email}</span>
              ) : null}
          </div>
          <div className="inputs">
            <label>Password</label>
            <br />
            <input
              type="password"
              className="login_inputs"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && errors.password ? (
              <span className="error">{errors.password}</span>
            ) : null}
          </div>
          <div className=" inputs buttons">
            <button className="login_btn" type="submit">
              Login
            </button>
            <button className="signup_btn">
              <Link to="/signup" className="signup_btn_Link">
                Sign Up
              </Link>
            </button>
          </div>
        </form>
      </div>
      <p style={{ textAlign: "center", color: "rgb(24, 144, 192)" }}>
        All rights reserved by Gigalabs © 2024
      </p>
    </>
  );
};

export default Login;
