import React, { useState } from 'react';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  TagIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  ChevronDownIcon,
  ChevronRightIcon, 
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline'; 

// Nested Submenu Component
const Submenu = ({ title, icon: Icon, children, isOpen, onClick, isCollapsed }) => {
  return (
    <div className="my-1">
      <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-indigo-100 transition-colors duration-200 ${isOpen && !isCollapsed ? 'bg-indigo-100 text-indigo-700' : ''}`}
      >
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-3 text-indigo-500" />
          <span className={`${isCollapsed ? 'hidden' : 'block'} origin-left duration-200`}>{title}</span>
        </div>
        {children && !isCollapsed && (
          isOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />
        )}
      </button>

      {/* Nested Items */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen && !isCollapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="pl-6 border-l-2 border-indigo-200 ml-4 py-1">
          {children}
        </ul>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  const menuItems = [
    { title: 'Dashboard', icon: HomeIcon, link: '/dashboard' },
    { 
      title: 'Products', 
      icon: ShoppingBagIcon, 
      link: null,
      submenus: [
        { title: 'Product List', link: '/products/list' },
        { title: 'Categories', link: '/products/categories' },
        { title: 'Subcategories', link: '/products/subcategories' },
      ]
    },
    { title: 'Customer List', icon: UsersIcon, link: '/customers' },
    { title: 'Coupons', icon: TagIcon, link: '/coupons' },
    { title: 'Payment Setting', icon: CreditCardIcon, link: '/payment' },
    { title: 'Analytics', icon: ChartBarIcon, link: '/analytics' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-white shadow-xl p-4 transition-all duration-300 ease-in-out z-30 ${isOpen ? 'w-72' : 'w-20'} 
                 border-r border-gray-100`}
    >
      {/* Logo/Title Section */}
      <div className="flex items-center p-2 mb-6 border-b border-indigo-100">
        <ShoppingBagIcon className={`h-8 w-8 text-indigo-600 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
        <h1 className={`text-xl font-bold text-gray-800 origin-left duration-200 ${isOpen ? 'block' : 'hidden'}`}>
          <span className="text-indigo-600">Dash</span>Board
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col justify-between h-[calc(100vh-100px)]">
        <div>
          {menuItems.map((item) => (
            item.submenus ? (
              <Submenu
                key={item.title}
                title={item.title}
                icon={item.icon}
                isOpen={openMenu === item.title}
                onClick={() => toggleMenu(item.title)}
                isCollapsed={!isOpen}
              >
                {item.submenus.map((sub) => (
                  <li key={sub.title} className="text-gray-600 text-sm py-2 hover:text-indigo-600 transition-colors cursor-pointer">
                    {sub.title}
                  </li>
                ))}
              </Submenu>
            ) : (
              <div key={item.title} className="my-1">
                <a href={item.link} className="flex items-center p-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-indigo-100 transition-colors duration-200">
                  <item.icon className="h-5 w-5 mr-3 text-indigo-500" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>{item.title}</span>
                </a>
              </div>
            )
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full flex items-center p-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;