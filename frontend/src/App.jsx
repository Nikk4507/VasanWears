import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import SingleProductPage from "./pages/SingleProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAccount from "./pages/MyAccount";
import ProtectedRoute from "./components/components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/:id/:name" element={<SingleProductPage />} />
        </Route>{" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        //User Layout
        <Route path="/admin" element={<AdminDashboard />}></Route> //Admin
        Layout
      </Routes>
    </BrowserRouter>
  );
};

export default App;
