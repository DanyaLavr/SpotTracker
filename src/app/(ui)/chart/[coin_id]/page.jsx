import dynamic from "next/dynamic";

import { createCandles } from "@/entities/crypto/modules/createCandles";
import IntervalButtons from "@/features/navigation/interval-buttons";
import CandlesChart from "@/entities/crypto/ui/candles-chart";
async function getCandles(symbol, interval) {
  try {
    const res = await fetch(
      `https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}&interval=${interval ? interval : 15}&limit=1000`,
      {
        cache: "no-store",
      },
    );
    console.log("res :>> ", res);
    if (!res.ok) {
      console.error("Bybit response not ok:", res.status);
      return [];
    }

    const json = await res.json();
    console.log("json :>> ", json);
    if (!json?.result?.list) {
      console.error("Invalid Bybit response:", json);
      return [];
    }

    return json.result.list;
  } catch (error) {
    console.error("Failed to fetch candles:", error);
    return [];
  }
}

// const CandlesChart = dynamic(
//   () => import("@/entities/crypto/ui/candles-chart"),
//   { ssr: false },
// );
export default async function ChartPage({ params, searchParams }) {
  const { coin_id } = await params;
  const { interval } = await searchParams;

  const candles = await getCandles(coin_id, interval ?? 15);
  console.log("candles :>> ", candles);
  const data = createCandles(candles);
  return (
    <div className="flex flex-col gap-5 w-full bg-stone-900 pt-3">
      <IntervalButtons appInterval={interval} />
      <div style={{ width: "100%", height: "90%" }}>
        <CandlesChart initialData={data} coinId={coin_id} />
      </div>
    </div>
  );
}
