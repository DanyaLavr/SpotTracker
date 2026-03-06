"use client";

import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import PurchaseForm from "@/features/purchase/ui/PurchaseForm";
import { ModalBackground, ModalHeader, Overlay } from "@/shared/ui";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function PurchaseModal() {
  const { coin_id } = useParams();
  const crypto = useSelector(selectCryptoById(coin_id as string));

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
