import React, { useState } from "react";
import Confirm from "../PopUp/Confirm";

export default function PortfolioCard({ building, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    buildingName: building.buildingName,
    place: building.place,
    imageFile: null,
    previewUrl: building.image || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("id", building.id);
    form.append("buildingName", formData.buildingName);
    form.append("place", formData.place);
    if (formData.imageFile) {
      form.append("image", formData.imageFile);
    }

    try {
      const response = await fetch("https://your-api.com/update", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Building updated successfully!");
        setIsModalOpen(false);
        onEdit(building.id);
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  return (
    <>
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        <img
          className="w-full h-48 object-cover"
          src={
            building.image instanceof File
              ? URL.createObjectURL(building.image)
              : building.image
          }
          alt={building.buildingName || "Building Image"}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">
            {building.buildingName}
          </h3>
          <p className="text-gray-600">{building.place}</p>
          <div className="flex justify-end mt-2 gap-2">
            <button
              className="px-2 py-1 bg-white text-[var(--var-red-col)] border border-[var(--var-red-col)] rounded transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
           <button
  className="px-4 py-2 bg-[var(--var-red-col)] text-white rounded hover:bg-red-700 transition-colors"
  onClick={onDelete}
>
  Delete
</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Building</h2>

            <input
              type="text"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
              placeholder="Building Name"
            />

            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
              placeholder="Place"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border p-2 rounded mb-3"
            />

            {formData.previewUrl && (
              <img
                src={formData.previewUrl}
                alt="Preview"
                className="h-32 w-full object-cover rounded mb-4"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[var(--var-red-col)] text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <Confirm
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          onDelete(building.id);
          setShowConfirm(false);
        }}
        clientName={building.buildingName}
      />
    </>
  );
}
