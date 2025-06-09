import React from "react";
import EnquiryCard from "../../Components/Card/EnquiryCard";
import enquiries from '../../DataStore/Enquiry.json';

export default function Enquiry() {
  return (
    <div className="min-h-screen bg-gray-50 py-3 px-2 sm:px-4 lg:px-6">
      <h1 className="text-3xl font-extrabold text-[var(--var-red-col)] mb-3 text-center">
        User Enquiries
      </h1>

      <div className="max-w-full mx-auto">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {enquiries.map((enquiry, index) => (
            <EnquiryCard key={index} enquiry={enquiry} />
          ))}
        </div>
      </div>
    </div>
  );
}
