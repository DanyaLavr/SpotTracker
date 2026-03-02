import "../styles/globals.css";

import { ReduxProvider } from "@/store";
import AutoLogin from "@/entities/user/libs/firebase";
import Aside from "@/widgets/aside";
import Header from "@/widgets/header";
import BurgerMenu from "@/features/navigation/burger-menu";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  modal: ReactNode;
}
export default function RootLayout({ children, modal }: IProps) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AutoLogin />
          <Header />
          <main className="flex h-screen">
            <Aside />
            {children}
            <BurgerMenu />
          </main>
          {modal}
        </ReduxProvider>
      </body>
    </html>
  );
}
