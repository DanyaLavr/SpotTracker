import { ICryptoBackpack } from "@/shared/types";
import { RootState } from "@/store/store";
type TResult = [ICryptoBackpack[], number];
export const getPrevBackpack = (
  getState: () => RootState,
  data: ICryptoBackpack,
): TResult => {
  const state = getState();
  const prevBackpack = state.user.user?.backpack;
  if (!prevBackpack) return [[], -1];
  const indexOfCrypto = prevBackpack.findIndex(
    (elem) => elem.coin_id === data.coin_id,
  );
  return [prevBackpack, indexOfCrypto];
};
