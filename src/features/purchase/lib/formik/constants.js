import * as Yup from "yup";

export const purchaseSchema = Yup.object().shape({
  price: Yup.number().min(0, "Cannot be negative").required("Required"),
  count: Yup.number().min(0, "Cannot be negative").required("Required"),
  invested: Yup.number().min(0, "Cannot be negative").required("Required"),
});

export const purchaseInitialValues = ({ last = "" }) => {
  return {
    price: last,
    count: "",
    invested: "",
  };
};
