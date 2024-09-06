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
import { ArrowDownToDotIcon, ChartBar, ChartPie, Route } from "lucide-react";
import PieChartDonute from "@/components/elements/dashboard-siswa/PieChartDonute";

const SiswaDashboardPage = () => {
  const userData = useSelector(selectedUserData);
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataNilai, setDataNilai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libur, setLibur] = useState([]);
  const [liburNasional, setLiburNasional] = useState([]);
  const [kelas, setKelas] = useState(null);

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
          if (res.data.kelas) {
            setKelas(res.data.kelas);

            if (localStorage.getItem("detail")) {
              localStorage.removeItem("detail");
            }
            localStorage.setItem(
              "detail",
              JSON.stringify({
                userId: userData._id,
                kelas: res.data.kelas.kelas,
                namaKelas: res.data.kelas.nama,
                ajaran: res.data.ajaran,
              })
            );
          }
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };
    const getNilai = async () => {
      try {
        const res = await axios.get(HOST + "/api/nilai/get-average", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataNilai(res.data.averages);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    if (userData.kelas) {
      getJadwal();
    } else {
      setLoading(false);
    }

    getNilai();
  }, [userData]);

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

            <div className="mt-10 mx-4 py-10  flex flex-wrap   gap-14  ">
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
                  <div className="relative h-4   w-32 bg-backup transition-all duration-300 ease-in-out">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>{" "}
                  </div>
                ) : (
                  <h5 className="text-xs font-medium mt-1 text-gray-700">
                    {userData.nis}
                  </h5>
                )}
              </div>
              <div className="flex h-max gap-14 items-center flex-wrap">
                <div className="w-48 ">
                  <h3 className=" text-sm mb-1 text-neutral font-medium">
                    Kelas
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#fb7d5b] w-8 h-8 p-2 rounded-md flex-center">
                      <ClassIcon className="text-white " />
                    </div>
                    {loading ? (
                      <div className="relative h-4 w-full overflow-hidden mt-1 bg-backup transition-all duration-300 ease-in-out">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                      </div>
                    ) : (
                      <h5 className="text-xs   text-gray-700">
                        {userData.kelas ? kelas?.kelas : "Tidak ada kelas."}{" "}
                        {kelas?.nama}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="w-48 ">
                  <h3 className=" text-sm text-neutral font-medium">
                    Wali Kelas
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="bg-[#fcc43e] w-8 h-8 p-2 rounded-md flex-center">
                      <Wali className="text-white text-xl" />
                    </div>
                    {loading ? (
                      <div className="flex flex-col w-full">
                        <div className="relative h-3 w-full   block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                        </div>
                        <div className="relative h-3 w-full mt-2  block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col ">
                        <h5 className="text-xs font-medium  text-gray-700">
                          {userData.kelas
                            ? kelas?.waliKelas?.nama
                            : "Tidak memiliki wali kelas."}
                        </h5>
                        <h5 className="text-[0.625rem]   text-gray-700">
                          + {userData.kelas ? kelas?.waliKelas?.phone : ""}
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="w-full p-4  bg-white rounded-md h-[310px] shadow-lg">
                <div className="border-b pb-4 border-gray-100 flex items-center gap-2">
                  <div>
                    <ChartPie
                      className="text-[#4d44b5]"
                      width={"20"}
                      height={"20"}
                    />
                  </div>
                  <span className="text-sm font-semibold">
                    Grafik Mata Pelajaran
                  </span>
                </div>
                <div className="h-[200px]">
                  <PieChartDonute dataJadwal={dataJadwal} loading={loading} />
                </div>

                {!loading && (
                  <p className="text-center text-xs mt-2 ml-1 font-medium ">
                    Total Mata Pelajaran
                  </p>
                )}
              </div>
              <div className="w-full p-4  bg-white rounded-md h-[310px] shadow-lg">
                <div className="border-b pb-4 border-gray-100 flex items-center gap-2">
                  <div>
                    <Route
                      className="text-[#4d44b5]"
                      width={"20"}
                      height={"20"}
                    />
                  </div>
                  <span className="text-sm font-semibold">
                    Rata-Rata Nilai Semester
                  </span>
                </div>
                <div className="h-[200px] overflow-y-auto scroll-none">
                  {dataNilai.length === 0 && (
                    <div className=" font-medium text-[0.625rem] my-2 flex-center rounded-md py-5 bg-gray-100 border">
                      <div>Data tidak ada.</div>
                    </div>
                  )}
                  {dataNilai.length > 0 &&
                    dataNilai.map((average, i) => {
                      const render =
                        average.totalMapel <= 5 ? (
                          <div
                            key={i}
                            className=" font-medium text-[0.625rem] my-2 flex-center rounded-md py-5 bg-gray-100 border"
                          >
                            <div>Data Tidak Ditemukan.</div>
                          </div>
                        ) : (
                          <div
                            key={i}
                            className=" font-medium text-[0.625rem] my-2  rounded-md p-2 bg-gray-100 border"
                          >
                            <div className="flex-center gap-1 capitalize">
                              <p className=""> Tahun Ajaran {average.ajaran}</p>
                              <p className="">{average.semester}</p>
                            </div>
                            <div className="flex-between mt-2   gap-2">
                              <p className="text-right">
                                Total Pelajaran{" "}
                                <span className="font-semibold text-neutral">
                                  {average.totalMapel}
                                </span>
                              </p>
                              <p className="text-right">
                                Rata-Rata Nilai{" "}
                                <span
                                  className={`${
                                    average.rataRata <= 65 &&
                                    "font-semibold text-neutral2"
                                  } ${
                                    average.rataRata > 85 &&
                                    average.rataRata <= 100 &&
                                    "font-semibold text-neutral1"
                                  } ${
                                    average.rataRata > 65 &&
                                    average.rataRata < 85 &&
                                    "font-semibold text-orange-600"
                                  }`}
                                >
                                  {Math.round(average.rataRata * 10) / 10}
                                </span>
                              </p>
                            </div>
                            <div></div>
                          </div>
                        );

                      return render;
                    })}
                </div>

                {dataNilai.length > 3 && (
                  <div className="flex-center flex-col ">
                    <ArrowDownToDotIcon
                      width={18}
                      height={18}
                      className="text-xs mt-2 ml-1 font-medium animate-bounce"
                    />
                    <p className="text-xs">Scroll</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
