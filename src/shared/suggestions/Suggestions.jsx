"use client";
import { useQuery } from "@/hooks/useQuery";
import { selectCryptos } from "@/lib/redux/crypto/selectors";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import SuggestionsItem from "./SuggestionsItem";

export default function Suggestions() {
  const searchQuery = useQuery();
  const cryptos = useSelector(selectCryptos);
  const suggestions = useMemo(() => {
    if (!searchQuery) return [];

    const name = searchQuery.toLowerCase();
    const base = searchQuery.toUpperCase();
    return cryptos.filter(
      (elem) => elem.base.includes(base) || elem.coin_id.includes(name)
    );
  }, [searchQuery, cryptos]);
  if (!suggestions.length) return;
  return (
    <ul className=" absolute left-0 w-full overflow-auto max-h-40 bg-stone-900 px-10 py-6 rounded-b-2xl grid gap-3">
      {suggestions.map((elem) => (
        <SuggestionsItem key={`${elem.coin_id}-suggestion`} elem={elem} />
      ))}
    </ul>
  );
}
