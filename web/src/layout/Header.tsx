import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import SearchInput from "../components/SearchInput";
import HeaderIcon from "../components/HeaderIcon";

const Header = () => {
    return (
        <nav className="flex items-center justify-between py-2 border-b border-[#5f6367] px-5">
            <div className="flex items-center gap-4">
                <HeaderIcon icon={Bars3Icon} />
                <div className="text-xl font-normal cursor-pointer mr-16">
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
                    <div className="ml-16 p-1 rounded-full">
                        <img
                            src="/favicon.svg"
                            alt="profile picture"
                            className="w-8 h-8"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
