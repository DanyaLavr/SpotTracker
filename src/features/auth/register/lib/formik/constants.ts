import * as Yup from "yup";

export const registerUserSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .matches(/^\d+$/, "Code must contain only digits")
    .required("Required"),
});

export const registerInitialValues = {
  login: "",
  email: "",
  password: "",
  code: "",
};
