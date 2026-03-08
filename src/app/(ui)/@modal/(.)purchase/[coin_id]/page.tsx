"use client";

import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import PurchaseForm from "@/features/purchase/ui/PurchaseForm";
import { ModalBackground, ModalHeader, Overlay } from "@/shared/ui";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

export default function PurchaseModal() {
  const { coin_id } = useParams();
  const crypto = useAppSelector(selectCryptoById(coin_id as string));

  return (
    <>
      <Overlay>
        <ModalBackground>
          <ModalHeader
            action="Checkout"
            item={crypto?.base}
            description="Review the details and confirm your purchase"
          />
          <PurchaseForm />
        </ModalBackground>
      </Overlay>
    </>
  );
}
