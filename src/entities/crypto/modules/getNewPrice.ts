import { ICryptoBackpack, ICryptoTicker } from "@/shared/types";

const getNewPrice = (oldItem: ICryptoBackpack, newItem: ICryptoBackpack) =>
  (oldItem.price * oldItem.count + newItem.price * newItem.count) /
  (oldItem.count + newItem.count);

export default getNewPrice;
