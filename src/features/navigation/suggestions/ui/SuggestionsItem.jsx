"use client";
import Image from "next/image";
import { useState } from "react";

export default function SuggestionsItem({ elem }) {
  const [isShow, setIsShow] = useState(true);
  const { base, coin_id, last } = elem;

  return (
    <li
      className={`${
        isShow ? "grid" : "flex"
      } md:flex items-center bg-stone-950 text-stone-50 px-6 py-4 rounded-2xl cursor-pointer`}
      data-id={`${base}USDT`}
    >
      <div className="flex">
        {isShow && (
          <Image
            className="aspect-square w-7 mr-5"
            width={25}
            height={25}
            src={`https://cryptologos.cc/logos/${coin_id}-${base.toLowerCase()}-logo.png?v=040`}
            alt={base}
            onError={() => setIsShow(false)}
          />
        )}

        <p>{base}/USDT</p>
      </div>

      <p className={`${isShow ? "mt-5" : "ml-7"} md:mt-0 md:ml-14`}>{last}</p>
    </li>
  );
}
