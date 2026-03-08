import { ICryptoTicker } from "@/shared/types";
import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCryptos = (state: RootState) => state.cryptos.items;
export const selectCryptosIsLoading = (state: RootState) =>
  state.cryptos.isLoading;
export const selectCryptosError = (state: RootState) => state.cryptos.error;

export const selectCryptoById = (id: string) =>
  createSelector([selectCryptos], (cryptos) =>
    cryptos.find((elem: ICryptoTicker) => elem.coin_id === id),
  );
