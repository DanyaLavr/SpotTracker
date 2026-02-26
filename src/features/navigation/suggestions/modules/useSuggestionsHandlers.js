import { useRouter } from "next/navigation";

export const useSuggestionsHandlers = () => {
  const router = useRouter();

  const handleSuggestionClick = (e) => {
    e.stopPropagation();
    const li = e.target.closest("li");
    const id = li.dataset.id;
    router.push(`/chart/${id}`);
  };
  const handleBgClick = (e) => {
    if (!e.target.closest(".finder") && !e.target.closest("li")) router.back();
  };
  return { handleSuggestionClick, handleBgClick };
};
