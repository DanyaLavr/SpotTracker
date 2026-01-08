export const getPrevBackpack = (getState, data) => {
  const state = getState();
  const prevBackpack = state.user.user.backpack;
  console.log("prevBackpack :>> ", prevBackpack);
  const indexOfCrypto = prevBackpack.findIndex(
    (elem) => elem.coin_id === data.coin_id
  );
  console.log("indexOfCrypto :>> ", indexOfCrypto);
  return [prevBackpack, indexOfCrypto];
};
