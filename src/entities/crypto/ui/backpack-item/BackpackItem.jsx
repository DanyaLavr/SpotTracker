export default function BackpackItem({
  base,
  price,
  coin_id,
  count,
  invested,
  currentCrypto,
}) {
  const getGrowthPercent = ((currentCrypto?.last - +price) / +price) * 100;
  const isPositive = getGrowthPercent > 0;
  const profit = invested * (getGrowthPercent / 100);

  return (
    <li className="grid gap-4 w-full md:w-auto p-4 bg-black text-stone-50 rounded-xl border border-gray-700 shadow-lg hover:scale-105 transition-transform">
      <h2 className="text-2xl font-bold">{base}/USDT</h2>

      <div className="grid  md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
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
      <div className="flex gap-3">
        <button
          className="mt-4 py-3 flex-2 bg-stone-800 hover:bg-stone-700 text-stone-50 rounded-md text-sm transition-colors cursor-pointer"
          data-id={coin_id}
          data-action="purchase"
        >
          Purchase
        </button>
        <button
          className="mt-4 py-3 flex-1 bg-stone-800 hover:bg-stone-700 hover:border-red-800 hover:border-2 text-stone-50  rounded-md text-sm transition-colors cursor-pointer"
          data-id={coin_id}
          data-action="sell"
        >
          Sell
        </button>
      </div>
    </li>
  );
}
