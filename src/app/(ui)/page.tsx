import { Suspense } from "react";

import { Section, Loader } from "@/shared/ui";
import CryptoList from "@/entities/crypto/ui/crypto-list";

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
