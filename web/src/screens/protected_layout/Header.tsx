import HeaderIcon from "@/screens/protected_layout/HeaderIcon";
import SearchInput from "@/screens/protected_layout/SearchInput";
import Profile from "@/screens/protected_layout/Profile";
import useLayoutStore from "@/states/layout_store";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import LogoIcon from "@/components/icons/LogoIcon";

const Header = () => {
    const { toggleSidebarCollapse } = useLayoutStore(state => state);
    return (
        <nav className="flex items-center justify-between border-b border-[#5f6367] px-5 py-2">
            <div className="flex items-center gap-4">
                <HeaderIcon icon={Bars3Icon} onClick={toggleSidebarCollapse} />

                <div className="mr-16 flex cursor-pointer gap-2 text-xl font-normal">
                    <div className="w-6">
                        <LogoIcon />
                    </div>
                    Keep
                </div>
                <SearchInput />
            </div>
            <div className="flex">
                <div className="flex items-center gap-4">
                    <HeaderIcon icon={ArrowPathIcon} />
                    <HeaderIcon icon={QueueListIcon} />
                    <HeaderIcon icon={Cog6ToothIcon} />
                </div>
                <div>
                    <div className="rounded-full p-1">
                        <Profile />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
