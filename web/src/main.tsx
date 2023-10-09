import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import PrivateLayout from "./layouts/PrivateLayout.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<PublicLayout />}>
            {/* <Route index={true} element={<App />} /> */}
            {/* <Route path="/search/:keyword" element={<Home />} /> */}
            {/* <Route path="/page/:pageNumber" element={<HomeScreens />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreens />}
        />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/search/:keyword/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="" element={<PrivateLayout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} /> */}
            </Route>

            {/* <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListScreen />}
          />
          <Route path="/admin/product/:id/edit" element={<EditProductScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/update" element={<EditUserScreen />} />
        </Route> */}
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
