"use client";

import { logoutUser } from "@/lib/redux/user/operations";
import { selectUser } from "@/lib/redux/user/selectors";
import Button from "@/shared/buttons/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function UserInfo() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  if (!user) return null;

  return (
    <div className="flex items-center gap-5">
      <p className="text-stone-50 text-3xl font-bold">{user.login}</p>
      <Button
        color="light"
        background={false}
        className="h-full border-2 py-0 px-9 rounded-2xl"
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
