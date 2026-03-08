"use client";
import { ErrorMessage, Field } from "formik";
import styles from "./formik.module.css";
import { ChangeEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IProps {
  name: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormItem({
  name,
  placeholder,
  type,
  onChange,
}: IProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword =
    type === "password" || name === "password" || name === "copyPassword";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : (type ?? name);

  return (
    <div className={`${styles.wrapper} relative grid gap-1.5`}>
      <div className="relative">
        <Field
          className={`${styles.input} w-full bg-white text-stone-950 border-2 border-gray-800 rounded-xl px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400`}
          type={inputType}
          name={name}
          placeholder={placeholder || name[0].toUpperCase() + name.slice(1)}
          {...(onChange && { onChange })}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      <ErrorMessage
        className={`${styles.error} text-red-500 text-xs font-medium mt-0.5 absolute -bottom-5`}
        name={name}
        component="div"
      />
    </div>
  );
}
