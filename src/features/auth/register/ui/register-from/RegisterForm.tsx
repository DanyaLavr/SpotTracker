import { registerFormConfig } from "../../config";

import { AuthForm } from "@/shared/ui";
import { useRegisterHandlers } from "../../modules";

const RegisterForm = () => {
  const { onFormSubmit } = useRegisterHandlers();
  return <AuthForm config={registerFormConfig} onSubmit={onFormSubmit} />;
};

export default RegisterForm;
