import { ICryptoTicker } from "@/shared/types";
import * as Yup from "yup";

export const purchaseSchema = Yup.object().shape({
  price: Yup.number().min(0, "Cannot be negative").required("Required"),
  count: Yup.number().min(0, "Cannot be negative").required("Required"),
  invested: Yup.number().min(0, "Cannot be negative").required("Required"),
});

export const purchaseInitialValues = (crypto: ICryptoTicker) => {
  return {
    price: crypto?.last?.toString() ?? "",
    count: "",
    invested: "",
  };
};
