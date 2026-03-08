"use client";
import { ErrorMessage, Field } from "formik";
import styles from "./formik.module.css";
import { ChangeEvent } from "react";
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
  return (
    <div className={`${styles.wrapper} grid gap-1.5 `}>
      <Field
        className={`${styles.input} bg-white text-stone-950 border-2 border-gray-800 rounded-xl px-4 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400 `}
        type={type ? type : name}
        name={name}
        placeholder={placeholder || name[0].toUpperCase() + name.slice(1)}
        {...(onChange && { onChange })}
      />
      <ErrorMessage
        className={`${styles.error} text-red-500 text-xs font-medium mt-0.5`}
        name={name}
        component="div"
      />
    </div>
  );
}
