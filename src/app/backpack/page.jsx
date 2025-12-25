import CryptoList from "@/components/crypto-list/CryptoList";
import Section from "@/shared/section/Section";
import { Suspense } from "react";

export default function Backpack() {
  return (
    <Section>
      <Suspense>
        <CryptoList />
      </Suspense>
    </Section>
  );
}
