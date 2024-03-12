import * as Yup from "yup";
export const SignUpSchema = Yup.object({
  firstName: Yup.string()
    .default("")
    .min(3)
    .max(25)
    .required("firstName is required !"),
  lastName: Yup.string().min(2).max(12).required("Last Name is required !"),
  email: Yup.string()
    .email("email is invalid")
    .test((value) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    })
    .required("Email field is required !"),
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "password must match"),
});
