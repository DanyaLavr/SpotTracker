import { IPurchaseData, ITradeConfig } from "@/shared/types";
import { purchaseInitialValues, purchaseSchema } from "../lib/formik/constants";

export const purchaseFormConfig: ITradeConfig<
  { [K in keyof IPurchaseData]: string },
  IPurchaseData
> = {
  initialValues: purchaseInitialValues,
  validationSchema: purchaseSchema,
  inputs: [
    {
      name: "price",
    },
    {
      name: "count",
    },
    {
      name: "invested",
      placeholder: "Amount invested",
    },
  ],
};
