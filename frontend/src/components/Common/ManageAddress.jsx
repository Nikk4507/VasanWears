import React, { useState } from "react";
import {
  RiAddLine,
  RiCloseLine,
  RiCrossLine,
  RiMore2Fill,
  RiXboxLine,
} from "@remixicon/react";
import EditAddressModal from "./EditAddressModal";
import EditAddressInline from "./EditAddressModal";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "WORK",
      name: "Sagar Kumar",
      phone: "8083151022",
      address:
        "Graphic Era Hill University Bhimtal Nanital Old Boys Hostel CG-3, Nainital Subdistrict, Bhimtaal, Uttarakhand - 263156",
    },
    {
      id: 2,
      type: "HOME",
      name: "Sagar Kumar",
      phone: "8083151022",
      address:
        "Haridas Lane Chatterji Durga Bari, Opp of Quasmia Madarsa, Durga Bari, Gaya, Bihar - 823001",
    },
  ]);
  const [editingId, setEditingId] = useState(null);

  const handleSave = (updated) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    setEditingId(null);
  };
  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setEditingId(null);
  };

  return (
    <div className="mx-auto">
      <h3 className="text-xl font-semibold mb-4">Manage Addresses</h3>

      <div className="space-y-4">
        {addresses.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            {/* Address Card */}
            <div className="p-4 relative">
              <span className="px-3 py-1 text-xs bg-gray-200 rounded">
                {item.type}
              </span>

              <div className="flex justify-between mt-2">
                <p className="font-medium">{item.name}</p>
                <p>{item.phone}</p>
              </div>

              <p className="text-gray-700 mt-1">{item.address}</p>

              <RiMore2Fill
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() =>
                  setEditingId(editingId === item.id ? null : item.id)
                }
              />
            </div>

            {/* 🔽 INLINE EDITOR */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                editingId === item.id
                  ? "max-h-[900px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <EditAddressInline
                data={item}
                onCancel={() => setEditingId(null)}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAddress;
