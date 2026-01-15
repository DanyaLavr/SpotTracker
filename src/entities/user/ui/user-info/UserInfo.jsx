"use client";

import { logoutUser } from "@/entities/user/modules/redux/operations";
import { selectUser } from "@/entities/user/modules/redux/selectors";
import Button from "@/shared/ui/buttons/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function UserInfo({ className }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  if (!user) return null;
  return (
    <div
      className={`grid md:justify-items-end md:gap-3 lg:flex lg:items-center lg:gap-5 ${className}`}
    >
      <p className="md:text-stone-50 text-3xl font-bold">{user.login}</p>
      <Button
        color="dark"
        background={false}
        className="h-full border-2 rounded-2xl md:text-stone-50 lg:py-3 lg:px-9"
        onClick={async () => {
          await dispatch(logoutUser()).unwrap();
          router.replace("/");
          router.refresh();
        }}
      >
        Log out
      </Button>
    </div>
  );
}
