"use client";
import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import SellForm from "@/features/sell/ui/SellForm";
import { ModalBackground, ModalHeader, Overlay } from "@/shared/ui";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

const SellModal = () => {
  const { coin_id } = useParams();
  const crypto = useAppSelector(selectCryptoById(coin_id as string));

  return (
    <Overlay>
      <ModalBackground>
        <ModalHeader
          action="Sell"
          item={crypto?.base}
          description="Set the amount and confirm the sale"
        />
        <SellForm />
      </ModalBackground>
    </Overlay>
  );
};

export default SellModal;
