import { Suspense } from "react";

import { Section, Loader } from "@/shared/ui";
import CryptoList from "@/entities/crypto/ui/crypto-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpotTracker — Crypto Portfolio Tracker",
  description:
    "SpotTracker is a centralized platform to track and manage your cryptocurrency portfolio. Monitor your assets, prices and performance in one place.",
  keywords: [
    "SpotTracker",
    "crypto portfolio",
    "portfolio tracker",
    "cryptocurrency",
    "bitcoin",
    "ethereum",
  ],
  openGraph: {
    title: "SpotTracker — Crypto Portfolio Tracker",
    description:
      "A centralized platform to track and manage your cryptocurrency portfolio.",
    type: "website",
    url: "https://crypto-back-phi.vercel.app",
  },
};
export default async function Home() {
  return (
    <Section>
      <Suspense
        fallback={
          <Loader
            color="#fff"
            cssOverride={{ justifySelf: "center", marginTop: "20px" }}
          />
        }
      >
        <CryptoList />
      </Suspense>
    </Section>
  );
}
