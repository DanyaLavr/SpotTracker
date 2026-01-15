"use client";

import { Button, ModalBackground, Overlay } from "@/shared/ui";
import Navigation from "../navigation/Navigation";
import UserInfo from "@/entities/user/ui/user-info";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const BurgerMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);
  return (
    <>
      <Button
        color="dark"
        className="md:hidden grid gap-1 fixed bottom-10 left-6"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="block bg-stone-950 w-7 h-1 rounded-2xl"></span>
        <span className="block bg-stone-950 w-7 h-1 rounded-2xl"></span>
        <span className="block bg-stone-950 w-7 h-1 rounded-2xl"></span>
      </Button>
      {isOpen && (
        <Overlay handleClose={handleClose}>
          <ModalBackground handleClose={handleClose}>
            <Navigation />
            <UserInfo
              className={"mt-[95%] items-center justify-center md:hidden"}
            />
          </ModalBackground>
        </Overlay>
      )}
    </>
  );
};

export default BurgerMenu;
