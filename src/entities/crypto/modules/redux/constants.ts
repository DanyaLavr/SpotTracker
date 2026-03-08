import { ICryptoTicker } from "@/shared/types";

interface ICRYPTOS {
  items: ICryptoTicker[];
  isLoading: boolean;
  error: string | null;
}
export const CRYPTOS: ICRYPTOS = {
  items: [],
  isLoading: false,
  error: null,
};
