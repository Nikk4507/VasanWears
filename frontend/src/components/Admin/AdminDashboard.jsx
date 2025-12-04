import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const AdminDashboard = () => {
  // State to manage the sidebar's open/collapsed status
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle the sidebar (this is where you'd integrate GSAP for smooth animation)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // 💡 GSAP TIP: Use a GSAP timeline here to animate the 'w-72' to 'w-20' on the sidebar
    // and the 'ml-72' to 'ml-20' on the main content simultaneously.
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-72 lg:ml-72" : "ml-20 lg:ml-20"
        }`}
        // The 'ml-' classes handle the shifting of the main content
      >
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content Area (Routing/Pages would go here) */}
        <main className="p-4 sm:p-6 flex-1">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
