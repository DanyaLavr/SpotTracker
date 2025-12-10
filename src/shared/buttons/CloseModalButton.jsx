"use client";
import { useRouter } from "next/navigation";
import styles from "./CloseModalButton.module.css";
export default function CloseModalButton({ className }) {
  const router = useRouter();
  return (
    <button
      className={`${styles.btn} cursor-pointer ${className}`}
      onClick={() => router.back()}
    >
      <span className="block w-7 h-1 bg-stone-950 rounded-3xl rotate-45 translate-y-0.5 relative z-2"></span>
      <span
        className={`hidden ${styles.shadow} w-7 h-1 bg-stone-950 rounded-3xl rotate-45 -translate-y-0.5 translate-x-1 absolute z-1 opacity-20`}
      ></span>
      <span className="block w-7 h-1 bg-stone-950 rounded-3xl -rotate-45 -translate-y-0.5 relative z-2"></span>
      <span
        className={`hidden ${styles.shadow} w-7 h-1 bg-stone-950 rounded-3xl -rotate-45 -translate-y-0.5 absolute z-1 opacity-20`}
      ></span>
    </button>
  );
}
