"use client";
import { useEffect } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "./auth";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "../../modules/redux/userSlice";

export default function AutoLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      // Сначала ЖДЁМ redirect result
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const { uid, email, displayName } = result.user;
          dispatch(
            setUser({
              uid,
              email: email ?? "",
              login: displayName ?? "",
            }),
          );
          router.replace("/");
          // Редирект был — onAuthStateChanged не нужен
          return;
        }
      } catch (e) {
        console.error("getRedirectResult error:", e);
      }

      // Только если редиректа не было — подписываемся
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName } = user;
          dispatch(
            setUser({
              uid,
              email: email ?? "",
              login: displayName ?? "",
            }),
          );
        }
      });

      return unsubscribe;
    };

    let unsubscribe: (() => void) | undefined;
    init().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => unsubscribe?.();
  }, []);

  return null;
}
