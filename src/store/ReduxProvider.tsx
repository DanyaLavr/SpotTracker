"use client";

import { ReactNode, useRef } from "react";
import { setupStore } from "./store";
import { Provider } from "react-redux";
import { AppStore } from "./store";

interface IProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: IProps) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
