import { TIcon } from "../types";

const HeaderIcon = ({
    icon: Icon,
    onClick,
}: {
    icon: TIcon;
    onClick?: () => void;
}) => {
    return (
        <div
            className="cursor-pointer rounded-full p-3 transition hover:bg-slate-700"
            onClick={onClick}
        >
            <Icon className="w-6" />
        </div>
    );
};

export default HeaderIcon;
