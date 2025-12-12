import React from "react";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import ScrollToTop from "../Common/ScrollToTop";
import BottomNav from "../Common/BottomNav";
import Loader from "../Common/Loader";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLoaderStore } from "../../store/useLoaderStore";
const UserLayout = () => {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoaderStore();

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => hideLoader(), 900);

    return () => clearTimeout(timer);
  }, [location]);
  return (
    <>
      <Loader />
      <Header />
      <Outlet />
      {/* <div className='mt-2 h-screen bg-slate-100'></div> */}
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </>
  );
};

export default UserLayout;
