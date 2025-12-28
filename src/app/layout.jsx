import Header from "@/components/header/Header";
import "../styles/globals.css";
import Aside from "@/components/aside/Aside";
import CryptoLoader from "@/components/redux-provider/CryptoLoader";
import ReduxProvider from "@/components/redux-provider/ReduxProvider";
import AutoLogin from "@/lib/firebase/AutoLogin";
export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {/* <CryptoLoader /> */}
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
