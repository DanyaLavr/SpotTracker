"use client";
import { Form, Formik } from "formik";

import {
  selectUserError,
  selectUserIsLoading,
} from "@/entities/user/modules/redux/selectors";

import Link from "next/link";
import { FormItem, Button } from "@/shared/ui";
import { IAuthConfig } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setAuthError } from "@/entities/user/modules/redux/userSlice";
interface IProps<T extends Record<string, any>> {
  config: IAuthConfig<T>;
  onSubmit: (values: T) => Promise<void>;
}
export default function AuthForm<T extends Record<string, any>>({
  config,
  onSubmit,
}: IProps<T>) {
  const loading = useAppSelector(selectUserIsLoading);
  const error = useAppSelector(selectUserError);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setAuthError(null));
  }, []);
  const { initialValues, validationSchema, inputs, link, button } = config;
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="grid gap-8">
        {inputs.map(({ name, placeholder, type }, idx) => (
          <FormItem
            key={idx}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        ))}
        {error && (
          <div className="text-rose-700 text-sm font-medium bg-red-50 border-2 border-rose-700 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex gap-8 items-center justify-self-end ">
          <Link className="underline" href={link.path} replace>
            {link.name}
          </Link>
          <Button color="light" type="submit" disabled={loading}>
            {button}
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
