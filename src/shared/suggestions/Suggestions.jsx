"use client";
import { useQuery } from "@/hooks/useQuery";
import { selectCryptos } from "@/lib/redux/crypto/selectors";

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import SuggestionsItem from "./SuggestionsItem";
import { useRouter } from "next/navigation";

export default function Suggestions({ cryptos }) {
  const searchQuery = useQuery();
  const router = useRouter();

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];

    const name = searchQuery.toLowerCase();
    const base = searchQuery.toUpperCase();

    return cryptos.filter(
      (elem) => elem.base.includes(base) || elem.coin_id.includes(name)
    );
  }, [searchQuery, cryptos]);
  const handleSuggestionClick = (e) => {
    const li = e.target.closest("li");
    const id = li.dataset.id;
    router.push(`/chart/${id.slice(0, -11)}`);
  };
  useEffect(() => {
    const handleBgClick = (e) => {
      if (!e.target.closest(".finder")) router.back();
    };
    if (suggestions.length)
      document.body.addEventListener("click", handleBgClick);
    return () => {
      document.body.removeEventListener("click", handleBgClick);
    };
  }, [suggestions]);

  if (!suggestions.length) return;
  return (
    <ul
      className="absolute left-0 w-full overflow-auto max-h-40 bg-stone-900 px-10 py-6 rounded-b-2xl grid gap-3"
      onClick={handleSuggestionClick}
    >
      {suggestions.map((elem) => (
        <SuggestionsItem key={`${elem.coin_id}-suggestion`} elem={elem} />
      ))}
    </ul>
  );
}
