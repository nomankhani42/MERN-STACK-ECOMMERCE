import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import UserProtected from "./ProtectedRoutes/UserProtected";
import UserDashboard from "./Pages/User/UserDashboard";
import AdminDashboard from "./Pages/Amin/AdminDashboard";
import AdminProtected from "./ProtectedRoutes/AdminProtected";
import CreateCategory from "./Pages/Amin/CreateCategory";
import AddProduct from "./Pages/Amin/AddProduct";
import ProductList from "./Pages/Amin/ProductList";
import SearchProducts from "./Pages/SearchProducts";
import Checkout from "./Pages/Checkout";
import Success from "./Pages/User/Success";
import MyOrder from "./Pages/User/MyOrder";
import ManageOrders from "./Pages/Amin/ManageOrders";


const App = () => {
  return (
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Categories />} />

      <Route
        path="/login"
        element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
      <Route path="/dashboard" element={<UserProtected />}>
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/orders" element={<MyOrder />} />
      </Route>
      <Route path="/dashboard" element={<AdminProtected />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="manage-orders" element={<ManageOrders />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/search-product/:keyword" element={<SearchProducts />} />
    </Routes>
  );
};

export default App;
