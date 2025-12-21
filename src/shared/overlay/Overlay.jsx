"use client";

import { useRouter } from "next/navigation";

export default function Overlay({ children }) {
  const router = useRouter();
  return (
    <div
      className="fixed grid justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/50 backdrop-blur-[2px]"
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </div>
  );
}
