import { configureStore } from "@reduxjs/toolkit";
import { cryptosReducer } from "./crypto/cryptosSlice";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cryptos: cryptosReducer,
  },
});
