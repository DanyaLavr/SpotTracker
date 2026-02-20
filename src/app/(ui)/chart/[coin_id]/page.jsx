import dynamic from "next/dynamic";

import { createCandles } from "@/entities/crypto/modules/createCandles";
import IntervalButtons from "@/features/navigation/interval-buttons";
async function getCandles(symbol, interval) {
  const res = await fetch(
    `https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}&interval=${interval ? interval : 15}&limit=1000`,
    {
      cache: "no-store",
    },
  );

  const json = await res.json();
  return json.result.list;
}

const CandlesChart = dynamic(
  () => import("@/entities/crypto/ui/candles-chart"),
);
export default async function ChartPage({ params, searchParams }) {
  const { coin_id } = await params;
  const { interval } = await searchParams;

  const candles = await getCandles(coin_id, interval ?? 15);

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
