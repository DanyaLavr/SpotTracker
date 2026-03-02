import {
  createBackpack,
  registerUser,
} from "@/entities/user/modules/redux/operations";
import { IRegisterUser } from "@/shared/types";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

export const useRegisterHandlers = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onFormSubmit = async (values: IRegisterUser) => {
    try {
      const res = await dispatch(registerUser(values)).unwrap();
      router.back();
      router.refresh();
      await dispatch(createBackpack(res.uid));
    } catch {}
  };
  return { onFormSubmit };
};
