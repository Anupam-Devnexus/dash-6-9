import React from "react";
import Contact from '../../Components/Card/ContactOffices'
import { useNavigate } from "react-router-dom";

export default function Location(){
    const navigate = useNavigate()
    return(
        <>
        <div className="flex items-center justify-between p-4">
        <span className="text-4xl text-[var(--var-red-col)] font-semibold">Our Offices </span> 
        <button className="px-3 py-1 bg-[var(--var-red-col)] text-white rounded-md " 
        onClick={()=> navigate('/admin/location/addLocation')}
        >Add New Offices</button>  
        </div>
        <Contact />
        </>
    )
}