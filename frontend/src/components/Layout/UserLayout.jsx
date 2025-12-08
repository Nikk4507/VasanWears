import React from "react";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import ScrollToTop from "../Common/ScrollToTop";
import BottomNav from "../Common/BottomNav";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <div className='mt-2 h-screen bg-slate-100'></div> */}
      <Footer/>
      <ScrollToTop/>
      <BottomNav/>
    </>
  );
};

export default UserLayout;
