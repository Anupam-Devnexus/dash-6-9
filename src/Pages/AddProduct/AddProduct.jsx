import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    shape: "",
    productType: "",
    color: "",
    size: "",
    supplyAbility: "",
    productImage: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cervino-ceramix-backend-production.up.railway.app/api/admin/add-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`);
      }

      setSuccessMessage("Product added successfully!");

      setTimeout(() => {
        console.log("formdata: ", formData)
        navigate("/admin/products");
      }, 1500);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 bg-white shadow-lg rounded-lg mt-2">
      <h2 className="text-3xl font-extrabold mb-6 text-[var(--var-red-col)] text-center">
        Add New Product
      </h2>

      {successMessage && (
        <div className="mb-1 p-1 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Title", name: "title", required: true },
          { label: "Shape", name: "shape" },
          { label: "Product Type", name: "productType" },
          { label: "Color", name: "color" },
          { label: "Size", name: "size" },
          { label: "Supply Ability", name: "supplyAbility" },
        ].map(({ label, name, required }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="mb-2 font-semibold text-gray-700 dark:text-gray-200"
            >
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
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--var-red-col)] transition"
              autoComplete="off"
            />
          </div>
        ))}

        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="productImage"
            className="mb-2 font-semibold text-gray-700 dark:text-gray-200"
          >
            Product Image URL
          </label>
          {formData.productImage && (
            <img
              src={formData.productImage}
              alt="Product preview"
              className="w-52 h-36 object-cover rounded mb-3 border border-gray-300 self-center"
            />
          )}
          <input
            id="productImage"
            name="productImage"
            type="url"
            value={formData.productImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--var-red-col)] transition"
            autoComplete="off"
          />
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex-1 px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-2 rounded-md bg-[var(--var-red-col)] text-white hover:bg-red-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
