import type { TRoute } from "@/types";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Root from "@/pages/Root";

export const guest_routes: TRoute[] = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
];

export const protected_routes: TRoute[] = [
    {
        path: "/",
        component: Root,
    },
];

export const public_routes: TRoute[] = [];
