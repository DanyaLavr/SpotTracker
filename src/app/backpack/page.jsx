import { Suspense } from "react";

import { getCryptos } from "@/api/getCrypto";

import CryptoList from "@/components/crypto-list/CryptoList";
import Section from "@/shared/section/Section";

export default async function Backpack() {
  const cryptos = await getCryptos();

  return (
    <Section>
      <Suspense>
        <CryptoList cryptos={cryptos} />
      </Suspense>
    </Section>
  );
}
