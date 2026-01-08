"use client";
import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import {
  selectBackpack,
  selectUser,
} from "@/entities/user/modules/redux/selectors";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { Form, Formik } from "formik";
import FormItem from "../form-item";
import { Button } from "../buttons";

const TradeCryptoForm = ({ config, handlers }) => {
  const { coin_id } = useParams();
  const pathname = usePathname();
  const { uid } = useSelector(selectUser);
  const backpackCrypto = useSelector(selectBackpack);
  const selectedCrypto = useSelector(selectCryptoById(coin_id)) || {};
  const dispatch = useDispatch();
  const crypto = { ...selectedCrypto };
  useEffect(() => {
    if (!pathname.includes("/purchase") || !pathname.includes("/sell")) return;
    const fetchData = async () => {
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
  const { inputs, initialValues, validationSchema } = config;
  const { handleChange, handleSubmit } = handlers;
  return (
    <Formik
      initialValues={initialValues(crypto)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid gap-6">
          {inputs.map(({ name, placeholder }, idx) => (
            <FormItem
              key={idx}
              name={name}
              placeholder={placeholder}
              type="number"
              onChange={(e) => handleChange(e, values, setFieldValue)}
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
};

export default TradeCryptoForm;
