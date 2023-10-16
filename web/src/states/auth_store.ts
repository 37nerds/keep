import { TLoggedUser } from "@/queries/users";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TStore = {
    loggedUser: TLoggedUser | null;
    setLoggedUser: (user: TLoggedUser | null) => void;
};

export const useAuthStore = create<TStore>()(
    immer(
        devtools(set => ({
            loggedUser: null,
            setLoggedUser: user => {
                set(state => {
                    state.loggedUser = user;
                });
            },
        })),
    ),
);
