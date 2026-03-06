import { IUser } from "@/shared/types";

interface IUserState {
  user: IUser | null;
  isLoadingUser: boolean;
  errorUser: null | string;
  isLoadingBackpack: boolean;
  errorBackpack: null | string;
}
export const USER_STATE: IUserState = {
  user: null,
  isLoadingUser: false,
  errorUser: null,
  isLoadingBackpack: false,
  errorBackpack: null,
};
