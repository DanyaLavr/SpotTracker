"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useCallback } from "react";
import Search from "../Search.svg";
import Loader from "../loader/Loader";
export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("query") ?? "";
  const [value, setValue] = useState(query);

  const setSearchParams = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams);
      params.delete("query");
      params.set("search", value.trim());
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value.trim()) {
        params.delete("query");
      } else {
        params.set("query", value);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, router]);

  return (
    <Suspense fallback={<Loader />}>
      <form
        className="flex w-full items-center gap-2 "
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (!value.trim()) return;
          router.push(`?${setSearchParams(value)}`, { scroll: false });
        }}
      >
        <input
          className="outline-0 w-full text-stone-50 text-3xl md:text-2xl lg:text-lg placeholder:text-stone-50"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search…"
        />
        <button className="cursor-pointer">
          {/* <Search className="fill-stone-50 w-10 h-10 lg:w-8 lg:h-8" /> */}
        </button>
      </form>
    </Suspense>
  );
}
