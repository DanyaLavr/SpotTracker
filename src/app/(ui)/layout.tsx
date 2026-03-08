import "../styles/globals.css";

import { ReduxProvider } from "@/store";
import AutoLogin from "@/entities/user/libs/firebase";
import Aside from "@/widgets/aside";
import Header from "@/widgets/header";
import BurgerMenu from "@/features/navigation/burger-menu";
import { ReactNode } from "react";
import { getCryptos } from "@/entities/crypto/api/getCrypto";
import CryptoPolling from "@/entities/crypto/modules/CryptoPolling";

export const revalidate = 300;

interface IProps {
  children: ReactNode;
  modal: ReactNode;
}
const cryptos = await getCryptos();

export default function RootLayout({ children, modal }: IProps) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AutoLogin />
          <CryptoPolling initialCryptos={cryptos} />
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
