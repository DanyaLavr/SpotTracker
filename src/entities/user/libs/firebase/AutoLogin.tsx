"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/entities/user/libs/firebase/auth";
import { loginUser } from "../../modules/redux/operations";
import { useAppDispatch } from "@/store/hooks";

export default function AutoLogin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginUser.fulfilled(
            {
              uid: user.uid,
              email: user.email!,
              login: user.displayName!,
            },
            "auth/auto-login",
            {
              email: "",
              password: "",
            },
          ),
        );
      }
    });
  }, []);

  return null;
}
