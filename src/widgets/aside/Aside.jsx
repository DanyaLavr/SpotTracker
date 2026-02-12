import Navigation from "@/features/navigation/navigation";

export default function Aside() {
  return (
    <aside className="hidden md:block bg-gray-950 w-[20%] max-w-67.5 pt-40 pl-5">
      <Navigation />
    </aside>
  );
}
