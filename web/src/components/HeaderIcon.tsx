import type {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    SVGProps,
} from "react";

export type TIcon = ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>>
>;

const HeaderIcon = ({ icon: Icon }: { icon: TIcon }) => {
    return (
        <div className="hover:bg-slate-700 p-3 rounded-full cursor-pointer transition">
            <Icon className="w-6" />
        </div>
    );
};

export default HeaderIcon;
