import PageContainer from "@/components/PageContainer";
import useAuthStore from "@/states/auto_store";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PrivateLayout = () => {
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

export default PrivateLayout;
