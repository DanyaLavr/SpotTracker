// entities/crypto/ui/CryptoPolling.tsx
"use client";
import { useEffect } from "react";
import { addAllCryptos } from "../modules/redux/cryptosSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCryptos } from "../api/getCrypto";
import { ICryptoTicker } from "@/shared/types";
import { selectCryptos } from "./redux/selectors";

interface IProps {
  initialCryptos: ICryptoTicker[];
}

export default function CryptoPolling({ initialCryptos }: IProps) {
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector(selectCryptos);
  const isCryptosFulfilled = !!cryptos.length;
  useEffect(() => {
    if (!isCryptosFulfilled) dispatch(addAllCryptos(initialCryptos));
  }, []);

  useEffect(() => {
    const poll = async () => {
      const data = await getCryptos();
      dispatch(addAllCryptos(data));
    };

    const interval = setInterval(poll, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}
