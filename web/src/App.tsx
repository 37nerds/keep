import { TRoute } from "./types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { guest_routes, protected_routes, public_routes } from "./config/routes";
import { QueryClient, QueryClientProvider } from "react-query";

import ProtectedLayout from "@/layouts/ProtectedLayout";
import GuestLayout from "@/layouts/GuestLayout";
import PublicLayout from "@/layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";

const renderRoutes = (routes: TRoute[]) => {
    return routes.map(({ path, component: Component }, index) => (
        <Route key={index} path={path} element={<Component />} />
    ));
};

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route element={<PublicLayout />}>{renderRoutes(public_routes)}</Route>
                        <Route element={<ProtectedLayout />}>
                            {renderRoutes(protected_routes)}
                        </Route>
                        <Route element={<GuestLayout />}>{renderRoutes(guest_routes)}</Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
