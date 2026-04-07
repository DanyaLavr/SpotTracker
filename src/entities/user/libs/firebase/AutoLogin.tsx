"use client";
import { useEffect } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "./auth";
import { loginUser } from "../../modules/redux/operations";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "../../modules/redux/userSlice";

export default function AutoLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       console.log("redirect result :>> ", result);
  //       if (!result?.user) return;
  //       const { uid, email, displayName } = result.user;
  //       dispatch(
  //         setUser({ uid, email: email ?? "", login: displayName ?? "" }),
  //       );
  //       router.replace("/");
  //     })
  //     .catch((e) => console.error("redirect error :>> ", e));
  // }, []);
  useEffect(() => {
    let isRedirect = false;

    getRedirectResult(auth)
      .then((res) => {
        console.log("getRedirectResult :>>", res);
        if (!res) return;

        isRedirect = true;
        const user = res.user;
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email ?? "",
            login: user.displayName ?? "",
          }),
        );

        router.replace("/");
        router.refresh();
      })
      .catch(console.error);
    const getter = async () => {
      const res = await getRedirectResult(auth);
      console.log("res :>> ", res);
    };
    getter();
    // onAuthStateChanged — страховка, сработает в любом случае
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged user :>>", user);

      if (isRedirect) return;

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
