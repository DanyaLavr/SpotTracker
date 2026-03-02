import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cryptosReducer } from "../entities/crypto/modules/redux/cryptosSlice";
import { userReducer } from "../entities/user/modules/redux/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cryptos: cryptosReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
