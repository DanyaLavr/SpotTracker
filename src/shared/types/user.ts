import { ICryptoBackpack } from "./crypto";

export interface IUser {
  login: string;
  uid: string;
  email: string;
  backpack?: ICryptoBackpack[];
}
export interface ILoginUser {
  email: string;
  password: string;
}
export interface IRegisterUser extends ILoginUser {
  login: string;
  copyPassword: string;
}
