import * as Yup from "yup";

export const registerUserSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  copyPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords don't match")
    .required("Confirm your password"),
  // .nullable(),
});

export const registerInitialValues = {
  login: "",
  email: "",
  password: "",
  copyPassword: "",
};
