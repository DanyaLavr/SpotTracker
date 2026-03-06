"use client";

import LoginForm from "@/features/auth/login/ui/login-form";
import { ModalBackground, ModalHeader, Overlay } from "@/shared/ui";

export default function LoginModal() {
  return (
    <Overlay>
      <ModalBackground>
        <ModalHeader
          action="Sign in"
          description="Enter your credentials to access your account"
        />
        <LoginForm />
      </ModalBackground>
    </Overlay>
  );
}
