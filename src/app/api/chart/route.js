import { createCandles } from "@/entities/crypto/modules/createCandles";

export async function GET(req) {
  const coin = req.nextUrl.searchParams.get("coin");
  const interval = req.nextUrl.searchParams.get("interval") || 15;

  try {
    const res = await fetch(
      `https://api.bybit.com/v5/market/kline?category=spot&symbol=${coin}&interval=${interval}&limit=1000`,
    );

    const data = await res.json();
    const candles = createCandles(data.result.list);

    return Response.json(candles);
  } catch {}
}
