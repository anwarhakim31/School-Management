import { useEffect, useState } from "react";
import Gant from "../../assets/svg/Gant.svg?react";
import responseError from "@/util/services";
import axios from "axios";
import { HOST } from "@/util/constant";
import GantChart from "@/components/elements/dashboard-guru/GantChart";

const GuruDashboardPage = () => {
  const [dataJadwal, setDataJadwal] = useState([]);
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
      }
    };

    getJadwal();
  }, []);

  return (
    <section className="px-6 py-4">
      <div className="w-full px-4 py-4 bg-white rounded-lg shadow-lg">
        <div className="border-b pb-4 border-gray-100 flex items-center gap-2 mb-4">
          <div>
            <Gant width={"20"} height={"20"} />
          </div>
          <span className="text-sm font-semibold">Jadwal Mengajar</span>
        </div>
        <GantChart schedules={dataJadwal} durasi={durasi} />
      </div>
    </section>
  );
};

export default GuruDashboardPage;
