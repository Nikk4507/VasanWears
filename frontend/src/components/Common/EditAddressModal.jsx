import React, { useState } from "react";
import { RiCloseLine, RiMapPinLine } from "@remixicon/react";

const EditAddressModal = ({ data, onClose, onSave }) => {
  const [form, setForm] = useState({ ...data });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveHandler = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-20 z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">EDIT ADDRESS</h2>
          <RiCloseLine
            onClick={onClose}
            className="cursor-pointer text-2xl"
          />
        </div>

        {/* Use Location */}
        <button className="flex items-center gap-2 bg-primary1 text-white px-4 py-2 rounded">
          <RiMapPinLine />
          Use my current location
        </button>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border rounded px-3 py-2"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded px-3 py-2"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            className="border rounded px-3 py-2"
          />

          <input
            name="locality"
            placeholder="Locality"
            className="border rounded px-3 py-2"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded px-3 py-2 col-span-2 min-h-20"
          />

          <input
            name="city"
            placeholder="City"
            className="border rounded px-3 py-2"
          />

          <input
            name="state"
            placeholder="State"
            className="border rounded px-3 py-2"
          />

          <input
            name="landmark"
            placeholder="Landmark (Optional)"
            className="border rounded px-3 py-2"
          />

          <input
            name="alternatePhone"
            placeholder="Alternate Phone (Optional)"
            className="border rounded px-3 py-2"
          />
        </div>

        {/* Address Type */}
        <div className="mt-4">
          <p className="font-medium mb-2">Address Type</p>
          <div className="flex gap-6">
            <label>
              <input type="radio" name="type" checked={form.type === "HOME"} onChange={() => setForm({ ...form, type: "HOME" })}/>
              Home
            </label>
            <label>
              <input type="radio" name="type" checked={form.type === "WORK"} onChange={() => setForm({ ...form, type: "WORK" })}/>
              Work
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2">
            Cancel
          </button>

          <button
            onClick={saveHandler}
            className="bg-primary1 text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
