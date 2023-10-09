import ArchiveBoxArrowDownIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import LightBulbIcon from "@heroicons/react/24/outline/LightBulbIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import SidebarItem from "../components/SidebarItem";
import useLayoutStore from "../states/layout_store";
import { useEffect, useRef } from "react";

const Sidebar = () => {
    const { sidebarCollapse, setIsSidebarInHover } = useLayoutStore();
    const sidebarRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        sidebarRef.current?.addEventListener("mouseenter", () => {
            setIsSidebarInHover(true);
        });
        sidebarRef.current?.addEventListener("mouseleave", () => {
            setIsSidebarInHover(false);
        });
    }, [sidebarRef]);

    return (
        <>
            <ul
                className={`z-50 flex h-screen flex-col pt-2 shadow-lg ${
                    sidebarCollapse
                        ? "hover:absolute hover:w-[280px] hover:shadow-2xl"
                        : "w-[280px]"
                }`}
                ref={sidebarRef}
            >
                <SidebarItem label="Notes" icon={LightBulbIcon} />
                <SidebarItem label="Reminders" icon={BellIcon} />
                <SidebarItem label="Edit labels" icon={PencilIcon} />
                <SidebarItem label="Archive" icon={ArchiveBoxArrowDownIcon} />
                <SidebarItem label="Trash" icon={TrashIcon} />
            </ul>
            <div className={``}>Sidebar</div>
        </>
    );
};

export default Sidebar;
