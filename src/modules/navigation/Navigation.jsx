"use client";
import { selectUser } from "@/lib/redux/user/selectors";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navigation() {
  const user = useSelector(selectUser);
  return (
    <nav className="text-white font-bold text-3xl ">
      <ul className="grid gap-5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={`/backpack`}>Backpack</Link>
        </li>
        {!user && (
          <li>
            <Link href="/registration">Log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
