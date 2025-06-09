import React, { useState } from "react";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as BsIcons from "react-icons/bs";
import * as TbIcons from "react-icons/tb";
import * as SiIcons from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import locationData from '../../DataStore/Locations.json';
import Confirm from "../PopUp/Confirm";
import { useNavigate } from "react-router-dom";

// Icon mapping for dynamic rendering
const iconMap = {
  FaMapMarkerAlt: FaIcons.FaMapMarkerAlt,
  FaBuilding: FaIcons.FaBuilding,
  MdLocationOn: MdIcons.MdLocationOn,
  FaWarehouse: FaIcons.FaWarehouse,
  GiFactory: GiIcons.GiFactory,
  RiBuilding2Fill: RiIcons.RiBuilding2Fill,
  HiOfficeBuilding: HiIcons.HiOfficeBuilding,
  GiModernCity: GiIcons.GiModernCity,
  BsPinMapFill: BsIcons.BsPinMapFill,
  FaCity: FaIcons.FaCity,
  TbBuildingSkyscraper: TbIcons.TbBuildingSkyscraper,
  SiGooglemaps: SiIcons.SiGooglemaps,
  MdBusiness: MdIcons.MdBusiness,
  BiBuildingHouse: BiIcons.BiBuildingHouse,
};

export default function ContactOffices() {
  const [offices, setOffices] = useState(locationData);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  const handleEdit = (index) => {
    navigate("/admin/location/edit-location", { state: { office: offices[index] } });
  };

  const openConfirm = (index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      setOffices((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
      setConfirmOpen(false);
    }
  };

  const handleCancel = () => {
    setDeleteIndex(null);
    setConfirmOpen(false);
    navigate('/location')
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office, index) => {
          const Icon = iconMap[office.icon] || FaIcons.FaMapMarkerAlt;
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3 text-[var(--var-red-col)]">
                <Icon size={24} />
                <h3 className="text-lg font-semibold">{office.office}</h3>
              </div>
              <p className="text-gray-700 text-sm">{office.add1}</p>
              <p className="text-gray-700 text-sm">{office.add2}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-white text-[var(--var-red-col)] px-3 py-1 rounded border-[1px] border-[var(--var-red-col)] text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirm(index)}
                  className="bg-[var(--var-red-col)] text-white px-3 py-1 rounded hover:bg-[var(--var-red-col)] text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm Popup */}
      <Confirm
        isOpen={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        clientName={deleteIndex !== null ? ` ${offices[deleteIndex]?.office}` : ""}
      />
    </div>
  );
}
