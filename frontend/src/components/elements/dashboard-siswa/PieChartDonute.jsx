import { useMemo, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [{ name: "Total", value: 400 }];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos; // Sesuaikan jarak luar
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos; // Sesuaikan jarak luar
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15; // Kurangi jarak teks horizontal
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={12}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 5} // Kurangi radius dalam
        outerRadius={outerRadius - 5} // Kurangi radius luar
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 2} // Kurangi radius luar sektor kedua
        outerRadius={outerRadius}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8} // Sesuaikan posisi teks
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={12}
      >{` ${value}`}</text>
    </g>
  );
};

const COLORS = ["#fcc43e", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartDonute = ({ dataJadwal, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const totalMapel = useMemo(() => {
    if (dataJadwal.length > 0) {
      const uniqueMapel = new Set(
        dataJadwal.map((jadwal) => jadwal.bidangStudi.nama)
      );

      return [{ name: "Total", value: uniqueMapel.size }];
    }
  }, [dataJadwal]);

  if (loading) {
    return (
      <div className="w-full h-full flex-center">
        <div className="relative w-[150px] h-[150px] border-[20px] rounded-full border-backup overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
        </div>
      </div>
    );
  }
  if (!totalMapel) {
    return (
      <div className="w-full h-full flex-center">
        <p className="text-xs">Data tidak ada.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={totalMapel}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartDonute;
