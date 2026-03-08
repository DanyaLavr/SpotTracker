import { IAuthConfig, IRegisterUser } from "@/shared/types";
import {
  registerInitialValues,
  registerUserSchema,
} from "../lib/formik/constants";

const registerFormConfig: IAuthConfig<IRegisterUser> = {
  initialValues: registerInitialValues,
  validationSchema: registerUserSchema,
  inputs: [
    {
      name: "login",
      placeholder: "Name",
    },
    {
      name: "email",
    },
    {
      name: "password",
    },
    {
      name: "copyPassword",
      placeholder: "Repeat password",
      type: "password",
    },
  ],
  button: "Register",
  link: {
    name: "I have an account",
    path: "/login",
  },
};
export default registerFormConfig;
