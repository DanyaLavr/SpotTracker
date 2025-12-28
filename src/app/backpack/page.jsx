import { getNextCrypto } from "@/api/getNextCrypto";
import CryptoList from "@/components/crypto-list/CryptoList";
import Loader from "@/shared/loader/Loader";
import Section from "@/shared/section/Section";
import { Suspense } from "react";

export const revalidate = 300;

export default async function Backpack() {
  const cryptos = await getNextCrypto();
  return (
    <Section>
      <Suspense fallback={<Loader />}>
        <CryptoList cryptos={cryptos} />
      </Suspense>
    </Section>
  );
}
