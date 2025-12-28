// "use client";
import { getNextCrypto } from "@/api/getNextCrypto";
import SearchInput from "@/shared/search-input/SearchInput";
import Suggestions from "@/shared/suggestions/Suggestions";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// const SearchInput = dynamic(() => import("@/shared/search-input/SearchInput"), {
//   ssr: false,
// });
// const Suggestions = dynamic(() => import("@/shared/suggestions/Suggestions"), {
//   ssr: false,
// });
export default async function Finder() {
  const cryptos = getNextCrypto();
  return (
    <div className="finder flex-1 relative px-6 py-4 rounded-2xl bg-stone-900 ">
      <Suspense>
        <SearchInput />
        <Suggestions cryptos={cryptos} />
      </Suspense>
    </div>
  );
}
