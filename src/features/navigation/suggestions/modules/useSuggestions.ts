import { ICryptoTicker } from "@/shared/types";
import { useMemo } from "react";

export const useSuggestions = (searchQuery: string, cryptos: ICryptoTicker[]) =>
  useMemo(() => {
    if (!searchQuery) return [];

    const name = searchQuery.toLowerCase();
    const base = searchQuery.toUpperCase();

    return cryptos.filter(
      (elem) => elem.base.includes(base) || elem.coin_id.includes(name),
    );
  }, [searchQuery, cryptos]);
