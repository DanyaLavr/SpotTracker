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
      placeholder: "name",
    },
    {
      name: "email",
    },
    {
      name: "password",
    },
    {
      name: "copyPassword",
      placeholder: "repeat password",
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
