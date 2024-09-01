import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer
      width={"100%"}
      height="100%"
      className={"text-xs mt-4  text-gray-800 outline-none"}
    >
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="year" />
        <YAxis fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="SD"
          stackId="1"
          stroke="#2eb88a"
          fill="#2eb88a"
        />
        <Area
          type="monotone"
          dataKey="SMP"
          stackId="1"
          stroke="#4d44b5"
          fill="#4d44b5"
        />
        <Area
          type="monotone"
          dataKey="SMA"
          stackId="1"
          stroke="#fe2712"
          fill="#fe2712"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
