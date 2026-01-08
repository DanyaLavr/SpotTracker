import { purchaseInitialValues, purchaseSchema } from "../lib/formik/constants";

export const purchaseFormConfig = {
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
