"use client";
import { IPurchaseData } from "@/shared/types";
import { purchaseFormConfig } from "../config";
import { usePurchaseFormHandlers } from "../modules";

import { TradeCryptoForm } from "@/shared/ui";

export default function PurchaseForm() {
  const handlers = usePurchaseFormHandlers();
  return (
    <TradeCryptoForm<IPurchaseData>
      config={purchaseFormConfig}
      handlers={handlers}
    />
  );
}
