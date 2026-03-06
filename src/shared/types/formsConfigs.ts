import { AnyObject, ObjectSchema } from "yup";
import { ICryptoTicker } from "./crypto";
interface IBaseInput {
  name: string;
  placeholder?: string;
  type?: string;
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
export interface ITradeConfig<
  Values extends AnyObject,
  Schema extends AnyObject,
> {
  inputs: IInputWithButtons[];
  initialValues: (crypto: ICryptoTicker) => Values;
  validationSchema: ObjectSchema<Schema>;
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
