"use client";
import { setAuthError } from "@/entities/user/modules/redux/userSlice";
import { sendVerificationCode } from "@/entities/user/modules/sendVerificationCode";
import { useCountdown } from "@/shared/hooks";
import { useAppDispatch } from "@/store/hooks";

interface IProps {
  email: string;
}
const CodeButton = ({ email }: IProps) => {
  const dispatch = useAppDispatch();
  const { secondsLeft, start } = useCountdown(60);

  return (
    <button
      type="button"
      disabled={!!secondsLeft}
      onClick={async () => {
        try {
          await sendVerificationCode(email);
          start();
        } catch {
          dispatch(setAuthError("Please wait 60 seconds before trying again"));
          setTimeout(() => {
            dispatch(setAuthError(null));
          }, 60 * 1000);
        }
      }}
      className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${secondsLeft ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {secondsLeft ? `Resend in ${secondsLeft}s` : "Send code"}
    </button>
  );
};

export default CodeButton;
