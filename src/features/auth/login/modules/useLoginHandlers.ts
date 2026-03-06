import { loginUser } from "@/entities/user/modules/redux/operations";
import { ILoginUser } from "@/shared/types";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

export const useLoginHandlers = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onFormSubmit = async (values: ILoginUser) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      router.back();
      router.refresh();
    } catch (e) {}
  };
  return { onFormSubmit };
};
