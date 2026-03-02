import * as Yup from "yup";

export const sellSchema = Yup.object().shape({
  price: Yup.number().min(0, "Cannot be negative").required("Required"),
  count: Yup.number().min(0, "Cannot be negative").required("Required"),
  sellAmount: Yup.number().min(0, "Cannot be negative").required("Required"),
});

export const sellInitialValues = ({ last = 0 } = {}) => {
  return {
    price: last,
    count: 0,
    sellAmount: 0,
  };
};
