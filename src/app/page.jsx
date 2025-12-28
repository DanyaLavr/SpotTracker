import { getNextCrypto } from "@/api/getNextCrypto";
import CryptoList from "@/components/crypto-list/CryptoList";
import Loader from "@/shared/loader/Loader";
import Section from "@/shared/section/Section";
import { Suspense } from "react";

export default async function Home() {
  const cryptos = getNextCrypto();

  return (
    <Section>
      <Suspense fallback={<Loader />}>
        <CryptoList cryptos={cryptos} />
      </Suspense>
    </Section>
  );
}
