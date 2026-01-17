"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

import { selectUser } from "@/entities/user/modules/redux/selectors";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const user = useSelector(selectUser);
  const pathname = usePathname();
  const isActiveClass = (href) =>
    pathname === href ? "p-3 pl-0 underline" : "p-3 pl-0";
  return (
    <nav className="md:text-white font-bold text-2xl lg:text-3xl ">
      <ul className="grid gap-5 justify-items-center md:justify-items-start">
        <li>
          <Link className={isActiveClass("/")} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={isActiveClass("/backpack")} href={`/backpack`}>
            Backpack
          </Link>
        </li>
        {!user && (
          <li>
            <Link className="p-3 pl-0" href="/registration">
              Log in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
