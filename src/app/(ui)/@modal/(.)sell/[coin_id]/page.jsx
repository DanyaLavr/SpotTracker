"use client";
import SellForm from "@/features/sell/ui/SellForm";
import { ModalBackground, Overlay } from "@/shared/ui";

const SellModal = () => {
  return (
    <Overlay>
      <ModalBackground>
        <SellForm />
      </ModalBackground>
    </Overlay>
  );
};

export default SellModal;
