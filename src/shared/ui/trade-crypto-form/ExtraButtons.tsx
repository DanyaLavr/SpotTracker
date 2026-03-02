import { ICryptoBackpack, ICryptoTicker } from "@/shared/types";
import { FormikProps, FormikValues } from "formik";
import { ChangeEvent } from "react";
import { string } from "yup";

interface IProps<T extends FormikValues, K extends keyof ICryptoBackpack> {
  buttons: number[];
  name: keyof T & string;
  backpackKey: K;
  cryptoForSell: ICryptoBackpack;
  crypto: ICryptoTicker;
  handlers: {
    handleChange: (
      e: ChangeEvent<HTMLInputElement>,
      values: T,
      setFieldValue: any,
    ) => void;
  };
  setFieldValue: FormikProps<T>["setFieldValue"];
  values: T;
}
const ExtraButtons = <T extends FormikValues, K extends keyof ICryptoBackpack>({
  buttons,
  name,
  backpackKey,
  cryptoForSell,
  crypto,
  handlers,
  setFieldValue,
  values,
}: IProps<T, K>) => {
  const { handleChange } = handlers;
  return (
    <ul className="flex gap-2 mt-2">
      {buttons.map((elem, idx) => (
        <li key={idx}>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 active:bg-zinc-600 active:scale-95 cursor-pointer"
            onClick={() => {
              const value =
                name !== "sellAmount"
                  ? ((cryptoForSell[backpackKey] as number) * elem) / 100
                  : (crypto.last * (cryptoForSell.count as number) * elem) /
                    100;

              setFieldValue(name, value);
              handleChange(
                {
                  target: {
                    name,
                    value: String(value),
                  },
                } as ChangeEvent<HTMLInputElement>,
                values,
                setFieldValue,
              );
            }}
          >
            {elem}%
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExtraButtons;
