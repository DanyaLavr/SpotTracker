import SearchInput from "@/shared/search-input/SearchInput";
import Suggestions from "@/shared/suggestions/Suggestions";

export default function Finder() {
  return (
    <div className="flex-1 relative px-6 py-4 rounded-2xl bg-stone-900 ">
      <SearchInput />
      <Suggestions />
    </div>
  );
}
