import React, { useState } from "react";
import axios from "axios";
import initialBrands from "../../DataStore/Brands.json";
import Confirm from "../../Components/PopUp/Confirm";
import { useNavigate } from "react-router-dom";


export default function ViewBrands() {
  const [brands, setBrands] = useState(initialBrands);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", link: "", image: "" });

  const navigate = useNavigate();
  const handleEditClick = (brand) => {
    setEditingBrandId(brand.id);
    setEditForm({ name: brand.name, link: brand.link, image: brand.image });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
  try {
    const updatedBrand = { ...editForm };
    // Replace this URL with your actual API endpoint
    const response = await axios.put(
      `https://your-api.com/brands/${editingBrandId}`,
      updatedBrand
    );

    if (response.status === 200 || response.status === 204) {
      // Update the local state only if API call is successful
      setBrands((prev) =>
        prev.map((b) =>
          b.id === editingBrandId ? { ...b, ...editForm } : b
        )
      );
      setEditingBrandId(null);
    } else {
      alert("Failed to update brand");
    }
  } catch (error) {
    console.error("Error updating brand:", error);
    alert("Something went wrong while updating the brand.");
  }
};


  const handleCancelEdit = () => {
    setEditingBrandId(null);
    setEditForm({ name: "", link: "", image: "" });
  };

  const handleDeleteClick = (brand) => {
    setBrandToDelete(brand);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setBrands((prev) => prev.filter((b) => b.id !== brandToDelete.id));
    setIsConfirmOpen(false);
    setBrandToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setBrandToDelete(null);
  };

  return (
    <>
      <div className="bg-[var(--var-red-col)] p-4 text-white flex items-center justify-between">
        <span className="font-semibold text-base md:text-lg">Brands You Work With</span>
        <button
        onClick={() => navigate('/admin/dashboard/viewBrands/addBrand')}
        className="px-3 py-1 bg-white text-[var(--var-red-col)] rounded-md cursor-pointer">Add New Brands</button>
      </div>

      <div className="overflow-x-auto max-w-full">
        <table className="min-w-[600px] w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">ID</th>
              <th className="py-3 px-2 md:px-4 text-left">Brand</th>
              <th className="py-3 px-2 md:px-4 text-left">Website</th>
              <th className="py-3 px-2 md:px-4 text-left">Logo</th>
              <th className="py-3 px-2 md:px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs md:text-sm">
            {brands.map((brand) => (
              <tr key={brand.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                <td className="py-3 px-2 md:px-4">{brand.id}</td>

                {/* Name */}
                <td className="py-3 px-2 md:px-4 font-medium">
                  {editingBrandId === brand.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    brand.name
                  )}
                </td>

                {/* Link */}
                <td className="py-3 px-2 md:px-4">
                  {editingBrandId === brand.id ? (
                    <input
                      type="text"
                      name="link"
                      value={editForm.link}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    <a href={brand.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {brand.link}
                    </a>
                  )}
                </td>

                {/* Image */}
                <td className="py-3 px-2 md:px-4">
                  {editingBrandId === brand.id ? (
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    <img src={brand.image} alt={brand.name} className="h-8 w-auto object-contain" />
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-2 md:px-4 flex flex-wrap gap-2">
                  {editingBrandId === brand.id ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="bg-[var(--var-red-col)] cursor-pointer text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 cursor-pointer text-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(brand)}
                        className="text-[var(--var-red-col)] border border-[var(--var-red-col)] cursor-pointer px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(brand)}
                        className="bg-[var(--var-red-col)] cursor-pointer hover:bg-red-800 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Popup */}
      <Confirm
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        clientName={brandToDelete?.name}
      />
    </>
  );
}
