import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditLocation() {
  const location = useLocation();
  const navigate = useNavigate();
  const office = location.state?.office;

  const [formData, setFormData] = useState({
    office: "",
    add1: "",
    add2: "",
    icon: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (office) {
      setFormData({
        office: office.office || "",
        add1: office.add1 || "",
        add2: office.add2 || "",
        icon: office.icon || "",
      });
    }
  }, [office]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://your-api-url.com/api/locations/update", {
      method: "POST", // or "PUT" depending on your backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update location");
    }

    const result = await response.json();
    console.log("Server response:", result);

    setSuccessMessage("Location updated successfully!");

    setTimeout(() => {
      navigate("/admin/location");
    }, 1500);
  } catch (error) {
    console.error("Error updating location:", error);
    alert("There was a problem updating the location.");
  }
};


  if (!office) {
    return (
      <div className="p-6 text-red-600 font-semibold text-center">
        No office data found to edit. Please navigate from the Offices page.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-6 text-[var(--var-red-col)]">Edit Office Location</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Office Name", name: "office", required: true },
          { label: "Address Line 1", name: "add1", required: true },
          { label: "Address Line 2", name: "add2" },
          { label: "Icon Name", name: "icon" },
        ].map(({ label, name, required }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-2 font-semibold text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={name}
              name={name}
              type="text"
              value={formData[name]}
              onChange={handleChange}
              required={required}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[var(--var-red-col)] transition"
              autoComplete="off"
            />
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/location")}
            className="flex-1 px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-2 rounded-md bg-[var(--var-red-col)] text-white hover:bg-red-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
