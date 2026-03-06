import { Suspense } from "react";

import { getCryptos } from "@/entities/crypto/api/getCrypto";

import { Section, Loader } from "@/shared/ui";
import CryptoList from "@/entities/crypto/ui/crypto-list";

export const revalidate = 300;

export default async function Home() {
  const cryptos = await getCryptos();
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
        <CryptoList cryptos={cryptos} />
      </Suspense>
    </Section>
  );
}
