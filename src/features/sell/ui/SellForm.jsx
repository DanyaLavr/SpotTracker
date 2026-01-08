"use client";
import { TradeCryptoForm } from "@/shared/ui";
import { sellFormConfig } from "../config/sellFormConfig";
import { useSellFormHandlers } from "../modules/useSellFormHandlers";

const SellForm = () => {
  const handlers = useSellFormHandlers();
  return <TradeCryptoForm config={sellFormConfig} handlers={handlers} />;
};

export default SellForm;
