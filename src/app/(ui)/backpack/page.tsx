import { Suspense } from "react";

import { getCryptos } from "@/entities/crypto/api/getCrypto";

import { Section } from "@/shared/ui";
import CryptoList from "@/entities/crypto/ui/crypto-list";

export const revalidate = 300;

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
