import { useEffect, useState } from "react";
import Gant from "../../assets/svg/Gant.svg?react";
import responseError from "@/util/services";
import axios from "axios";
import { HOST } from "@/util/constant";
import GantChart from "@/components/elements/dashboard-guru/GantChart";
import SiswaIcon from "../../assets/svg/Teacher.svg?react";
import GuruIcon from "../../assets/svg/Student.svg?react";
import ClassIcon from "../../assets/svg/class.svg?react";
import MapelIcon from "../../assets/svg/pelajaran.svg?react";
import { Presentation } from "lucide-react";
import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";

import AnimasiCounter from "@/components/elements/AnimasiCounter";

const GuruDashboardPage = () => {
  const userData = useSelector(selectedUserData);
  const [loading, setLoading] = useState(true);
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataGuru, setDataGuru] = useState({});
  const [durasi, setDurasi] = useState(0);

  useEffect(() => {
    const getJadwal = async () => {
      try {
        const res = await axios.get(HOST + "/api/jadwal/get-jadwal-guru", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataJadwal(res.data.schedules);
          setDurasi(res.data.durasi);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    const getDetail = async () => {
      try {
        const res = await axios.get(HOST + "/api/guru/get-dashboard", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataGuru(res.data.detail);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getJadwal();
    getDetail();
  }, []);

  console.log(dataGuru);

  return (
    <section className="px-6 py-4">
      <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="min-h-[125px] flex flex-col justify-center   rounded-lg p-4 shadow-md"
          style={{
            background: "linear-gradient(to right top,#537ec0, #5bbbea)",
          }}
        >
          <div className="flex gap-2 border-b pb-2 items-center border-gray-50/50">
            <div className="bg-sky-600 p-1 rounded-lg">
              <MapelIcon
                width={"20"}
                height={"20"}
                className={" stroke-[1] text-white"}
              />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1 ">
              Guru Bidang Studi
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-2/3 m-auto bg-backup rounded-sm border-t-backup animata-pulse duration-300"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-2xl h-12 truncate">
                {dataGuru && dataGuru.bidangStudi}
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
              <Presentation
                width={"20"}
                height={"20"}
                className={"text-white "}
              />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1 ">
              Total Pertemuan
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-white rounded-full border-t-gray-500 animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-3xl h-12 ">
                {dataGuru && (
                  <AnimasiCounter targetNumber={dataGuru.jumlahPertemuan} />
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
              Wali Kelas
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center w-full flex-col gap-3  animate-pulse duration-300">
                <div className="w-6 h-4 bg-backup rounded-sm"></div>
                <div className="w-1/2 h-4 bg-backup rounded-sm"></div>
              </div>
            ) : (
              <div className=" flex-center flex-col text-white font-semibold  h-12 ">
                <h1 className="text-2xl">
                  {userData.waliKelas && userData.waliKelas.kelas}
                </h1>
                <span className="block">
                  {userData.waliKelas && userData.waliKelas.nama}
                </span>
              </div>
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
              <SiswaIcon
                width={"20"}
                height={"20"}
                className={" text-white stroke-[1]"}
              />
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-1  ">
              Total Wali Murid
            </h3>
          </div>
          <div className="h-8 flex-1 flex-center">
            {loading ? (
              <div className=" flex-center h-6 w-6 m-auto border-4 border-t-4 border-white rounded-full border-t-gray-500 animate-spin"></div>
            ) : (
              <h1 className=" flex-1 flex-center  text-white font-semibold text-3xl h-12 ">
                {dataGuru && (
                  <AnimasiCounter targetNumber={dataGuru.totalMurid} />
                )}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-8 px-4 py-4 bg-white rounded-lg shadow-lg">
        <div className="border-b pb-4 border-gray-100 flex items-center gap-2 mb-4">
          <div>
            <Gant width={"20"} height={"20"} />
          </div>
          <span className="text-xs font-semibold">Jadwal Mengajar</span>
        </div>
        <GantChart schedules={dataJadwal} durasi={durasi} loading={loading} />
      </div>
    </section>
  );
};

export default GuruDashboardPage;
