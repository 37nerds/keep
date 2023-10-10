import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <>
            <div>PublicLayout</div>
            <Outlet />
        </>
    );
};

export default PublicLayout;
