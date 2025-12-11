"use client";
import { purchaseInitialValues, purchaseSchema } from "@/lib/formik/constants";
import FormItem from "@/lib/formik/FormItem";
import { selectCryptoById } from "@/lib/redux/crypto/selectors";
import {
  getBackpack,
  updateCryptoInBackpack,
} from "@/lib/redux/user/operations";
import { selectBackpack, selectUser } from "@/lib/redux/user/selectors";
import Button from "@/shared/buttons/Button";
import Loader from "@/shared/loader/Loader";
import { Form, Formik } from "formik";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const inputs = [
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
];

export default function PurchaseForm() {
  const { coin_id } = useParams();
  const pathname = usePathname();
  const { uid } = useSelector(selectUser);
  const backpackCrypto = useSelector(selectBackpack);
  const selectedCrypto = useSelector(selectCryptoById(coin_id)) || {};
  const dispatch = useDispatch();
  const router = useRouter();
  const crypto = { ...selectedCrypto };
  const handleSubmit = (values) => {
    dispatch(
      updateCryptoInBackpack({
        id: uid,
        data: {
          coin_id,
          base: selectedCrypto.base,
          price: Number(values.price),
          count: Number(values.count),
          invested: Number(values.invested),
        },
      })
    );
    router.back();
  };
  useEffect(() => {
    if (!pathname.includes("/purchase")) return;
    const fetchData = async () => {
      console.log("calling getBackpack ");
      if (!backpackCrypto) await dispatch(getBackpack(uid));
    };
    fetchData();
  }, [pathname, dispatch, uid]);
  if (!crypto || !crypto.coin_id)
    return (
      <Loader
        color="#000"
        cssOverride={{ marginBottom: "40px", marginTop: "40px" }}
      />
    );
  return (
    <Formik
      initialValues={purchaseInitialValues(crypto)}
      validationSchema={purchaseSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid gap-6">
          {inputs.map(({ name, placeholder }, idx) => (
            <FormItem
              key={idx}
              name={name}
              placeholder={placeholder}
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue(name, value);

                const updated = {
                  ...values,
                  [name]: Number(value),
                };

                if (updated.invested && updated.price && name !== "count") {
                  setFieldValue("count", updated.invested / updated.price);
                  return;
                }
                if (updated.count && updated.price && name !== "invested") {
                  setFieldValue("invested", updated.count * updated.price);
                  return;
                }
                if (updated.count && updated.invested && name !== "price") {
                  setFieldValue("price", updated.invested / updated.count);
                  return;
                }
              }}
            />
          ))}
          <div className="flex justify-self-end">
            <Button type="submit" color="light">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
