import React from 'react';
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-100">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex items-center">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications */}
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
          >
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
          </button>

          {/* Profile Dropdown */}
          <div className="ml-3 relative">
            <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;