import React from "react";
import { 
  RiGridFill,
  RiUserLine,
  RiSearchLine,
  RiShoppingBag3Line 
} from "@remixicon/react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-2 px-4 flex justify-around items-center md:hidden z-50">

      {/* Shop */}
      <div className="flex flex-col items-center text-gray-600">
        <RiGridFill size={22} />
        <span className="text-xs mt-1">Shop</span>
      </div>

      {/* My Account */}
      <div className="flex flex-col items-center text-gray-600">
        <RiUserLine size={22} />
        <span className="text-xs mt-1">My account</span>
      </div>

      {/* Search */}
      <div className="flex flex-col items-center text-gray-600">
        <RiSearchLine size={22} />
        <span className="text-xs mt-1">Search</span>
      </div>

      {/* Cart */}
      <div className="relative flex flex-col items-center text-gray-600">
        <RiShoppingBag3Line size={22} />
        <span className="text-xs mt-1">Cart</span>

        {/* Cart Badge */}
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
          5
        </span>
      </div>
    </div>
  );
};

export default BottomNav;
