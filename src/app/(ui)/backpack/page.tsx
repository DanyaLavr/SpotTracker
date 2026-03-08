import { Suspense } from "react";

import { Section } from "@/shared/ui";
import CryptoList from "@/entities/crypto/ui/crypto-list";

export default async function Backpack() {
  return (
    <Section>
      <Suspense>
        <CryptoList />
      </Suspense>
    </Section>
  );
}
