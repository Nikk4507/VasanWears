import React, { useState } from "react";
import { RiAddLine, RiMore2Fill } from "@remixicon/react";
import EditAddressModal from "./EditAddressModal";

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

  const [activeAddress, setActiveAddress] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null); // NEW

  const handleEdit = (address) => {
    setActiveAddress(address);
    setOpenModal(true);
    setSelectedMenuId(null); // close menu
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    setSelectedMenuId(null);
  };

  const handleSave = (updated) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    setOpenModal(false);
  };

  return (
    <div className="px-4 py-6 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>

      {/* Add New Address */}
      <button className="w-full border rounded-lg p-4 flex items-center gap-3 text-primary1 font-medium hover:bg-gray-50">
        <RiAddLine />
        ADD A NEW ADDRESS
      </button>

      {/* Address List */}
      <div className="mt-6 space-y-4">
        {addresses.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 relative hover:shadow-sm"
          >
            <span className="px-3 py-1 text-xs bg-gray-200 rounded">
              {item.type}
            </span>

            <div className="flex justify-between mt-2">
              <p className="font-medium">{item.name}</p>
              <p>{item.phone}</p>
            </div>

            <p className="text-gray-700 mt-1">{item.address}</p>

            {/* Menu Button */}
            <div className="absolute right-4 top-4">
              <RiMore2Fill
                className="cursor-pointer"
                onClick={() =>
                  setSelectedMenuId(
                    selectedMenuId === item.id ? null : item.id
                  )
                }
              />

              {/* SHOW MENU ONLY WHEN CLICKED */}
              {selectedMenuId === item.id && (
                <div className="flex flex-col bg-white border rounded absolute right-0 mt-1 shadow -top-1.5 z-20">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <EditAddressModal
          data={activeAddress}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageAddress;
