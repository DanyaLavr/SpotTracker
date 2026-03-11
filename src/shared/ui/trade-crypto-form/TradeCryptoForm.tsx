"use client";
import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import {
  selectBackpack,
  selectBackpackError,
  selectUser,
} from "@/entities/user/modules/redux/selectors";
import { useParams, usePathname } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import Loader from "../loader";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import FormItem from "../form-item";
import { Button } from "../buttons";
import ExtraButtons from "./ExtraButtons";
import { ITradeConfig } from "@/shared/types";
import { AnyObject } from "yup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBackpack } from "@/entities/user/modules/redux/operations";
import { TStringify } from "@/shared/types/utils";
interface IHandlers<T extends FormikValues> {
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    values: TStringify<T>,
    setFieldValue: FormikHelpers<T>["setFieldValue"],
  ) => void;
  handleSubmit: (values: TStringify<T>) => void;
}
interface IProps<T extends AnyObject> {
  config: ITradeConfig<T>;
  handlers: IHandlers<T>;
  extraButtons?: boolean;
}
const TradeCryptoForm = <T extends AnyObject>({
  config,
  handlers,
  extraButtons = false,
}: IProps<T>) => {
  const { coin_id } = useParams();
  const pathname = usePathname();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;
  const backpackCrypto = useAppSelector(selectBackpack);
  const error = useAppSelector(selectBackpackError);
  const cryptoForSell = backpackCrypto?.find(
    (elem) => elem.coin_id === coin_id,
  );
  const selectedCrypto = useAppSelector(selectCryptoById(coin_id as string));
  const dispatch = useAppDispatch();
  const crypto = { ...selectedCrypto! };
  useEffect(() => {
    if (!user || !uid) return;
    if (!pathname.includes("/purchase") || !pathname.includes("/sell")) return;
    const fetchData = async () => {
      if (!backpackCrypto) await dispatch(getBackpack(uid));
    };
    fetchData();
  }, [pathname, dispatch, uid]);

  if (!crypto || !crypto?.coin_id)
    return (
      <Loader
        color="#000"
        cssOverride={{
          marginBottom: "40px",
          marginTop: "40px",
        }}
      />
    );
  const { inputs, initialValues, validationSchema } = config;
  const { handleChange, handleSubmit } = handlers;
  return (
    <Formik<TStringify<T>>
      initialValues={initialValues(crypto)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid gap-8">
          {inputs.map(({ name, placeholder, buttons }, idx) => (
            <div className="" key={name}>
              <FormItem
                name={name}
                placeholder={placeholder}
                type="number"
                onChange={(e) => handleChange(e, values, setFieldValue)}
              />
              {extraButtons && buttons?.length && (
                <ExtraButtons
                  buttons={buttons}
                  name={name}
                  cryptoForSell={cryptoForSell!}
                  crypto={crypto}
                  backpackKey="count"
                  handlers={handlers}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              )}
            </div>
          ))}
          {error && (
            <div className="text-rose-700 text-sm font-medium bg-red-50 border-2 border-rose-700 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

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
