"use client";
import {
  loginInitialValues,
  loginUserSchema,
  registerInitialValues,
  registerUserSchema,
} from "@/lib/formik/constants";
import FormItem from "@/lib/formik/FormItem";
import {
  createBackpack,
  loginUser,
  registerUser,
} from "@/lib/redux/user/operations";
import {
  selectUserError,
  selectUserIsLoading,
} from "@/lib/redux/user/selectors";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/shared/buttons/Button";

const types = {
  registration: {
    name: "registerUser",
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
    callback: (values) => registerUser(values),
  },
  login: {
    name: "loginUser",
    initialValues: loginInitialValues,
    validationSchema: loginUserSchema,
    inputs: [
      {
        name: "email",
      },
      {
        name: "password",
      },
    ],
    button: "Login",
    link: {
      name: "I haven't an account",
      path: "/registration",
    },
    callback: (values) => loginUser(values),
  },
};
export default function AuthForm() {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const router = useRouter();
  const pathname = usePathname();

  const {
    name,
    initialValues,
    validationSchema,
    inputs,
    link,
    button,
    callback,
  } = types[pathname.replace("/", "").replace("(.)", "")];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const res = await dispatch(callback(values));
          if (res.type === `user/${name}/fulfilled`) {
            router.back();
            router.refresh();
          }
          if (res.type === `user/registerUser/fulfilled`)
            await dispatch(createBackpack(res.payload.uid));
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <Form className="grid gap-6">
        {inputs.map(({ name, placeholder, type }, idx) => (
          <FormItem
            key={idx}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        ))}
        <div className="flex gap-8 items-center justify-self-end ">
          <Link className="underline" href={link.path} replace>
            {link.name}
          </Link>
          <Button color="light" type="submit" disabled={loading}>
            {button}
          </Button>
        </div>
        {error && <div>{error}</div>}
      </Form>
    </Formik>
  );
}
