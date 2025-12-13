import { RiUser3Line } from "@remixicon/react";
import React from "react";
import image_right from "/images/VasanNS.png"
const MyAccountRightSide = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-center text-gray-500">
      {/* <RiUser3Line size={64} className="mb-4 text-primary5 " />
      <h2 className="text-lg font-semibold text-gray-700">
        Welcome to Your Account
      </h2>
      <p className="mt-2 text-sm max-w-sm">
        Select an option from the left panel to view or manage your account
        details.
      </p> */}
      <img src={image_right} alt="No" className="object-cover w-2xl" />
    </div>
  );
};

export default MyAccountRightSide;
