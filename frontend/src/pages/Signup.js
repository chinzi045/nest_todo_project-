import React from "react";
import "./signup.css";
import { useFormik } from "formik";
import { SignUpSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
// import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";
import { number } from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (values) => {
        const data = await fetch("http://localhost:4000/signup", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await data.json();
        console.log(response, "data");
        if (typeof response.firstName === number) {
          toast.warn("first name must be the Alphabat");
          return;
        }
        if (response.message) {
          toast.error(`${response.message}`);
          return;
        }
        toast.success("User Registered Successfully");

        navigate("/login");
      },
    });

  //   console.log(errors, "eeeeeee");

  return (
    <>
      {/* <h1 style={{ textAlign: "center", marginTop: "3px" }}>Signup Here</h1> */}
      <div className="signup_main">
        <div className="signup_img">
          <img src="./logo.png" alt="images" className="signup_img" />
        </div>
        <div className="form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="div">
              <label htmlFor="fname" className="field_label">
                First Name
              </label>
              <br />
              <input
                type="text"
                className="input_field"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.firstName && touched.firstName ? (
                <span className="eror">{errors.firstName}</span>
              ) : null}
            </div>
            <div className="div">
              <label htmlFor="lname" className="field_label">
                Last Name
              </label>
              <br />
              <input
                type="text"
                className="input_field"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.lastName && touched.lastName ? (
                <span className="eror">{errors.lastName}</span>
              ) : null}
            </div>
            <div className="div">
              <label htmlFor="email" className="field_label">
                Email
              </label>
              <br />
              <input
                type="email"
                className="input_field"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.email && touched.email ? (
                <span className="eror">{errors.email}</span>
              ) : null}
            </div>
            <div className="div">
              <label htmlFor="password" className="field_label">
                Password
              </label>
              <br />
              <input
                type="password"
                className="input_field"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.password && touched.password ? (
                <span className="eror">{errors.password}</span>
              ) : null}
            </div>
            <div className="div">
              <label htmlFor="Cpassword" className="field_label">
                Confirm Password
              </label>
              <br />
              <input
                type="password"
                className="input_field"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.confirmPassword && touched.confirmPassword ? (
                <span className="eror">{errors.confirmPassword}</span>
              ) : null}
            </div>
            <button className="sign_btn" type="submit">
              Signup
            </button>
            <span className="other_login">
              <Link to="/login">Already have Account ? login </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
