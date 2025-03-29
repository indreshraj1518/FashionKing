import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/cart/CheckOut";
import OrderConfermationPage from "./pages/OrderConfermationPage";
import OrderDetails from "./pages/OrderDetails";
import MyorderPage from "./pages/MyorderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManageMent from "./components/Admin/UserManageMent";
import ProjectManageMent from "./components/Admin/ProjectManageMent";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManageMent from "./components/Admin/OrderManageMent";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatpath: true }}
        >
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="collections/:collection"
                element={<CollectionPage />}
              />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route
                path="order-confermation"
                element={<OrderConfermationPage />}
              />
              <Route path="order/:id" element={<OrderDetails />} />
              <Route path="my-orders" element={<MyorderPage />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHomePage />} />
              <Route path="users" element={<UserManageMent />} />
              <Route path="products" element={<ProjectManageMent />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
              <Route path="orders" element={<OrderManageMent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
// 4hr 39 min completed
