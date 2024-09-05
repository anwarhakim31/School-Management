import TimeComponent from "@/components/elements/TimeComponent";
import CoverDefault from "../../assets/cover.png";
import ClassIcon from "../../assets/svg/class.svg?react";
import profile from "../../assets/profile.png";
import Wali from "../../assets/svg/siswa.svg?react";
import { useEffect, useState } from "react";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";
import axios from "axios";
import JadwalFragment from "@/components/fragments/admin/dashboard-siswa/JadwalFragment";
const SiswaDashboardPage = () => {
  const userData = useSelector(selectedUserData);
  const [dataJadwal, setDataJadwal] = useState([]);

  const [loading, setLoading] = useState(true);
  const [libur, setLibur] = useState([]);
  const [liburNasional, setLiburNasional] = useState([]);
  const [kelas, setKelas] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/jadwal/get-jadwal-siswa/" + userData.kelas,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setDataJadwal(res.data.jadwal);
          setLibur(res.data.libur);
          setLiburNasional(res.data.nasional);
          if (res.data.kelas) {
            setKelas(res.data.kelas);

            localStorage.setItem(
              "Kelas",
              JSON.stringify({
                userId: userData._id,
                kelas: res.data.kelas.kelas,
                namaKelas: res.data.kelas.nama,
              })
            );
          }
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userData.kelas) {
      getData();
    }
  }, [userData]);

  console.log(kelas);

  return (
    <section className="px-6 pt-4 pb-10">
      <div className="grid  md:grid-cols-10 gap-8">
        <div className=" md:col-span-7 ">
          <div className="relative bg-white w-full    rounded-md shadow-md overflow-hidden">
            <div
              style={{ backgroundImage: `url(${CoverDefault})` }}
              className={`bg-cover bg-center h-32 bg-yellow-bg-`}
            ></div>

            <div className="absolute w-32 h-32 top-[60px]  left-[5%] bg-backup rounded-full border-8 border-white overflow-hidden">
              {loading ? (
                <div className="absolute inset-0  bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
              ) : (
                <img
                  src={userData.photo ? userData.photo : profile}
                  alt=""
                  className="w-full h-full object-cover block"
                />
              )}
            </div>

            <div className="mt-10 mx-4 py-10  flex flex-wrap sm:flex-nowrap  gap-14  ">
              <div className="w-48 ">
                {loading ? (
                  <div className="relative h-6  bg-backup transition-all duration-300 ease-in-out">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                  </div>
                ) : (
                  <h3 className="text-base font-semibold text-neutral">
                    {userData.nama}
                  </h3>
                )}
                {loading ? (
                  <div className="relative h-4  mt-1 w-32 bg-backup transition-all duration-300 ease-in-out">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>{" "}
                  </div>
                ) : (
                  <h5 className="text-xs font-medium mt-1 text-gray-700">
                    {userData.nis}
                  </h5>
                )}
              </div>
              <div className="flex h-max gap-14 items-center flex-wrap">
                <div className="w-32 mb-1">
                  <h3 className="mb-3 text-sm text-neutral font-medium">
                    Kelas
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#fb7d5b] w-8 h-8 p-2 rounded-md flex-center">
                      <ClassIcon className="text-white text-xl" />
                    </div>
                    {loading ? (
                      <div className="relative h-4 w-full overflow-hidden mt-1 bg-backup transition-all duration-300 ease-in-out">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                      </div>
                    ) : (
                      <h5 className="text-xs  mt-1 text-gray-700">
                        {kelas.kelas} {kelas.nama}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="w-48">
                  <h3 className="mb-2 text-sm text-neutral font-medium">
                    Wali Kelas
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#fcc43e] w-8 h-8 p-2 rounded-md flex-center">
                      <Wali className="text-white text-xl" />
                    </div>
                    {loading ? (
                      <div className="flex flex-col w-full">
                        <div className="relative h-4 w-full mt-1 block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                        </div>
                        <div className="relative h-4 w-full mt-1 block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col ">
                        <h5 className="text-xs font-medium mt-1 text-gray-700">
                          {kelas?.waliKelas?.nama ||
                            "Tidak memiliki wali kelas."}
                        </h5>
                        <h5 className="text-xs  mt-1 text-gray-700">
                          + {kelas?.waliKelas?.phone}
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-32 mt-8"></div>
        </div>
        <div className=" h-fit  md:col-span-3 bg-white rounded-md shadow-md p-2">
          <TimeComponent />
          <JadwalFragment
            libur={libur}
            liburNasional={liburNasional}
            dataJadwal={dataJadwal}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default SiswaDashboardPage;
