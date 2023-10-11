import HeaderIcon from "@/screens/protected_layout/HeaderIcon";
import SearchInput from "@/screens/protected_layout/SearchInput";
import useLayoutStore from "@/states/layout_store";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

const Header = () => {
    const { toggleSidebarCollapse } = useLayoutStore(state => state);
    return (
        <nav className="flex items-center justify-between border-b border-[#5f6367] px-5 py-2">
            <div className="flex items-center gap-4">
                <HeaderIcon icon={Bars3Icon} onClick={toggleSidebarCollapse} />
                <div className="mr-16 cursor-pointer text-xl font-normal">
                    Keep
                </div>
                <SearchInput />
            </div>
            <div className="flex">
                <div className="flex gap-4">
                    <HeaderIcon icon={ArrowPathIcon} />
                    <HeaderIcon icon={QueueListIcon} />
                    <HeaderIcon icon={Cog6ToothIcon} />
                </div>
                <div>
                    <div className="ml-16 rounded-full p-1">
                        <UserCircleIcon className="w-10 cursor-pointer rounded-full" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;