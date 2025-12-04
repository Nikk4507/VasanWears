import React from "react";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <div className='mt-2 h-screen bg-slate-100'></div> */}
    </>
  );
};

export default UserLayout;
