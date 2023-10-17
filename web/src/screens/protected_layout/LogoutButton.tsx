import { useLogoutMutation } from "@/queries/users";
import { useAuthStore } from "@/states/auth_store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const logoutMutation = useLogoutMutation();

    const navigator = useNavigate();

    const { setLoggedUser } = useAuthStore();

    useEffect(() => {
        if (logoutMutation.isSuccess) {
            setLoggedUser(null);
            navigator("/login");
        }
    }, [logoutMutation.isSuccess, navigator, setLoggedUser]);

    return (
        <button
            onClick={() => {
                logoutMutation.mutate(null);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-white"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-3"
        >
            Sign out
        </button>
    );
};

export default LogoutButton;
