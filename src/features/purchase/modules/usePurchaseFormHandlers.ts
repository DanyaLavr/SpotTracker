import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import { updateBackpackOnPurchase } from "@/entities/user/modules/redux/operations";
import { selectUser } from "@/entities/user/modules/redux/selectors";
import { ICryptoBackpack, IPurchaseData } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormikHelpers } from "formik";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const usePurchaseFormHandlers = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;
  const params = useParams();
  const coin_id = params.coin_id as string;
  const selectedCrypto = useAppSelector(selectCryptoById(coin_id));

  const handleSubmit = async (values: {
    [K in keyof IPurchaseData]: string;
  }) => {
    if (!uid || !selectedCrypto) return;
    await dispatch(
      updateBackpackOnPurchase({
        id: uid,
        data: {
          coin_id,
          base: selectedCrypto.base,
          price: Number(values.price),
          count: Number(values.count),
          invested: Number(values.invested),
        },
      }),
    ).unwrap();
    router.back();
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    values: {
      [K in keyof IPurchaseData]: string;
    },
    setFieldValue: FormikHelpers<IPurchaseData>["setFieldValue"],
  ) => {
    const { name, value } = e.target;
    setFieldValue(name, value);

    const updated = {
      price: Number(values.price),
      count: Number(values.count),
      invested: Number(values.invested),
      ...{ [name]: Number(value) }, // актуальное изменённое поле
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
  };
  return { handleSubmit, handleChange };
};
