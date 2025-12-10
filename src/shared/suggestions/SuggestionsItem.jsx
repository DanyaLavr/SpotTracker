"use client";
import { useState } from "react";

export default function SuggestionsItem({ elem }) {
  const [isShow, setIsShow] = useState(true);
  const { base, coin_id, last } = elem;

  return (
    <li className="flex items-center bg-stone-950 text-stone-50 px-6 py-4 rounded-2xl cursor-pointer">
      {isShow && (
        <img
          className="aspect-square w-7 mr-5"
          src={`https://cryptologos.cc/logos/${coin_id}-${base.toLowerCase()}-logo.png?v=040`}
          alt=""
          onError={() => setIsShow(false)}
        />
      )}

      <p>{base}/USDT</p>
      <p className="ml-14">{last}</p>
    </li>
  );
}
