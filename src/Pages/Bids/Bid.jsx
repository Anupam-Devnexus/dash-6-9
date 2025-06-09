import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import BidData from "../../DataStore/Bids.json";

export default function Bid() {
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 

  const toggleView = () => {
    setViewMode(viewMode === "table" ? "chart" : "table");
  };

  // Filter and sort bids by name & orderPrice
  const filterData = () => {
    let filtered = search
      ? BidData.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      : [...BidData]; // make a shallow copy to avoid mutating original

    // Sort based on sortOrder by orderPrice
    filtered.sort((a, b) => {
      if (sortOrder === "asc") return a.orderPrice - b.orderPrice;
      else return b.orderPrice - a.orderPrice;
    });

    return filtered;
  };

  const filteredBids = filterData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row p-2 justify-between bg-[var(--var-red-col)] items-center mb-2 gap-2">
        <h2 className="text-lg sm:text-xl text-white font-semibold mb-2 sm:mb-0">
          Your All Bid Data
        </h2>

        <div className="border-b-[1px] border-white p-2 text-xs text-white font-semibold outline-none">
          <input
            type="text"
            placeholder="Search Name Of Bidder"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent placeholder-white outline-none"
          />
        </div>

        <div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-1 rounded text-sm font-semibold cursor-pointer
                       bg-white text-[var(--var-red-col)] border border-white
                       hover:bg-[var(--var-red-col)] hover:text-white transition"
          >
            <option value="asc" className="cursor-pointer">Price Ascending</option>
            <option value="desc" className="cursor-pointer">Price Descending</option>
          </select>
        </div>

        <button
          onClick={toggleView}
          className="cursor-pointer px-2 py-1 text-[var(--var-red-col)] bg-white rounded shadow hover:brightness-95 transition text-sm sm:text-base"
        >
          {viewMode === "table" ? "Show Chart" : "Show Table"}
        </button>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-[600px] sm:min-w-full text-xs sm:text-sm text-left">
            <thead className="border-b border-[var(--var-red-col)] text-[var(--var-red-col)]">
              <tr>
                <th className="px-3 py-2 sm:px-6 sm:py-3">#</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Product</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Name</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Email</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Phone</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Quantity</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3">Order Price ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBids.length > 0 ? (
                filteredBids.map((bid, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition text-xs sm:text-sm"
                  >
                    <td className="px-3 py-2 sm:px-6 sm:py-3 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">{bid.productType}</td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">{bid.name}</td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">{bid.email}</td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">{bid.phone}</td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">{bid.quantity}</td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">${bid.orderPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded shadow-md p-2 h-[300px] sm:h-[400px] overflow-y-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredBids}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="orderPrice"
                fill="var(--var-red-col)"
                name="Order Price ($)"
                barSize={20}
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                name="Quantity"
                barSize={20}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
