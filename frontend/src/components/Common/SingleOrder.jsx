import React, { useState } from "react";
import {
  RiCheckLine,
  RiStarLine,
  RiDownloadLine,
  RiChat1Line,
} from "@remixicon/react";

const SingleOrder = () => {
  const [showUpdates, setShowUpdates] = useState(false);

  return (
    <div className="">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-4">
          {/* TRACKING INFO */}
          <div className="bg-white p-4 rounded">
            <p className="text-sm">
              Order can be tracked by{" "}
              <span className="font-medium">6299835668</span>.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Tracking link is shared via SMS.
            </p>
          </div>

          {/* TRANSPARENT PACKAGING */}
          <div className="bg-white p-4 rounded flex gap-3">
            <div className="w-10 h-10 flex items-center justify-center border rounded">
              📦
            </div>
            <div>
              <p className="font-medium">Delivered in transparent packaging</p>
              <p className="text-sm text-gray-500">
                You checked and confirmed the order at your doorstep
              </p>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="bg-white p-4 rounded">
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-sm">
                  Khusbu Traders 21 cm Glow in the Dark Stars Wall, 180 Stickers
                  Glow in the Dark Sticker
                </h3>

                <p className="text-xs text-gray-500 mt-1">21, Green</p>

                <p className="text-xs mt-1">
                  Seller:{" "}
                  <span className="text-gray-500">khushioEnterprisess</span>
                </p>

                <p className="font-semibold mt-2">
                  ₹132{" "}
                  <span className="text-green-600 text-sm ml-1">1 offer</span>
                </p>
              </div>

              <img
                src="https://via.placeholder.com/80"
                alt="product"
                className="w-20 h-20 rounded object-cover"
              />
            </div>

            {/* ORDER STATUS */}
            {/* ORDER STATUS */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <RiCheckLine size={14} />
                </span>
                Order Confirmed, Oct 10
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <RiCheckLine size={14} />
                </span>
                Delivered, Oct 15
              </div>

              {/* EXTRA UPDATES */}
              {showUpdates && (
                <div className="ml-7 mt-2 space-y-2 text-sm text-gray-600">
                  <p>📦 Packed, Oct 11</p>
                  <p>🚚 Shipped, Oct 12</p>
                  <p>🏬 Out for delivery, Oct 15</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowUpdates(!showUpdates)}
              className="text-primary1 text-sm mt-3 flex items-center gap-1"
            >
              {showUpdates ? "Hide updates" : "See all updates"} →
            </button>

            <div className="border-t mt-4 pt-3 flex items-center gap-2 text-sm cursor-pointer">
              <RiChat1Line />
              Chat with us
            </div>
          </div>

          {/* RATE EXPERIENCE */}
          <div className="bg-white p-4 rounded">
            <h4 className="font-medium mb-3">Rate your experience</h4>

            <div className="border rounded p-3">
              <p className="text-sm mb-2">Rate the product</p>
              <div className="flex gap-2 text-gray-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <RiStarLine
                    key={i}
                    className="cursor-pointer hover:text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ORDER ID */}
          <p className="text-xs text-gray-500">Order #OD435697360740609100</p>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-4">
          {/* DELIVERY DETAILS */}
          <div className="bg-white p-4 rounded">
            <h4 className="font-medium mb-3">Delivery details</h4>

            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="font-medium">🏠 Home</p>
              <p className="text-gray-600 mt-1">
                Haridas chatterji lane durga bari gaya Left lane of taj palace
              </p>

              <p className="mt-3 font-medium">👤 Sourav</p>
              <p className="text-gray-600">8083151022, 7667908935</p>
            </div>
          </div>

          {/* PRICE DETAILS */}
          <div className="bg-white p-4 rounded">
            <h4 className="font-medium mb-3">Price details</h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Listing price</span>
                <span className="line-through text-gray-400">₹999</span>
              </div>

              <div className="flex justify-between">
                <span>Special price</span>
                <span>₹135</span>
              </div>

              <div className="flex justify-between">
                <span>Total fees</span>
                <span>₹7</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Other discount</span>
                <span>-₹10</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total amount</span>
                <span>₹132</span>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              Payment method: Flipkart Wallet, UPI
            </div>

            <button className="mt-4 w-full border rounded py-2 flex justify-center items-center gap-2 hover:bg-gray-50">
              <RiDownloadLine />
              Download Invoice
            </button>
          </div>

          {/* OFFERS */}
          <div className="bg-white p-4 rounded flex justify-between items-center cursor-pointer">
            <span className="flex items-center gap-2">🏆 Offers earned</span>⌄
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
