import React, { useState } from "react";
import Brochuresdata from '../../DataStore/Brochures.json';
import BrochureCard from "../../Components/Card/BrochureCard";
import Confirm from '../../Components/PopUp/Confirm';
import { useNavigate } from "react-router-dom";

export default function Brochures() {
  const [brochures, setBrochures] = useState(Brochuresdata);
  const [toDelete, setToDelete] = useState(null);

  const navigate = useNavigate();

  const handleDeleteClick = (brochure) => setToDelete(brochure);

  const confirmDelete = () => {
    if (toDelete) {
      setBrochures(brochures.filter(b => b !== toDelete));
      setToDelete(null);
    }
  };

  const cancelDelete = () => setToDelete(null);

  const handleUpdateClick = (brochure) => {
    navigate(`/admin/brochures/edit/${brochure.text}`, { state: { brochure } });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Brochures</h2>
        <button
          onClick={() => navigate('/admin/addBrochures')}
          className="px-3 py-1 bg-[var(--var-red-col)] rounded-md cursor-pointer text-white"
        >
          Add Brochures
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brochures.map((item, index) => (
          <BrochureCard
            key={index}
            brochure={item}
            onDelete={() => handleDeleteClick(item)}
            onUpdate={() => handleUpdateClick(item)}
          />
        ))}
      </div>

      <Confirm
        isOpen={!!toDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`Do you want to delete the brochure: "${toDelete?.name}"?`}
      />
    </div>
  );
}
