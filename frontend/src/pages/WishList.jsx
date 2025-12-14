import React from "react";
import { RiDeleteBinLine, RiShoppingCartLine } from "@remixicon/react";

const wishlistItems = [
  {
    id: 1,
    name: "Asian Tarzan-11 Sneakers",
    image: "https://via.placeholder.com/200",
    price: 671,
    mrp: 999,
    color: "White, Blue",
  },
  {
    id: 2,
    name: "LIBERTY Men Clogs",
    image: "https://via.placeholder.com/200",
    price: 475,
    mrp: 799,
    color: "Grey",
  },
];

const Wishlist = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <div className="bg-white p-8 rounded text-center">
            <p className="text-gray-500">Your wishlist is empty ❤️</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Color: {item.color}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-semibold">₹{item.price}</span>
                    <span className="line-through text-xs text-gray-400">
                      ₹{item.mrp}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-primary1 text-white py-2 text-sm rounded flex items-center justify-center gap-1">
                      <RiShoppingCartLine />
                      Move to Cart
                    </button>

                    <button className="border px-3 rounded hover:bg-red-50 text-red-500">
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
