import { Suspense } from "react";

import { Section } from "@/shared/ui";
import CryptoList from "@/entities/crypto/ui/crypto-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backpack | My Crypto Portfolio",
  description:
    "Track your cryptocurrency portfolio — prices, balances and performance in real time.",
  robots: {
    index: false,
    follow: false,
  },
};
export default async function Backpack() {
  return (
    <Section>
      <Suspense>
        <CryptoList />
      </Suspense>
    </Section>
  );
}
