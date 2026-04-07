"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "../../modules/redux/userSlice";

export default function AutoLogin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email ?? "",
            login: user.displayName ?? "",
          }),
        );
      }
    });

    return () => unsubscribe();
  }, []);
  return null;
}
