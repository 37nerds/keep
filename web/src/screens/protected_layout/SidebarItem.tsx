import { TActiveTab, TIcon } from "@/types";
import useLayoutStore from "@/states/layout_store";

const SidebarItem = ({
    label,
    icon: Icon,
}: {
    label: TActiveTab;
    icon: TIcon;
}) => {
    const { sidebarCollapse, activeTab, setActiveTab, isSidebarInHover } =
        useLayoutStore();

    return (
        <li
            className={`flex cursor-pointer items-center gap-8 rounded-r-full px-8 py-3 text-sm ${
                sidebarCollapse ? "" : " "
            } ${activeTab === label ? "bg-[#41331C]" : "hover:bg-[#28292c]"}`}
            onClick={() => setActiveTab(label)}
        >
            <Icon className="w-6" />
            <span
                className={`${
                    sidebarCollapse ? (isSidebarInHover ? "" : "hidden") : ""
                }`}
            >
                {label}
            </span>
        </li>
    );
};

export default SidebarItem;
