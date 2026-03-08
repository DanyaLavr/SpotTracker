import * as Yup from "yup";

export const loginUserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};
