import axios from "axios";

const API_KEYS = process.env.NEXT_PUBLIC_COINGECKO_API_KEYS.split(",");

export const fetchCryptos = async (page, apiKeyId) => {
  console.log("fetchCryptos");
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/exchanges/bybit_spot/tickers?x_cg_demo_api_key=${API_KEYS[apiKeyId]}&page=${page}`
  );

  let data = res.data.tickers.filter((ticker) => ticker.target === "USDT");
  if (res.data.tickers.length === 100) {
    const nextPageData = await fetchCryptos(page + 1, apiKeyId);
    data.push(...nextPageData);
  }
  return data;
};
