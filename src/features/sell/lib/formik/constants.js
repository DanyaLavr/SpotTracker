import * as Yup from "yup";

export const sellSchema = Yup.object().shape({
  price: Yup.number().min(0, "Cannot be negative").required("Required"),
  count: Yup.number().min(0, "Cannot be negative").required("Required"),
  sellAmount: Yup.number().min(0, "Cannot be negative").required("Required"),
});

export const sellInitialValues = ({ last = "" }) => {
  return {
    price: last,
    count: "",
    sellAmount: "",
  };
};
