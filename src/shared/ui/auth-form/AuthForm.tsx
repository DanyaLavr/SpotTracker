"use client";
import { Form, Formik } from "formik";

import {
  selectUserError,
  selectUserIsLoading,
} from "@/entities/user/modules/redux/selectors";

import Link from "next/link";
import { FormItem, Button } from "@/shared/ui";
import { IAuthConfig, IUser } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setAuthError, setUser } from "@/entities/user/modules/redux/userSlice";
import { useRouter } from "next/navigation";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "@/entities/user/libs/firebase/auth";
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
  const router = useRouter();

  useEffect(() => {
    dispatch(setAuthError(null));
  }, []);

  const { initialValues, validationSchema, inputs, link, button } = config;

  const handleGoogleSignIn = async () => {
    // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // if (isMobile) {
    //   await signInWithRedirect(auth, provider);
    //   return;
    // }

    const res = await signInWithPopup(auth, provider);
    if (!res?.user) return;

    const { uid, email, displayName } = res.user;
    dispatch(setUser({ uid, email: email ?? "", login: displayName ?? "" }));
    router.replace("/");
  };
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
        <button type="button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
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
