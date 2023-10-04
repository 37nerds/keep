import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import SearchInput from "../components/SearchInput";

const Header = () => {
  return (
    <nav className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="hover:bg-slate-200 p-3 rounded-full cursor-pointer transition">
          <Bars3Icon className="w-6" />
        </div>
        <div className="text-xl font-normal cursor-pointer">Keep</div>
        <SearchInput />
      </div>
      <div></div>
    </nav>
  );
};

export default Header;
