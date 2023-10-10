import type { TRoute } from "./types";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { guest_routes, protected_routes, public_routes } from "./config/routes";

import ProtectedLayout from "./layouts/ProtectedLayout";
import GuestLayout from "./layouts/GuestLayout";
import PublicLayout from "./layouts/PublicLayout";

const renderRoutes = (routes: TRoute[]) => {
    return routes.map(({ path, component: Component }, index) => (
        <Route key={index} path={path} element={<Component />} />
    ));
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    {renderRoutes(public_routes)}
                </Route>
                <Route element={<ProtectedLayout />}>
                    {renderRoutes(protected_routes)}
                </Route>
                <Route element={<GuestLayout />}>
                    {renderRoutes(guest_routes)}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
