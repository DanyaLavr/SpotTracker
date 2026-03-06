"use client";
import { TradeCryptoForm } from "@/shared/ui";
import { sellFormConfig } from "../config/sellFormConfig";
import { useSellFormHandlers } from "../modules/useSellFormHandlers";
import { ISellData } from "@/shared/types";

const SellForm = () => {
  const handlers = useSellFormHandlers();
  return (
    <TradeCryptoForm<ISellData>
      config={sellFormConfig}
      handlers={handlers}
      extraButtons={true}
    />
  );
};

export default SellForm;
