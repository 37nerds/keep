import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TActiveTab } from "../types.ts";

type TStore = {
    sidebarCollapse: boolean;
    toggleSidebarCollapse: () => void;

    activeTab: TActiveTab;
    setActiveTab: (activeTab: TActiveTab) => void;

    isSidebarInHover: boolean;
    setIsSidebarInHover: (isSidebarInHover: boolean) => void;
};

const useLayoutStore = create<TStore>()(
    immer(
        devtools(set => ({
            sidebarCollapse: true,
            toggleSidebarCollapse: () => {
                set(state => {
                    state.sidebarCollapse = !state.sidebarCollapse;
                });
            },

            activeTab: "Notes",
            setActiveTab: activeTab => {
                set(state => {
                    state.activeTab = activeTab;
                });
            },

            isSidebarInHover: false,
            setIsSidebarInHover: isSidebarInHover => {
                set(state => {
                    state.isSidebarInHover = isSidebarInHover;
                });
            },
        })),
    ),
);

export default useLayoutStore;
