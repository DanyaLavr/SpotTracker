import { AnyObject, ObjectSchema } from "yup";
import { ICryptoTicker } from "./crypto";
import { HTMLInputTypeAttribute } from "react";
export interface IBaseInput {
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}
interface IInputWithButtons extends IBaseInput {
  buttons?: number[];
}
export interface IFormikConfig<T extends AnyObject> {
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  inputs: IBaseInput[];
}
export interface IAuthConfig<T extends AnyObject> extends IFormikConfig<T> {
  link: {
    name: string;
    path: string;
  };
  button: string;
}
export interface ITradeConfig<Values extends AnyObject> {
  inputs: IInputWithButtons[];
  initialValues: (crypto: ICryptoTicker) => { [K in keyof Values]: string };
  validationSchema: ObjectSchema<Values>;
}
export interface ITradeData {
  price: number;
  count: number;
}
export interface IPurchaseData extends ITradeData {
  invested: number;
}
export interface ISellData extends ITradeData {
  sellAmount: number;
}
