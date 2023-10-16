import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/states/auth_store";

import PageContainer from "@/screens/protected_layout/PageContainer";
import Header from "@/screens/protected_layout/Header";
import Sidebar from "@/screens/protected_layout/Sidebar";

const ProtectedLayout = () => {
    const { loggedUser } = useAuthStore();

    if (!loggedUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen w-screen flex-col bg-[#202124] text-white">
            <Header />
            <div className="flex h-full overflow-hidden">
                <Sidebar />
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </div>
        </div>
    );
};

export default ProtectedLayout;
