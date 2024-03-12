import * as Yup from "yup";
export const LoginSchema = Yup.object({
  email: Yup.string().email().required("Email field is required"),
  password: Yup.string().required("password field is required"),
});
