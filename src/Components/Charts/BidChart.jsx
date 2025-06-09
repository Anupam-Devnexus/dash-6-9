import React from "react";
import BidData from "../../DataStore/Bids.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function BidChart() {
  // Format labels with name & email
  const formattedData = BidData.map((bid) => ({
    name: `${bid.name} (${bid.email})`,
    quantity: bid.quantity,
    orderPrice: bid.orderPrice,
  }));

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Bid Overview by Quantity & Order Price
        </h2>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[350px] h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedData}
                margin={{ top: 20, right: 30, left: 10, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={90}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="quantity" fill="#6366f1" name="Quantity" />
                <Bar dataKey="orderPrice" fill="#34d399" name="Order Price" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
