import { Suspense } from "react";

import { SearchInput } from "@/shared/ui";
import Suggestions from "../suggestions/ui";

export default function Finder() {
  return (
    <div className="flex-1 relative bg-stone-900  rounded-3xl px-7 py-5 lg:rounded-2xl lg:px-6 lg:py-4 ">
      <Suspense>
        <SearchInput />
        <Suggestions />
      </Suspense>
    </div>
  );
}
