"use client";

import { memo } from "react";

const CryptoItem = memo(function CryptoItem({ base, target, last, coin_id }) {
  return (
    <li className="grid gap-4 p-4 bg-black text-stone-50 rounded-xl border border-gray-700 shadow-lg hover:scale-105 transition-transform">
      <h2 className="text-lg font-semibold">
        {base}/{target}
      </h2>
      <p className="text-sm text-stone-400">{last}</p>
      <button
        className="mt-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-50 rounded-md text-sm transition-colors cursor-pointer"
        data-id={coin_id}
        data-action="purchase"
      >
        Purchase
      </button>
    </li>
  );
});
export default CryptoItem;
