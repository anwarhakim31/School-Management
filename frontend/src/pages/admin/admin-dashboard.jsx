import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import SiswaIcon from "../../assets/svg/Teacher.svg?react";
import GuruIcon from "../../assets/svg/Student.svg?react";
import ClassIcon from "../../assets/svg/class.svg?react";
import MapelIcon from "../../assets/svg/pelajaran.svg?react";
import AnimasiCounter from "@/components/elements/AnimasiCounter";
import Barchart from "../../assets/svg/barchart.svg?react";
import Piechart from "../../assets/svg/piechart.svg?react";
import BarChartComponent from "@/components/elements/dashboard-admin/BarChart";
import PieChartComponent from "@/components/elements/dashboard-admin/Piechar";
import AreaChartComponent from "@/components/elements/dashboard-admin/AreacChart";
import { AreaChart } from "lucide-react";

const AdminDashboard = () => {
  const [dataUmum, setdataUmum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siswaPertingkat, setSiswaPertingkat] = useState([]);

  useEffect(() => {
    const getAjaran = async () => {
      try {
        const res = await axios.get(HOST + "/api/master/get-master", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setdataUmum(res.data.data);
          setSiswaPertingkat(res.data.siswaPertingkat);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getAjaran();
  }, []);

  return (
    <section className="px-6 pt-4 pb-10   ">
      <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="min-h-[125px] flex flex-col justify-center  bg-white rounded-md p-4 shadow-md">
          <div className="flex gap-2 border-b pb-2 items-center border-neutral/50">
            <div
              style={{
                background: "linear-gradient(to right top,#537ec0, #5bbbea)",
              }}
              className=" p-1 rounded-md"
            >
              <SiswaIcon width={"20"} height={"20"} className={" stroke-[1]"} />
            </div>
            <h3 className="text-sm font-semibold text-neutral line-clamp-1 ">
              Total Siswa
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-neutral rounded-full border-t-white animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-neutral font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalSiswa} />
                )}
              </h1>
            )}
          </div>
        </div>
        <div className="min-h-[125px] flex flex-col bg-white rounded-md p-4 shadow-md">
          <div className="flex gap-2 border-b pb-2 items-center border-neutral/50">
            <div
              style={{
                background: "linear-gradient(to right top, #ba75e3, #6f80dc)",
              }}
              className=" p-1 rounded-md"
            >
              <GuruIcon width={"20"} height={"20"} className={" stroke-[1]"} />
            </div>
            <h3 className="text-sm font-semibold text-neutral line-clamp-1 ">
              Total Guru
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-neutral rounded-full border-t-white animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-neutral font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalGuru} />
                )}
              </h1>
            )}
          </div>
        </div>
        <div className="min-h-[125px] flex flex-col bg-white rounded-md p-4 shadow-md">
          <div className="flex gap-2 border-b pb-2 items-center border-neutral/50">
            <div
              style={{
                background: "linear-gradient(to right top,#c94f60,#fe967d)",
              }}
              className=" p-1 rounded-md"
            >
              <ClassIcon
                width={"20"}
                height={"20"}
                className={" stroke-white stroke-[1] text-white"}
              />
            </div>
            <h3 className="text-sm font-semibold text-neutral line-clamp-1 ">
              Total Kelas
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-neutral rounded-full border-t-white animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-neutral font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalKelas} />
                )}
              </h1>
            )}
          </div>
        </div>
        <div className="min-h-[125px] bg-white flex flex-col rounded-md p-4 shadow-md">
          <div className="flex gap-2 border-b pb-2 items-center border-neutral/50">
            <div
              style={{
                background: "linear-gradient(to right top, #4f46e5, #54aff7)",
              }}
              className=" p-1 rounded-md"
            >
              <MapelIcon
                width={"20"}
                height={"20"}
                className={" text-white stroke-[1]"}
              />
            </div>
            <h3 className="text-sm font-semibold text-neutral line-clamp-1  ">
              Total Mata Pelajaran
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-neutral rounded-full border-t-white animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-neutral font-semibold text-3xl h-12 ">
                {dataUmum && (
                  <AnimasiCounter targetNumber={dataUmum.totalMapel} />
                )}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="w-full p-4  mt-10 bg-white rounded-md h-[350px] shadow-lg">
        <div className="border-b pb-4 border-gray-100 flex items-center gap-2">
          <div>
            <AreaChart width={"20"} height={"20"} className="text-[#4d44b5]" />
          </div>
          <span className="text-sm font-semibold">
            Grafik Total Siswa Pertingkat
          </span>
        </div>
        <div className="h-[250px] w-full">
          <AreaChartComponent data={siswaPertingkat} />
        </div>
      </div>
      <div className="flex justify-center flex-wrap md:flex-nowrap items-center mt-10 gap-8">
        <div className="w-full p-4 md:w-1/2 bg-white rounded-md h-[310px] shadow-lg">
          <div className="border-b pb-4 border-gray-100 flex items-center gap-2">
            <div>
              <Barchart width={"20"} height={"20"} />
            </div>
            <span className="text-sm font-semibold">
              Grafik Pertambahan Siswa
            </span>
          </div>
          <div className="h-[200px]">
            <BarChartComponent
              loading={loading}
              data={dataUmum.siswaPerAjaran}
              y={"ajaran"}
              x={"totalSiswa"}
            />
          </div>

          {!loading && (
            <p className="text-center text-xs mt-2 ml-1 font-medium ">
              Tahun Ajaran
            </p>
          )}
        </div>
        <div className="w-full p-4 md:w-1/2 bg-white rounded-md h-[310px] shadow-lg">
          <div className="border-b pb-4 border-gray-100 flex items-center gap-2">
            <div>
              <Piechart width={"20"} height={"20"} />
            </div>
            <span className="text-sm font-semibold">Grafik Kelas</span>
          </div>
          <div className="h-[200px]">
            <PieChartComponent
              data={dataUmum.kelasPerTotal}
              loading={loading}
            />
          </div>

          {!loading && (
            <p className="text-center text-xs mt-6 ml-1 font-medium ">
              Jumlah Perkelas
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
