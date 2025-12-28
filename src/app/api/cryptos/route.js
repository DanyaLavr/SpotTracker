import { fetchCryptos } from "@/api/fetchCryptos";
let keyIndex = 0;

export async function GET() {
  try {
    let data;
    while (true) {
      try {
        data = await fetchCryptos(1, keyIndex);
        break;
      } catch (e) {
        if (
          e.response?.status === 429 ||
          e.response?.data?.status?.error_message?.includes("API Key Missing")
        ) {
          keyIndex++;
        } else {
          throw e;
        }
      }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
