import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptos } from "@/api/fetchCryptos";
let keyIndex = 0;
export const fetchAllCryptos = createAsyncThunk(
  "cryptos/fetchAllCryptos",
  async (_, thunkAPI) => {
    try {
      let data;
      while (true) {
        try {
          data = await fetchCryptos(1, keyIndex);
          break;
        } catch (e) {
          if (
            e.response?.data?.status?.error_message?.includes("API Key Missing")
          )
            keyIndex++;
        }
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
