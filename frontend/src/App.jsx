import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Route>{" "}
        //User Layout
        <Route path="/admin" element={<AdminDashboard />}></Route> //Admin
        Layout
      </Routes>
    </BrowserRouter>
  );
};

export default App;
