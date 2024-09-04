import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data }) => {
  const dataSort = useMemo(() => {
    return data.sort((a, b) => a.year.localeCompare(b.year));
  }, [data]);

  return (
    <ResponsiveContainer
      width={"100%"}
      height="100%"
      className={"text-xs mt-4 text-gray-800 outline-none"}
    >
      <LineChart
        data={dataSort}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorSD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2eb88a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2eb88a" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorSMP" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fe2712" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#fe2712" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorSMA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.5} />
        <XAxis dataKey="year" />
        <YAxis fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend fontSize={"0.5rem"} />
        <Line
          type="monotone"
          dataKey="SD"
          stroke="#2eb88a"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="SMP"
          stroke="#fe2712"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="SMA"
          stroke="#9333ea"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
