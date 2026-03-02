import Finder from "@/features/navigation/finder/Finder";
import UserInfo from "@/entities/user/ui/user-info/UserInfo";
import BurgerMenu from "@/features/navigation/burger-menu";

export default function Header() {
  return (
    <header className="flex items-center gap-20 py-8 px-4 bg-gray-950">
      <Finder />
      <UserInfo className={"hidden md:grid"} />
    </header>
  );
}
