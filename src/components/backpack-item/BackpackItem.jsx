// "use client";

import { selectCryptos } from "@/lib/redux/crypto/selectors";
import { useSelector } from "react-redux";

export default function BackpackItem({
  base,
  price,
  coin_id,
  count,
  invested,
  currentCrypto,
}) {
  // const allCryptos = useSelector(selectCryptos);
  // const currentCrypto = allCryptos?.find((elem) => elem.coin_id === coin_id);

  const getGrowthPercent = ((currentCrypto?.last - +price) / +price) * 100;
  const isPositive = getGrowthPercent > 0;
  const profit = invested * (getGrowthPercent / 100);

  return (
    <li className="grid gap-4 p-4 bg-black text-stone-50 rounded-xl border border-gray-700 shadow-lg hover:scale-105 transition-transform">
      <h2 className="text-2xl font-bold">{base}/USDT</h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <p>Count: {count}</p>
        <p>Average Price: {price}$</p>
        <p>
          Current Price: {currentCrypto?.last}
          <span
            className={`${
              isPositive ? "text-green-500" : "text-red-500"
            } ml-2 font-semibold`}
          >
            {isPositive ? "▲" : "▼"} {getGrowthPercent.toFixed(2)}%
          </span>
        </p>
        <p>
          Invested: {invested.toFixed(2)}$
          <span
            className={`${
              isPositive ? "text-green-500" : "text-red-500"
            } ml-2 font-semibold`}
          >
            {profit.toFixed(2)}$
          </span>
        </p>
      </div>

      <button
        className="mt-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-50 rounded-md text-sm transition-colors"
        data-id={coin_id}
      >
        Purchase
      </button>
    </li>
  );
}
