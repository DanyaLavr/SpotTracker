import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import { updateBackpackOnSell } from "@/entities/user/modules/redux/operations";
import { selectUser } from "@/entities/user/modules/redux/selectors";
import { ISellData } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormikHelpers } from "formik";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const useSellFormHandlers = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;
  const params = useParams();
  const coin_id = params.coin_id as string;
  const selectedCrypto = useAppSelector(selectCryptoById(coin_id));

  const handleSubmit = async (values: ISellData) => {
    if (!uid || !selectedCrypto) return;
    await dispatch(
      updateBackpackOnSell({
        id: uid,
        data: {
          coin_id,
          base: selectedCrypto.base,
          price: Number(values.price),
          count: Number(values.count),
        },
      }),
    ).unwrap();
    router.back();
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    values: ISellData,
    setFieldValue: FormikHelpers<ISellData>["setFieldValue"],
  ) => {
    const { name, value } = e.target;
    setFieldValue(name, value);

    const updated = {
      ...values,
      [name]: +value,
    };

    if (updated.sellAmount && updated.price && name !== "count") {
      setFieldValue("count", +updated.sellAmount / +updated.price);
      return;
    }
    if (updated.count && updated.price && name !== "invested") {
      setFieldValue("sellAmount", +updated.count * +updated.price);
      return;
    }
    if (updated.count && updated.sellAmount && name !== "price") {
      setFieldValue("price", +updated.sellAmount / +updated.count);
      return;
    }
  };
  return { handleSubmit, handleChange };
};
