"use client";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

import Google from "@/shared/ui/Google.svg";
import {
  createBackpack,
  loginUserWithGoogle,
} from "@/entities/user/modules/redux/operations";

const GoogleButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const userData = await dispatch(loginUserWithGoogle()).unwrap();
    const { creationTime, lastSignInTime } = userData.meta;
    if (creationTime === lastSignInTime)
      await dispatch(createBackpack(userData.uid));
    router.back();
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-3 w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md active:scale-[0.98]"
    >
      <Google />
      Sign in with Google
    </button>
  );
};

export default GoogleButton;
