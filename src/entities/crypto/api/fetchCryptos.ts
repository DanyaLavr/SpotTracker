import { ICryptoTicker } from "@/shared/types";

const API_KEYS = process.env.NEXT_PUBLIC_COINGECKO_API_KEYS!.split(",");

export const fetchCryptos = async (
  page: number,
  apiKeyId: number,
): Promise<ICryptoTicker[]> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/exchanges/bybit_spot/tickers?x_cg_demo_api_key=${API_KEYS[apiKeyId]}&page=${page}`,
    { next: { revalidate: 300 } },
  );
  const data = await res.json();

  if (data?.status?.error_code === 10006) {
    const err = new Error("API key rate limit exceeded");
    // err.code = 10006;
    throw err;
  }
  let cryptos = [];

  cryptos = data?.tickers?.filter(
    (ticker: ICryptoTicker) => ticker.target === "USDT",
  );

  if (data?.tickers?.length === 100) {
    const nextPageData = await fetchCryptos(page + 1, apiKeyId);
    cryptos.push(...nextPageData);
  }
  return cryptos;
};
