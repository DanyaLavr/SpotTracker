import { useRouter } from "next/navigation";

export const useSuggestionsHandlers = () => {
  const router = useRouter();

  const handleSuggestionClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const li = (e.target as HTMLElement).closest("li");
    const id = li?.dataset.id;
    if (id) router.push(`/chart/${id.slice(0, -11)}`);
  };
  const handleBgClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".finder")) router.back();
  };
  return { handleSuggestionClick, handleBgClick };
};
