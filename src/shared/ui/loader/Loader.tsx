import { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";

interface IProps {
  size?: string;
  color: string;
  cssOverride?: CSSProperties;
}
export default function Loader({ size, color, cssOverride }: IProps) {
  return (
    <SyncLoader
      size={size}
      color={color}
      cssOverride={{
        ...cssOverride,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}
