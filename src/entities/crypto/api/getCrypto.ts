import { fetchCryptos } from "./fetchCryptos";
export const revalidate = 300;
const MAX_KEYS = 7;

export async function getCryptos() {
  for (let i = 0; i < MAX_KEYS; i++) {
    try {
      return await fetchCryptos(1, i);
    } catch (e) {
      // if (e?.code === 10006) continue;
      throw e;
    }
  }

  throw new Error("All API keys exhausted");
}
