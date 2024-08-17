import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const BarChartComponent = ({ data, x, y, loading }) => {
  if (loading) {
    return (
      <div className="w-full h-full flex-center">
        <div className="flex items-end w-3/4 h-full  justify-between px-4 gap-8 animate-pulse duration-300 border-b">
          <div className="h-[150px] w-[30px] bg-backup  rounded-sm"></div>
          <div className="h-[100px] w-[30px] bg-backup  rounded-sm"></div>
          <div className="h-[150px] w-[30px] bg-backup  rounded-sm"></div>
          <div className="h-[100px] w-[30px] bg-backup  rounded-sm"></div>
          <div className="h-[130px] w-[30px] bg-backup  rounded-sm"></div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-xs h-full w-full   flex-center">Data tidak ada.</p>
    );
  }

  return (
    <ResponsiveContainer
      width={"100%"}
      height="100%"
      className={"text-xs mt-4 text-gray-800 outline-none"}
    >
      <BarChart
        width={"100%"}
        height={400}
        outerRadius={5}
        data={data}
        margin={{
          right: 20,
          left: -30,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.3} />
        <XAxis dataKey={y} tickLine={false} tickMargin={10} />
        <YAxis fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip cursor={false} content={<CustomTooltip />} />

        <Bar
          dataKey={x}
          fill="#4d44b5"
          className="outline-none u"
          radius={4}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border flex text-xs gap-4 rounded-md">
        <p className=" text-xs ">{label}</p>
        <p className="text-xs text-neutral">
          <span className="ml-2">{payload[0].value} Siswa</span>
        </p>
      </div>
    );
  }
};
