import { useEffect, useRef } from "react";

import ArchiveBoxArrowDownIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import LightBulbIcon from "@heroicons/react/24/outline/LightBulbIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import SidebarItem from "@/screens/protected_layout/SidebarItem";
import useLayoutStore from "@/states/layout_store";

const Sidebar = () => {
    const { sidebarCollapse, setIsSidebarInHover, isSidebarInHover } = useLayoutStore();
    const sidebarRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        sidebarRef.current?.addEventListener("mouseenter", () => {
            setIsSidebarInHover(true);
        });
        sidebarRef.current?.addEventListener("mouseleave", () => {
            setIsSidebarInHover(false);
        });
    }, [sidebarRef, setIsSidebarInHover]);

    return (
        <div className="h-full overflow-hidden bg-[#202124] transition-all duration-300">
            <ul
                className={`z-50 flex h-full flex-col bg-[#202124] pt-2 shadow-lg ${
                    sidebarCollapse
                        ? "hover:absolute hover:w-[280px] hover:shadow-2xl"
                        : "w-[280px]"
                }`}
                style={{
                    height: sidebarCollapse ? `${window.innerHeight - 68.53}px` : "100%",
                }}
                ref={sidebarRef}
            >
                <SidebarItem label="Notes" icon={LightBulbIcon} />
                <SidebarItem label="Reminders" icon={BellIcon} />
                <SidebarItem label="Edit labels" icon={PencilIcon} />
                <SidebarItem label="Archive" icon={ArchiveBoxArrowDownIcon} />
                <SidebarItem label="Trash" icon={TrashIcon} />
            </ul>
            <div className={isSidebarInHover && sidebarCollapse ? "w-[88px]" : "hidden"}></div>
        </div>
    );
};

export default Sidebar;
