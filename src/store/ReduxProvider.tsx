"use client";

import { ReactNode } from "react";
import { setupStore } from "./store";
import { Provider } from "react-redux";
interface IProps {
  children: ReactNode;
}
export default function ReduxProvider({ children }: IProps) {
  return <Provider store={setupStore()}>{children}</Provider>;
}
