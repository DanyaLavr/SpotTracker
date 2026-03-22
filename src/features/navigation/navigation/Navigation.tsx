"use client";
import Link from "next/link";

import { selectUser } from "@/entities/user/modules/redux/selectors";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const LINK_STYLES = "relative py-3 inline-block";

export default function Navigation() {
  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? `${LINK_STYLES} underline`
      : `${LINK_STYLES} transition-transform duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-3.5 after:left-0 after:h-0.5 after:z-1 after:w-0 after:rounded-full after:bg-current after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`;
  };

  return (
    <nav className="md:text-white font-bold text-2xl lg:text-3xl">
      <ul className="grid gap-5 justify-items-center md:justify-items-start">
        <li>
          <Link className={getLinkClass("/")} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={getLinkClass("/backpack")} href="/backpack">
            Backpack
          </Link>
        </li>
        {!user && (
          <li>
            <Link
              className={getLinkClass("/registration")}
              href="/registration"
            >
              Log in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
