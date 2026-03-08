import { ReactNode } from "react";

interface IBaseButton {
  color: "light" | "dark";
  background?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

interface IClickButton extends IBaseButton {
  type?: "button" | "reset";
  onClick: () => void;
}

interface ISubmitButton extends IBaseButton {
  type: "submit";
  onClick?: never;
}

type IProps = IClickButton | ISubmitButton;
export default function Button({
  color,
  background = true,
  disabled,
  className,
  onClick,
  type = "button",
  children,
}: IProps) {
  const colorStyle =
    color === "dark" ? "-gray-900" : color === "light" ? "-stone-50" : color;
  const bgStyle =
    color === "dark"
      ? "bg-stone-50"
      : color === "light"
        ? "bg-gray-900 "
        : color;
  return (
    <button
      type={type}
      className={`${background && bgStyle}  text${colorStyle} ${
        !background && `border${colorStyle}`
      } py-4 px-11 rounded-[28px] cursor-pointer ${
        disabled && "opacity-50 cursor-not-allowed"
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
