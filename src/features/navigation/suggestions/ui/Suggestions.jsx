"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useSuggestions, useSuggestionsHandlers } from "../modules";
import { useQuery } from "@/shared/lib/hooks";
import { selectCryptos } from "@/entities/crypto/modules/redux/selectors";

import SuggestionsItem from "./SuggestionsItem";

export default function Suggestions() {
  const searchQuery = useQuery();
  const cryptos = useSelector(selectCryptos);
  const { handleSuggestionClick, handleBgClick } = useSuggestionsHandlers();

  const suggestions = useSuggestions(searchQuery, cryptos);
  useEffect(() => {
    if (suggestions.length)
      document.body.addEventListener("click", handleBgClick);
    return () => {
      document.body.removeEventListener("click", handleBgClick);
    };
  }, [suggestions]);

  if (!suggestions.length) return;
  return (
    <ul
      className="absolute left-0 w-full overflow-auto max-h-80 md:max-h-40 bg-stone-900 px-10 py-6 rounded-b-2xl grid gap-5 md:gap-3"
      onClick={handleSuggestionClick}
    >
      {suggestions.map((elem) => (
        <SuggestionsItem key={`${elem.coin_id}-suggestion`} elem={elem} />
      ))}
    </ul>
  );
}
