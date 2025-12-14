import React from "react";
import { RiCoupon3Line, RiFileCopyLine } from "@remixicon/react";

const coupons = [
  {
    id: 1,
    code: "SAVE10",
    description: "Get ₹10 off on minimum purchase of ₹199",
    expiry: "Expires on Oct 31, 2025",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Free delivery on your order",
    expiry: "Valid till Nov 15, 2025",
  },
];

const Coupons = () => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Available Coupons</h2>

        {coupons.length === 0 ? (
          <div className="bg-white p-8 rounded text-center">
            <p className="text-gray-500">No coupons available right now 🎟️</p>
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white p-4 rounded border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary1/10 text-primary1 p-2 rounded">
                    <RiCoupon3Line size={20} />
                  </div>

                  <div>
                    <p className="font-medium">{coupon.code}</p>
                    <p className="text-sm text-gray-600">
                      {coupon.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {coupon.expiry}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => copyCode(coupon.code)}
                  className="border px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-gray-50"
                >
                  <RiFileCopyLine />
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
