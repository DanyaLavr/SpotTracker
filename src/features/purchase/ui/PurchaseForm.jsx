"use client";
import { purchaseFormConfig } from "../config";
import { usePurchaseFormHandlers } from "../modules";

import { TradeCryptoForm } from "@/shared/ui";

export default function PurchaseForm() {
  const handlers = usePurchaseFormHandlers();
  return <TradeCryptoForm config={purchaseFormConfig} handlers={handlers} />;
}
