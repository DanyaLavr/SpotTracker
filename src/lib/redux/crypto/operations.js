import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptos } from "@/api/fetchCryptos";
let keyIndex = 0;
export const fetchAllCryptos = createAsyncThunk(
  "cryptos/fetchAllCryptos",
  async (_, { rejectWithValue }) => {
    try {
      let data;
      while (true) {
        try {
          data = await fetchCryptos(1, keyIndex);
          break;
        } catch (e) {
          if (
            e.response.status === 429 ||
            e.response?.data?.status?.error_message?.includes("API Key Missing")
          )
            keyIndex++;
        }
      }
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
