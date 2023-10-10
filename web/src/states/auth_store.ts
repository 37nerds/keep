import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TStore = {
    loggedUser: boolean;
    setLoggedUser: (user: boolean) => void;
};

const useAuthStore = create<TStore>()(
    immer(
        devtools(set => ({
            loggedUser: false,
            setLoggedUser: user => {
                set(state => {
                    state.loggedUser = user;
                });
            },
        })),
    ),
);

export default useAuthStore;
