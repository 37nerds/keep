import ArchiveBoxArrowDownIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import LightBulbIcon from "@heroicons/react/24/outline/LightBulbIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import SidebarItem from "../components/SidebarItem";

const Sidebar = () => {
    return (
        <ul className="flex flex-col pt-2">
            <SidebarItem
                label="Notes"
                icon={LightBulbIcon}
            />
            <SidebarItem
                label="Reminders"
                icon={BellIcon}
            />
            <SidebarItem
                label="Edit labels"
                icon={PencilIcon}
            />
            <SidebarItem
                label="Archive"
                icon={ArchiveBoxArrowDownIcon}
            />
            <SidebarItem
                label="Trash"
                icon={TrashIcon}
            />
        </ul>
    );
};

export default Sidebar;
