"use client";

import RegisterForm from "@/features/auth/register/ui/register-from";
import { ModalBackground, ModalHeader, Overlay } from "@/shared/ui";

export default function RegistrationModal() {
  return (
    <Overlay>
      <ModalBackground>
        <ModalHeader
          action="Create account"
          description="Create an account to start trading crypto"
        />
        <RegisterForm />
      </ModalBackground>
    </Overlay>
  );
}
