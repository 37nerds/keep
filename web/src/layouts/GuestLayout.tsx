import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "@/states/auth_store";

const GuestLayout = () => {
    const { loggedUser } = useAuthStore();

    if (loggedUser) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <div>Guest Layout</div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
