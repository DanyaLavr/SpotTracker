import { sellInitialValues, sellSchema } from "../lib/formik/constants";

export const sellFormConfig = {
  initialValues: sellInitialValues,
  validationSchema: sellSchema,
  inputs: [
    {
      name: "price",
    },
    {
      name: "count",
    },
    {
      name: "sellAmount",
      placeholder: "Amount for sell",
    },
  ],
};
