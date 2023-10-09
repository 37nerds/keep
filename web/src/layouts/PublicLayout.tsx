import useAuthStore from "@/states/auto_store";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    const { loggedUser } = useAuthStore();

    if (loggedUser) {
        return <Outlet />;
    }

    return (
        <>
            <div>PublicLayout</div>
            <Outlet />
        </>
    );
};

export default PublicLayout;
