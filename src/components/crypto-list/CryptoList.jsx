"use client";
import {
  selectCryptos,
  selectCryptosIsLoading,
} from "@/lib/redux/crypto/selectors";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CryptoItem from "./CryptoItem";
import Loader from "@/shared/loader/Loader";
import { selectBackpack, selectUser } from "@/lib/redux/user/selectors";
import BackpackItem from "../backpack-item/BackpackItem";
import { useEffect } from "react";
import { getBackpack } from "@/lib/redux/user/operations";

export default function CryptoList() {
  const data = usePathname();
  const allCryptos = useSelector(selectCryptos);
  const backpackCrypto = useSelector(selectBackpack);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const cryptos =
    data === "/" ? allCryptos : data === "/backpack" ? backpackCrypto : [];
  const isLoading = useSelector(selectCryptosIsLoading);

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
  return (
    <>
      {isLoading && (
        <Loader
          color="#fff"
          cssOverride={{ justifySelf: "center", marginTop: "20px" }}
        />
      )}
      {!isLoading && cryptos?.length > 0 && (
        <ul className="flex gap-6 flex-wrap" onClick={handleClick}>
          {data === "/" &&
            cryptos.map(({ base, target, last, coin_id }) => (
              <CryptoItem
                key={coin_id}
                base={base}
                target={target}
                last={last}
                coin_id={coin_id}
              />
            ))}
          {data === "/backpack" &&
            cryptos.map(({ base, coin_id, price, count, invested }) => (
              <BackpackItem
                key={coin_id}
                base={base}
                price={price}
                count={count}
                coin_id={coin_id}
                invested={invested}
              />
            ))}
        </ul>
      )}
    </>
  );
}
