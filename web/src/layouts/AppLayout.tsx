import Loading from "@/components/misc/Loading";
import { useProfileQuery } from "@/queries/users";
import { useAuthStore } from "@/states/auth_store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    const profileQuery = useProfileQuery();
    const { setLoggedUser } = useAuthStore();

    useEffect(() => {
        setLoggedUser(profileQuery.data || null);
    }, [profileQuery.isSuccess, setLoggedUser, profileQuery.data]);

    if (profileQuery.isLoading) {
        return <Loading />;
    }
    return <Outlet />;
};

export default AppLayout;
