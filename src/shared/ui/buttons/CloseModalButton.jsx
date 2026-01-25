"use client";
import { useRouter } from "next/navigation";
import styles from "./CloseModalButton.module.css";
export default function CloseModalButton({ handleClose = null, className }) {
  const router = useRouter();
  const onClick = handleClose ? handleClose : () => router.back();

  return (
    <button
      className={`${styles.btn} cursor-pointer ${className}`}
      onClick={onClick}
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
