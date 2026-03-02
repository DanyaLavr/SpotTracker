import { ISellData, ITradeConfig } from "@/shared/types";
import { sellInitialValues, sellSchema } from "../lib/formik/constants";

export const sellFormConfig: ITradeConfig<ISellData> = {
  initialValues: sellInitialValues,
  validationSchema: sellSchema,
  inputs: [
    {
      name: "price",
    },
    {
      name: "count",
      buttons: [10, 25, 50, 75, 100],
    },
    {
      name: "sellAmount",
      placeholder: "Amount for sell",
      buttons: [10, 25, 50, 75, 100],
    },
  ],
};
