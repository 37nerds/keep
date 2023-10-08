import ArchiveBoxArrowDownIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import LightBulbIcon from "@heroicons/react/24/outline/LightBulbIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useState } from "react";
import SidebarItem from "../components/SidebarItem";
import { TActiveTab } from "../types";

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState<TActiveTab>("Notes");

    return (
        <ul className="flex flex-col pt-2">
            <SidebarItem
                label="Notes"
                icon={LightBulbIcon}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <SidebarItem
                label="Reminders"
                icon={BellIcon}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <SidebarItem
                label="Edit labels"
                icon={PencilIcon}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <SidebarItem
                label="Archive"
                icon={ArchiveBoxArrowDownIcon}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <SidebarItem
                label="Trash"
                icon={TrashIcon}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </ul>
    );
};

export default Sidebar;
