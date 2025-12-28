"use client";
import PurchaseForm from "@/components/purchase-form/PurchaseForm";
import ModalBackground from "@/shared/modal-background/ModalBackground";
import Overlay from "@/shared/overlay/Overlay";

export default function PurchaseModal() {
  return (
    <>
      <Overlay>
        <ModalBackground>
          <PurchaseForm />
        </ModalBackground>
      </Overlay>
    </>
  );
}
