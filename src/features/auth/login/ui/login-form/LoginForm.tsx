import { loginFormConfig } from "../../config";
import { useLoginHandlers } from "../../modules";

import { AuthForm } from "@/shared/ui";

const LoginForm = () => {
  const { onFormSubmit } = useLoginHandlers();
  return <AuthForm config={loginFormConfig} onSubmit={onFormSubmit} />;
};

export default LoginForm;
