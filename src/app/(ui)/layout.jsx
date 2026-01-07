import "../styles/globals.css";

import { ReduxProvider } from "@/store";
import AutoLogin from "@/entities/user/libs/firebase";
import Aside from "@/widgets/aside";
import Header from "@/widgets/header";

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AutoLogin />
          <Header />
          <main className="flex h-screen">
            <Aside />
            {children}
          </main>
          {modal}
        </ReduxProvider>
      </body>
    </html>
  );
}
