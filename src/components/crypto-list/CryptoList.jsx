"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CryptoItem from "./CryptoItem";
import Loader from "@/shared/loader/Loader";
import { selectBackpack, selectUser } from "@/lib/redux/user/selectors";
import BackpackItem from "../backpack-item/BackpackItem";
import { useEffect, useMemo } from "react";
import { getBackpack } from "@/lib/redux/user/operations";
import { addAllCryptos } from "@/lib/redux/crypto/cryptosSlice";

export default function CryptoList({ cryptos }) {
  const data = usePathname();
  const backpackCrypto = useSelector(selectBackpack);
  const user = useSelector(selectUser);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useDispatch();
  const currentCryptos =
    data === "/" ? cryptos : data === "/backpack" ? backpackCrypto : [];

  const filteredCryptos = useMemo(() => {
    if (!search) return currentCryptos;

    const name = search.toLowerCase();
    const base = search.toUpperCase();

    return currentCryptos.filter(
      (elem) => elem.base.includes(base) || elem.coin_id.includes(name)
    );
  }, [search, currentCryptos]);

  const router = useRouter();
  const handleClick = (e) => {
    if (e.target.closest("button"))
      router.push(`/purchase/${e.target.dataset.id}`);
  };
  useEffect(() => {
    if (data !== "/backpack") return;
    const fetchData = async () => {
      if (!backpackCrypto) await dispatch(getBackpack(user.uid));
    };
    fetchData();
  }, [data, backpackCrypto, dispatch, user]);
  useEffect(() => {
    dispatch(addAllCryptos(cryptos));
  }, [dispatch, cryptos]);
  if (!cryptos) {
    return (
      <Loader
        color="#fff"
        cssOverride={{ justifySelf: "center", marginTop: "20px" }}
      />
    );
  }
  return (
    <>
      <ul className="flex gap-6 flex-wrap" onClick={handleClick}>
        {data === "/" &&
          filteredCryptos?.map(({ base, target, last, coin_id }) => (
            <CryptoItem
              key={coin_id}
              base={base}
              target={target}
              last={last}
              coin_id={coin_id}
            />
          ))}
        {data === "/backpack" &&
          filteredCryptos?.map(({ base, coin_id, price, count, invested }) => (
            <BackpackItem
              key={coin_id}
              base={base}
              price={price}
              count={count}
              coin_id={coin_id}
              invested={invested}
              currentCrypto={cryptos.find((elem) => elem.coin_id === coin_id)}
            />
          ))}
      </ul>
    </>
  );
}
