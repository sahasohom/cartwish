import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Logout from "../Auth/Logout";
import ProtectedRoutes from "./ProtectedRoutes";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
