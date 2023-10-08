import type {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    SVGProps,
} from "react";

export type TIcon = ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>>
>;

export type TActiveTab =
    | "Notes"
    | "Reminders"
    | "Edit labels"
    | "Archive"
    | "Trash";
