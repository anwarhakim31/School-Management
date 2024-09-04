import TimeComponent from "@/components/elements/TimeComponent";
import CoverDefault from "../../assets/cover.png";
import ClassIcon from "../../assets/svg/class.svg?react";
import { useEffect, useState } from "react";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { useSelector } from "react-redux";
const SiswaDashboardPage = () => {
  const userData = useSelector(selectedUserData);
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const [dataJadwal, setDataJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libur, setLibur] = useState([]);
  const [hover, setHover] = useState(false);

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

  return (
    <section className="px-6 pt-4 pb-10">
      <div className="grid  md:grid-cols-10 gap-8">
        <div className=" md:col-span-7 ">
          <div className="relative bg-white w-full h-[400px] lg:h-72 rounded-md shadow-md overflow-hidden">
            <div
              style={{ backgroundImage: `url(${CoverDefault})` }}
              className={`bg-cover bg-center w-full h-1/2 bg-yellow-bg-`}
            ></div>
            <div className="absolute w-32 h-32 top-[124px] lg:top-[68px] left-[5%] bg-backup rounded-full border-8 border-white"></div>
            <div className="mt-16 mx-[6%] flex justify-between gap-12 sm:gap-24 lg:gap-32">
              <div className="">
                <h3 className="text-base font-semibold text-neutral">
                  Anwar Hakim
                </h3>
                <h5 className="text-xs font-medium mt-1 text-gray-700">
                  202043501579
                </h5>
              </div>
              <div className="flex-1 flex justify-between gap-8 flex-col lg:flex-row">
                <div className="relative flex items-center gap-2">
                  <h3 className="text-sm font-medium text-neutral absolute -top-5  flex-center gap-4">
                    Kelas
                  </h3>
                  <div className="bg-[#fb7d5b] rounded-full p-2 mt-2 ">
                    <ClassIcon className={"text-white"} />
                  </div>
                  <p className="mt-2 text-xs font-medium">7 A</p>
                </div>
                <div className="relative w-40 flex items-center gap-2">
                  <h3 className="text-sm font-medium text-neutral absolute -top-5  flex-center gap-4">
                    Wali Kelas
                  </h3>
                  <div className="bg-[#fcc43e] rounded-full p-2 mt-2 ">
                    <ClassIcon className={"text-white"} />
                  </div>
                  <p className="mt-2 text-xs font-medium">Ucup</p>
                  <p className="mt-2 text-xs font-medium">+08131063253</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-32 mt-8"></div>
        </div>
        <div className="h-56 md:col-span-3 bg-white rounded-md shadow-md p-2">
          <TimeComponent />
          <h1 className="text-sm font-medium text-neutral  border-b border-neutral text-center py-2">
            Jadwal Sekarang
          </h1>
          <div className="grid grid-cols-3 lg:grid-cols-1 py-2  gap-2">
            <div className=" py-2 ">
              <div className="flex text-xs justify-center gap-1 ">
                <h5>13:00</h5>
                <span> : </span>
                <h5>14:00</h5>
              </div>
              <div className="mt-2">
                <p className="text-xs font-medium">Matematika</p>
                <p className="text-xs ">Matematika</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiswaDashboardPage;
