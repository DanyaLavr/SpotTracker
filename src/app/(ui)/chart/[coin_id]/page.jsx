import { createCandles } from "@/entities/crypto/modules/createCandles";
import CandlesChart from "@/entities/crypto/ui/candles-chart";
import IntervalButtons from "@/features/navigation/interval-buttons";
import { Button } from "@/shared/ui";
import Section from "@/shared/ui/section/Section";
async function getCandles(symbol, interval) {
  const res = await fetch(
    `https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}&interval=${interval}&limit=1000`,
    {
      cache: "no-store",
    },
  );

  const json = await res.json();
  return json.result.list;
}
export default async function ChartPage({ params, searchParams }) {
  const { coin_id } = await params;
  const { interval } = await searchParams;

  const candles = await getCandles(coin_id, interval ?? 15);

  const data = createCandles(candles);
  return (
    <div className=" flex flex-col gap-5 w-full bg-stone-900">
      <IntervalButtons appInterval={interval} />
      <div style={{ width: "100%", height: "90%" }}>
        <CandlesChart initialData={data} coinId={coin_id} />
      </div>
    </div>
  );
}
