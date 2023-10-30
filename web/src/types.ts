import type { FC, ForwardRefExoticComponent, PropsWithoutRef, SVGProps } from "react";

export type TIcon = ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;

export type TActiveTab = "Notes" | "Reminders" | "Edit labels" | "Archive" | "Trash";

export type TRoute = {
    path: string;
    component: FC;
};
