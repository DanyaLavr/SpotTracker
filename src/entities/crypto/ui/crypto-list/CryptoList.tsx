"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CryptoItem from "../crypto-item/CryptoItem";
import Loader from "@/shared/ui/loader/Loader";
import {
  selectBackpack,
  selectUser,
} from "@/entities/user/modules/redux/selectors";
import BackpackItem from "../backpack-item/BackpackItem";
import React, { useEffect, useMemo } from "react";
import { getBackpack } from "@/entities/user/modules/redux/operations";
import { addAllCryptos } from "@/entities/crypto/modules/redux/cryptosSlice";
import { nanoid } from "@reduxjs/toolkit";
import { ICryptoBackpack, ICryptoTicker } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCryptos } from "../../modules/redux/selectors";

export default function CryptoList() {
  const data = usePathname();
  const backpackCrypto = useAppSelector(selectBackpack);
  const user = useAppSelector(selectUser);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector(selectCryptos);
  const currentCryptos =
    data === "/" ? cryptos : data === "/backpack" ? (backpackCrypto ?? []) : [];

  const filteredCryptos = useMemo(() => {
    if (!search) return currentCryptos;

    const name = search.toLowerCase();
    const base = search.toUpperCase();

    return currentCryptos.filter(
      (elem) => elem.base.includes(base) || elem.coin_id.includes(name),
    );
  }, [search, currentCryptos]);

  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    const id = target?.dataset.id;

    if (target.closest("button[data-action='purchase']"))
      router.push(`/purchase/${id}`);

    if (target.closest("button[data-action='sell']"))
      router.push(`/sell/${id}`);
  };
  useEffect(() => {
    if (data !== "/backpack") return;
    if (!user) return;
    const fetchData = async () => {
      if (!backpackCrypto) await dispatch(getBackpack(user.uid));
    };
    fetchData();
  }, [data, backpackCrypto, dispatch, user]);
  useEffect(() => {
    dispatch(addAllCryptos(cryptos));
  }, [dispatch, cryptos]);
  if (!filteredCryptos) {
    return (
      <Loader
        color="#fff"
        cssOverride={{ justifySelf: "center", marginTop: "20px" }}
      />
    );
  }
  return (
    <>
      <ul
        className="grid grid-cols-1 sm:flex gap-6 flex-wrap"
        onClick={handleClick}
      >
        {data === "/" &&
          (filteredCryptos as ICryptoTicker[])?.map(
            ({ base, target, last, coin_id }) => {
              const id = nanoid();
              return (
                <CryptoItem
                  key={id}
                  base={base}
                  target={target}
                  last={last}
                  coin_id={coin_id}
                />
              );
            },
          )}
        {data === "/backpack" &&
          (filteredCryptos as ICryptoBackpack[])?.map(
            ({ base, coin_id, price, count, invested }) => {
              const id = nanoid();
              const current = cryptos.find((elem) => elem.coin_id === coin_id);

              if (!current) return null;
              return (
                <BackpackItem
                  key={id}
                  base={base}
                  price={price}
                  count={count}
                  coin_id={coin_id}
                  invested={invested}
                  currentCrypto={current}
                />
              );
            },
          )}
      </ul>
    </>
  );
}
