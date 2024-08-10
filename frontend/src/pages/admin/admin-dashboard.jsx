import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import React, { useEffect, useRef, useState } from "react";
import SiswaIcon from "../../assets/svg/Teacher.svg?react";
import GuruIcon from "../../assets/svg/Student.svg?react";
import ClassIcon from "../../assets/svg/class.svg?react";
import MapelIcon from "../../assets/svg/pelajaran.svg?react";
import AnimasiCounter from "@/components/elements/AnimasiCounter";
import Barchart from "../../assets/svg/barchart.svg?react";

const salesData = [
  {
    name: "Jan",
    revenue: 2,
  },
  {
    name: "Feb",
    revenue: 1,
  },
  {
    name: "Mar",
    revenue: 3,
  },
  {
    name: "Apr",
    revenue: 4,
  },
  {
    name: "May",
    revenue: 5,
  },
  {
    name: "Jun",
    revenue: 6,
  },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer
      width={"100%"}
      height="80%"
      className={"text-xs mt-4 text-gray-800 outline-none"}
    >
      <BarChart
        width={200}
        height={5}
        accessibilityLayer
        outerRadius={5}
        data={salesData}
        margin={{
          right: 50,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.2} />
        <XAxis dataKey="name" tickLine={false} tickMargin={10} />
        <YAxis fontSize={10} axisLine={false} tickLine={false} />
        <Tooltip cursor={false} />

        <Bar
          dataKey="revenue"
          fill="#4d44b5"
          className="outline-none u"
          radius={4}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const AdminDashboard = () => {
  const [dataUmum, setdataUmum] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAjaran = async () => {
      try {
        const res = await axios.get(HOST + "/api/umum/get-umum", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setdataUmum(res.data.data);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    getAjaran();
  }, []);

  return (
    <section className="px-6 py-4  ">
      <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="min-h-[125px] flex flex-col justify-center   rounded-lg p-4 shadow-md"
          style={{
            background: "linear-gradient(to right top,#537ec0, #5bbbea)",
          }}
        >
          <div className="flex gap-2 border-b pb-2 items-center border-gray-50/50">
            <div className="bg-sky-600 p-1 rounded-lg">
              <SiswaIcon width={"20"} height={"20"} className={" stroke-[1]"} />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1 ">
              Total Siswa
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-white rounded-full border-t-neutral animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalSiswa} />
                )}
              </h1>
            )}
          </div>
        </div>
        <div
          className="min-h-[125px] flex flex-col rounded-lg p-4 shadow-md"
          style={{
            background: "linear-gradient(to right top, #ba75e3, #6f80dc)",
          }}
        >
          <div className="flex gap-2 border-b pb-2 items-center border-gray-50/50">
            <div className="bg-purple-600 p-1 rounded-lg">
              <GuruIcon width={"20"} height={"20"} className={" stroke-[1]"} />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1 ">
              Total Guru
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-white rounded-full border-t-gray-500 animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalGuru} />
                )}
              </h1>
            )}
          </div>
        </div>
        <div
          className="min-h-[125px] flex flex-col rounded-lg p-4 shadow-md"
          style={{
            background: "linear-gradient(to right top,#c94f60,#fe967d)",
          }}
        >
          <div className="flex gap-2 border-b pb-2 items-center border-gray-50/50">
            <div className="bg-rose-500 p-1 rounded-lg">
              <ClassIcon
                width={"20"}
                height={"20"}
                className={" stroke-white stroke-[1] text-white"}
              />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1 ">
              Total Kelas
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-white rounded-full border-t-gray-500 animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalKelas} />
                )}
              </h1>
            )}
          </div>
        </div>
        <div
          className="min-h-[125px] flex flex-col rounded-lg p-4 shadow-md"
          style={{
            background: "linear-gradient(to right top, #4f46e5, #54aff7)",
          }}
        >
          <div className="flex gap-2 border-b pb-2 items-center border-gray-50/50">
            <div className="bg-indigo-600 p-1 rounded-lg">
              <MapelIcon
                width={"20"}
                height={"20"}
                className={" text-white stroke-[1]"}
              />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1  ">
              Total Mata Pelajaran
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-white rounded-full border-t-gray-500 animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalMapel} />
                )}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-wrap md:flex-nowrap items-center mt-8 gap-8">
        <div className="w-full p-4 md:w-1/2 bg-white rounded-lg  shadow-lg">
          <div className="border-b pb-4 border-gray-100 flex items-center gap-2">
            <div>
              <Barchart width={"20"} height={"20"} />
            </div>
            <span className="text-sm font-semibold">Grafik Siswa</span>
          </div>
          <BarChartComponent />
          <p className="text-center text-xs mt-2 font-medium ">
            Pertahun Ajaran
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-lg h-[300px] shadow-lg"></div>
      </div>
    </section>
  );
};

export default AdminDashboard;
