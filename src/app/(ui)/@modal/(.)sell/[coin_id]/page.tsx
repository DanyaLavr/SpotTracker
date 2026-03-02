"use client";
import { selectCryptoById } from "@/entities/crypto/modules/redux/selectors";
import SellForm from "@/features/sell/ui/SellForm";
import { ModalBackground, ModalHeader, Overlay } from "@/shared/ui";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const SellModal = () => {
  const { coin_id } = useParams();
  const crypto = useSelector(selectCryptoById(coin_id as string));

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
