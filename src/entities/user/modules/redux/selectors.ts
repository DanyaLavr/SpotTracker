import { RootState } from "@/store/store";

export const selectUser = (state: RootState) => state.user.user;
export const selectBackpack = (state: RootState) => state.user.user?.backpack;
export const selectUserIsLoading = (state: RootState) =>
  state.user.isLoadingUser;
export const selectUserError = (state: RootState) => state.user.errorUser;
export const selectBackpackIsLoading = (state: RootState) =>
  state.user.isLoadingBackpack;
export const selectBackpackError = (state: RootState) =>
  state.user.errorBackpack;
