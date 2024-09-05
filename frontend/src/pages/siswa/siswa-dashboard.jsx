import TimeComponent from "@/components/elements/TimeComponent";
import CoverDefault from "../../assets/cover.png";
import ClassIcon from "../../assets/svg/class.svg?react";
import { useEffect, useState } from "react";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";
import axios from "axios";
const SiswaDashboardPage = () => {
  const userData = useSelector(selectedUserData);
  const [dataJadwal, setDataJadwal] = useState([]);
  const today = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    new Date()
  );
  const [loading, setLoading] = useState(true);
  const [libur, setLibur] = useState([]);
  const [liburNasional, setLiburNasional] = useState([]);

  useEffect(() => {
    const getJadwal = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/jadwal/get-jadwal-siswa/" + userData.kelas,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setDataJadwal(res.data.jadwal);
          setLibur(res.data.libur);
          setLiburNasional(res.data.nasional);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userData.kelas) {
      getJadwal();
    }
  }, [userData]);

  function matchingTanggal(tanggal) {
    return tanggal.split("T")[0];
  }

  console.log(new Date().toISOString());
  console.log(liburNasional.some((holiday) => holiday));

  return (
    <section className="px-6 pt-4 pb-10">
      <div className="grid  md:grid-cols-10 gap-8">
        <div className="h-fit  md:col-span-7 ">
          <div className="relative bg-white w-full h-full   rounded-md shadow-md overflow-hidden">
            <div
              style={{ backgroundImage: `url(${CoverDefault})` }}
              className={`bg-cover bg-center h-32 bg-yellow-bg-`}
            ></div>
            <div className="absolute w-32 h-32 top-[60px] lg:top-[68px] left-[5%] bg-backup rounded-full border-8 border-white"></div>
            <div className="mt-10 mx-[6%] py-10 flex justify-between flex-wrap gap-20 sm:gap-24 lg:gap-32">
              <div className="">
                <h3 className="text-base font-semibold text-neutral">
                  Anwar Hakim
                </h3>
                <h5 className="text-xs font-medium mt-1 text-gray-700">
                  202043501579
                </h5>
              </div>
              <div className="flex-1 flex justify-between gap-8 flex-col xl:flex-row flex-wrap">
                <div className="relative flex items-center gap-2">
                  <h3 className="text-sm font-medium text-neutral absolute -top-5  flex-center gap-4">
                    Kelas
                  </h3>
                  <div className="bg-[#fb7d5b] rounded-full p-2 mt-2 ">
                    <ClassIcon className={"text-white"} />
                  </div>
                  <p className="mt-2 text-xs font-medium">7 A</p>
                </div>
                <div className="relative md:w-40 flex items-center gap-2">
                  <h3 className="text-sm font-medium text-neutral absolute -top-5  flex-center gap-4">
                    Wali Kelas
                  </h3>
                  <div className="bg-[#fcc43e] rounded-full p-2 mt-2 ">
                    <ClassIcon className={"text-white"} />
                  </div>
                  <div className="flex flex-wrap">
                    <p className="mt-2 text-xs font-medium">Ucup</p>
                    <p className="mt-2 text-xs font-medium">+08131063253</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-32 mt-8"></div>
        </div>
        <div className=" h-fit  md:col-span-3 bg-white rounded-md shadow-md p-2">
          <TimeComponent />
          <h1 className="text-sm font-medium text-neutral  border-b border-neutral text-center py-2">
            Jadwal Sekarang
          </h1>
          <div className="relative min-h-14 grid grid-cols-1  xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-1 py-2  gap-2">
            {!liburNasional.some(
              (holiday) =>
                matchingTanggal(holiday.tanggal) ===
                  matchingTanggal(new Date().toISOString()) ||
                !libur.some((holiday) => holiday.hari === today)
            ) &&
              dataJadwal
                .filter((jadwal) => jadwal.hari === today)
                .map((jadwal) => (
                  <div key={jadwal?._id} className=" py-2 ">
                    <div className="flex text-xs justify-center items-center gap-1 ">
                      <h5>⫷ {jadwal?.mulai}</h5>
                      <span> : </span>
                      <h5>{jadwal?.selesai} ⫸</h5>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-medium">
                        {jadwal?.bidangStudi?.nama}
                      </p>
                      <p className="text-xs mt-1">{jadwal.guru.nama}</p>
                    </div>
                  </div>
                )).length === 0 && (
                <div className="py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-xs justify-center items-center gap-1 ">
                  <p className="font-medium capitalize text-center text-[#fb7d5b]">
                    {loading ? "" : "Tidak ada jadwal"}
                  </p>
                </div>
              )}
            {liburNasional.length > 0 &&
              liburNasional
                .filter(
                  (holiday) =>
                    matchingTanggal(holiday.tanggal) ===
                    matchingTanggal(new Date().toISOString())
                )
                .map((holiday) => (
                  <div
                    key={holiday._id}
                    className="py-4 absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-xs justify-center items-center gap-1 "
                  >
                    <p className="font-medium capitalize text-center text-[#fb7d5b]">
                      {loading
                        ? ""
                        : `Tidak ada jadwal. Hari ${
                            holiday.keterangan.toLowerCase().includes("libur")
                              ? holiday.keterangan
                              : `Libur ${holiday.keterangan}`
                          }`}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiswaDashboardPage;
