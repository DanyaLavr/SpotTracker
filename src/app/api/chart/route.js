import { createCandles } from "@/entities/crypto/modules/createCandles";

export async function GET(req) {
  const coin = req.nextUrl.searchParams.get("coin");
  const interval = req.nextUrl.searchParams.get("interval") || 15;

  if (!coin) {
    return Response.json({ error: "Missing coin param" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.bybit.com/v5/market/kline?category=spot&symbol=${coin}&interval=${interval}&limit=1000`,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Bybit request failed", status: res.status },
        { status: 500 },
      );
    }

    const data = await res.json();

    if (!data?.result?.list) {
      return Response.json(
        { error: "Invalid Bybit response" },
        { status: 500 },
      );
    }

    const candles = createCandles(data.result.list);

    return Response.json(candles);
  } catch (error) {
    console.error("API /chart error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
