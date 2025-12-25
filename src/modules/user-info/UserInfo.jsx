"use client";

import { logoutUser } from "@/lib/redux/user/operations";
import { selectUser } from "@/lib/redux/user/selectors";
import { logout } from "@/lib/redux/user/userSlice";
import Button from "@/shared/buttons/Button";
import { useDispatch, useSelector } from "react-redux";

export default function UserInfo() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  if (!user) return null;

  return (
    <div className="flex items-center gap-5">
      <p className="text-stone-50 text-3xl font-bold">{user.login}</p>
      <Button
        color="light"
        background={false}
        className="h-full border-2 py-0 px-9 rounded-2xl"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Log out
      </Button>
    </div>
  );
}
