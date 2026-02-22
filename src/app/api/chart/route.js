import { createCandles } from "@/entities/crypto/modules/createCandles";

export async function GET(req) {
  const coin = req.nextUrl.searchParams.get("coin");
  const interval = req.nextUrl.searchParams.get("interval") || 15;

  try {
    const res = await fetch(
      `https://api.bybit.com/v5/market/kline?category=spot&symbol=${coin}&interval=${interval}&limit=200`,
      {
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) return Response.json([], { status: 200 });

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return Response.json([], { status: 200 });
    }

    const data = await res.json();

    if (data.retCode !== 0 || !data?.result?.list) {
      return Response.json([], { status: 200 });
    }

    return Response.json(data.result.list);
  } catch (e) {
    return Response.json([], { status: 200 });
  }

  // try {
  //   const res = await fetch(
  //     `https://api.bybit.com/v5/market/kline?category=spot&symbol=${coin}&interval=${interval}&limit=1000`,
  //     { cache: "no-store" },
  //   );
  //   console.log("api/chart res :>> ", res);
  //   if (!res.ok) {
  //     return Response.json(
  //       { error: "Bybit request failed", status: res.status },
  //       { status: 500 },
  //     );
  //   }

  //   let data;
  //   try {
  //     data = await res.json();
  //   } catch (e) {
  //     return Response.json(
  //       { error: "Invalid JSON from Bybit", details: e.message },
  //       { status: 500 },
  //     );
  //   }

  //   if (!data?.result?.list) {
  //     return Response.json(
  //       { error: "Invalid Bybit response" },
  //       { status: 500 },
  //     );
  //   }

  //   const candles = createCandles(data.result.list);
  //   return Response.json(candles);
  // } catch (error) {
  //   console.error("API /chart error:", error?.message || error, error);
  //   return Response.json(
  //     { error: "Internal server error", details: error?.message || "Unknown" },
  //     { status: 500 },
  //   );
  // }
}
