import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TStore = {
    sidebarCollapse: boolean;
    toggleSidebarCollapse: () => void;
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
        })),
    ),
);

export default useLayoutStore;
