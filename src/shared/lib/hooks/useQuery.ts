"use client";
import { useSearchParams } from "next/navigation";

export const useQuery = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";
  return query;
};
