"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/shared/lib/firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../entities/user/modules/redux/operations";

export default function AutoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginUser.fulfilled({
            uid: user.uid,
            email: user.email,
            login: user.displayName,
          })
        );
      }
    });
  }, []);

  return null;
}
