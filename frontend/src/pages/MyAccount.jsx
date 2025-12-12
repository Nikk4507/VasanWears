import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { logoutUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
// import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import gsap from "gsap";
import Accordion from "../components/Common/Accordion"; // <-- using your Accordion component

const MyAccount = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [activeTab, setActiveTab] = useState("profile");

  const logoutHandler = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
    }
  };

  const sidebarItems = [
    {
      label: "ACCOUNT SETTINGS",
      children: [
        { label: "Profile Information", tab: "profile" },
        { label: "Manage Addresses", tab: "addresses" },
        { label: "PAN Card Information", tab: "pan" },
      ],
    },
    {
      label: "PAYMENTS",
      children: [
        { label: "Gift Cards", tab: "giftcards" },
        { label: "Saved UPI", tab: "upi" },
        { label: "Saved Cards", tab: "cards" },
      ],
    },
    {
      label: "MY STUFF",
      children: [
        { label: "My Coupons", tab: "coupons" },
        { label: "My Reviews & Ratings", tab: "reviews" },
        { label: "All Notifications", tab: "notifications" },
        { label: "My Wishlist", tab: "wishlist" },
      ],
    },
  ];

  return (
    <div className="px-4 md:mt-35 mt-30 py-10">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">

        {/* ------------------------------------
             SIDEBAR WITH ACCORDION + AVATAR
        ------------------------------------- */}
        <div className="bg-white w-full md:w-72 p-4 shadow rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.avatar}
              alt={user?.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary5"
            />
            <p className="text-gray-800 font-semibold mt-2 text-center">
              Hello, {user?.fullName}
            </p>
          </div>

          {/* Accordion Menu */}
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <Accordion key={index} title={item.label}>
                {item.children.map((child, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(child.tab)}
                    className={`text-left w-full px-2 py-1 rounded-md cursor-pointer 
                      hover:bg-gray-100 transition 
                      ${
                        activeTab === child.tab
                          ? "bg-primary1/10 text-primary1 font-medium"
                          : "text-gray-700"
                      }`}
                  >
                    {child.label}
                  </button>
                ))}
              </Accordion>
            ))}
          </div>

          <button
            onClick={logoutHandler}
            className="cursor-pointer mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* ------------------------------------
             MAIN CONTENT AREA
        ------------------------------------- */}
        <div className="w-full bg-white p-6 shadow rounded-lg">

          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                Personal Information
                <span className="text-blue-600 text-sm cursor-pointer">
                  Edit
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={user?.fullName?.split(" ")[0] || ""}
                  readOnly
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  value={user?.fullName?.split(" ")[1] || ""}
                  readOnly
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Your Gender</label>
                <div className="flex gap-4">
                  <label>
                    <input type="radio" name="gender" value="male" disabled /> Male
                  </label>
                  <label>
                    <input type="radio" name="gender" value="female" disabled /> Female
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-1 flex justify-between">
                  Email Address
                  <span className="text-blue-600 text-sm cursor-pointer">
                    Edit
                  </span>
                </h3>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-1 flex justify-between">
                  Mobile Number
                  <span className="text-blue-600 text-sm cursor-pointer">
                    Edit
                  </span>
                </h3>
                <input
                  type="text"
                  value={user?.phone || "+91-XXXXXXXXXX"}
                  readOnly
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          )}

          {/* You can add more tabs here (addresses, orders, wishlist...) */}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
