import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/states/auth_store";

const GuestLayout = () => {
    const { loggedUser } = useAuthStore();

    if (loggedUser) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestLayout;
