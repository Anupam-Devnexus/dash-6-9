import React, { useState } from "react";
import Portfoliodata from '../../DataStore/Portfolio.json';
import PortfolioCard from "../../Components/Card/PortfolioCard";
import { useNavigate } from "react-router-dom";
import Confirm from "../../Components/PopUp/Confirm";

export default function Portfolio() {
  const navigate = useNavigate();

  // State for buildings
  const [buildings, setBuildings] = useState(Portfoliodata);

  // Confirm dialog state
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Trigger delete confirm
  const handleDeleteClick = (building) => {
    setSelectedBuilding(building);
    setShowConfirm(true);
  };

  // Actual delete after confirmation
  const handleConfirmDelete = () => {
    if (selectedBuilding) {
      setBuildings((prev) => prev.filter((b) => b.id !== selectedBuilding.id));
      setSelectedBuilding(null);
      setShowConfirm(false);
    }
  };

  return (
    <div className="">
      <div className="bg-[var(--var-red-col)] text-white p-2 flex justify-between items-center">
        <span className="font-semibold ml-3">Portfolio Page</span>
        <button
          onClick={() => navigate('/admin/portfolio/addPortfolio')}
          className="cursor-pointer px-3 py-1 bg-white rounded-md text-[var(--var-red-col)]"
        >
          Add Portfolio
        </button>
      </div>

      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center p-2">
        {buildings.map((item) => (
          <PortfolioCard
            key={item.id}
            building={item}
            onDelete={() => handleDeleteClick(item)}
          />
        ))}
      </div>

      {/* Confirm Popup */}
      <Confirm
        isOpen={showConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedBuilding(null);
        }}
        onConfirm={handleConfirmDelete}
        clientName={selectedBuilding?.buildingName || ""}
      />
    </div>
  );
}
