import DropdownSiswa from "@/components/elements/DropdownSiswa";
import { selectedUserData } from "@/store/slices/auth-slice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/Schoolarcy (2).webp";
import axios from "axios";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { Printer } from "lucide-react";
import ReactToPrint from "react-to-print";
import PrintComponent from "@/components/views/guru/rapor/PrintModal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";

const HasilRaporPage = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectedUserData);
  const raporRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);
  const [dataRapor, setDataRapor] = useState([]);
  const [dataMapel, setDataMapel] = useState([]);
  const [dataAbsen, setDataAbsen] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          HOST + "/api/nilai/get-raport/" + userData._id,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setPublish(res.data.publish);
          setDataRapor(res.data.rapor);

          const uniqueMapel = Array.from(
            new Set(res.data.rapor.nilai.map((mapel) => mapel.mapel))
          );

          setDataMapel(uniqueMapel.sort((a, b) => a.localeCompare(b)));
          setDataAbsen(res.data.absen);
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
  }, [userData, navigate]);

  useEffect(() => {
    if (publish) {
      if (!window.sessionStorage.getItem("toast")) {
        window.sessionStorage.setItem("toast", "true");
        toast.info("Tidak bisa melihat rapor. karena nilai belum tersedia.");

        setTimeout(() => {
          window.sessionStorage.removeItem("toast");
          navigate("/siswa/dashboard");
        }, 50);
      }
    }
    if (!userData.kelas) {
      if (!window.sessionStorage.getItem("toast")) {
        window.sessionStorage.setItem("toast", "true");
        toast.info("Tidak memiliki akses. dikarena anda tidak memiliki kelas.");

        setTimeout(() => {
          window.sessionStorage.removeItem("toast");
          navigate("/siswa/dashboard");
        }, 50);
      }
    }
  }, [publish, userData]);

  const average = useMemo(() => {
    const initialAcc = {
      tugas: { total: 0, count: 0 },
      ujian: { total: 0, count: 0 },
    };

    // Accumulate total scores and counts for tugas and ujian
    const { tugas, ujian } = dataMapel.reduce((acc, mapel) => {
      const nilaiTugas = dataRapor.nilai.find(
        (item) => item.mapel === mapel && item.kategori === "tugas"
      );
      const nilaiUjian = dataRapor.nilai.find(
        (item) => item.mapel === mapel && item.kategori === "ujian"
      );

      if (nilaiTugas) {
        acc.tugas.total += nilaiTugas.nilai;
        acc.tugas.count += 1;
      }

      if (nilaiUjian) {
        acc.ujian.total += nilaiUjian.nilai;
        acc.ujian.count += 1;
      }

      return acc;
    }, initialAcc);

    // Calculate averages for tugas and ujian
    const tugasAverage = tugas.count > 0 ? tugas.total / tugas.count : 0;
    const ujianAverage = ujian.count > 0 ? ujian.total / ujian.count : 0;

    const totalMapel = dataMapel.length * 2;

    const totalSum = tugas.total + ujian.total;
    const overallAverage = totalSum / totalMapel || 0;

    return {
      tugasAverage,
      ujianAverage,
      overallAverage,
    };
  }, [dataRapor, dataMapel]);

  const totalAbsen = useMemo(() => {
    const initialAcc = {
      izin: 0,
      sakit: 0,
      alpha: 0,
    };

    return dataAbsen.reduce((acc, absen) => {
      switch (absen.status) {
        case "izin":
          acc.izin += 1;
          break;
        case "sakit":
          acc.sakit += 1;
          break;
        case "alpha":
          acc.alpha += 1;
          break;
        default:
          break;
      }
      return acc;
    }, initialAcc);
  }, [dataAbsen]);

  if (loading) {
    return (
      <section className="absolute inset-0 flex-center  bg-white">
        <SyncLoader className="w-8 h-8 lg:ml-52" color="blue" />
      </section>
    );
  }
  if (publish || !userData.kelas) {
    return <div className="fixed inset-0 bg-white"></div>;
  }

  if (!publish && !loading) {
    return (
      <section className="px-6 py-4 mb-4">
        <div className="flex flex-col flex-wrap gap-4">
          <div className="flex gap-4">
            <ReactToPrint
              trigger={() => (
                <button
                  disabled={loading || dataRapor?.nilai?.length === 0}
                  className=" btn disabled:cursor-not-allowed disabled:pointer-events-none flex-center py-2 gap-2 text-xs "
                >
                  <Printer width={18} height={18} /> Print
                </button>
              )}
              content={() => raporRef.current}
            />
          </div>
        </div>
        <div className="relative bg-white border mt-4 text-gray-900 border-gray-800 max-w-full md:max-w-[210mm] h-auto md:min-h-[297mm] mx-auto">
          <div className="p-4 md:p-8">
            <div className="flex justify-center border-b-2 border-double border-gray-700 py-10">
              <img
                src={logo}
                alt="Logo"
                className="w-[150px] h-[30px] md:w-[180px] md:h-[35px]"
              />
            </div>
            <div className="border-t border-gray-700 mt-2 "></div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-2 space-y-2">
                <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                  <p className="min-w-[30px] md:min-w-[80px] font-medium">
                    Nama Siswa
                  </p>
                  <span className="block">:</span>
                  <p className="font-medium">{dataRapor?.nama}</p>
                </div>
                <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                  <p className="min-w-[30px] md:min-w-[80px] font-medium">
                    Nomor Induk
                  </p>
                  <span className="block">:</span>
                  <p className="font-medium">{dataRapor?.nis}</p>
                </div>
                <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                  <p className="min-w-[30px] md:min-w-[80px] font-medium">
                    Wali Kelas
                  </p>
                  <span className="block">:</span>
                  <p className="font-medium">{dataRapor?.waliKelas}</p>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                  <p className="min-w-[30px] md:min-w-[80px] font-medium">
                    Kelas
                  </p>
                  <span className="block">:</span>
                  <p className="font-medium">{dataRapor?.kelas}</p>
                </div>
                <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                  <p className="min-w-[30px] md:min-w-[80px] font-medium">
                    Tahun Ajaran
                  </p>
                  <span className="block">:</span>
                  <p className="font-medium">{dataRapor?.ajaran}</p>
                </div>
                <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                  <p className="min-w-[30px] md:min-w-[80px] font-medium">
                    Semester
                  </p>
                  <span className="block">:</span>
                  <p className="font-medium">
                    {dataRapor?.semester?.split("semester").join(" ")}
                  </p>
                </div>
              </div>
            </div>
            <div className=" mt-10 border-gray-600">
              <table className="text-[0.5rem] w-full sm:text-[0.625rem] md:text-xs">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-2 w-[10%] text-center font-medium border border-gray-600"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 w-[40%] font-medium border border-gray-600"
                    >
                      Mata Pelajaran
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 w-[25%] text-center font-medium border border-gray-600"
                    >
                      Tugas
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 w-[25%] text-center font-medium border border-gray-600"
                    >
                      Ujian
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataRapor?.length === 0 && (
                    <tr>
                      <td
                        scope="row"
                        className="px-4 py-1 w-[10%] text-center  font-medium border border-gray-600"
                      >
                        1
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-1 w-[40%]  font-medium border border-gray-600"
                      >
                        Tidak Ada Nilai
                      </td>

                      <td
                        scope="row"
                        className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                      >
                        0
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                      >
                        0
                      </td>
                    </tr>
                  )}
                  {dataRapor && dataRapor?.nilai?.length === 0 && (
                    <tr>
                      <td
                        scope="row"
                        colSpan={4}
                        className="px-4 py-1 text-center   font-medium border border-gray-600"
                      >
                        Tidak memiliki nilai.
                      </td>
                    </tr>
                  )}
                  {dataMapel.map((mapel, i) => {
                    const nilaiTugas = dataRapor.nilai.find(
                      (item) =>
                        item.mapel === mapel && item.kategori === "tugas"
                    );
                    const nilaiUjian = dataRapor.nilai.find(
                      (item) =>
                        item.mapel === mapel && item.kategori === "ujian"
                    );

                    return (
                      <tr key={i + 1}>
                        <td
                          scope="row"
                          className="px-4 py-1 text-center w-[10%] font-medium border border-gray-600"
                        >
                          {i + 1}
                        </td>
                        <td
                          scope="row"
                          className="px-4 py-1 w-[40%] font-medium border border-gray-600"
                        >
                          {mapel}
                        </td>

                        <td
                          scope="row"
                          className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                        >
                          {nilaiTugas ? nilaiTugas.nilai : 0}
                        </td>
                        <td
                          scope="row"
                          className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                        >
                          {nilaiUjian ? nilaiUjian.nilai : 0}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td
                      scope="row"
                      colSpan={2}
                      className="px-4 py-1 w-[50%]  font-medium border border-gray-600"
                    >
                      Rata-Rata
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      {average.tugasAverage}
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      {average.ujianAverage}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      colSpan={2}
                      className="px-4 py-1 w-[50%]  font-medium border border-gray-600"
                    >
                      Total Rata-Rata
                    </td>
                    <td
                      scope="row"
                      colSpan={2}
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      {Math.round(average.overallAverage * 10) / 10}
                    </td>
                  </tr>
                  <tr className="border-none">
                    <td colSpan={4} className="border-none py-4"></td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      colSpan={2}
                      rowSpan={3}
                      className="px-4 py-1 w-[50%] text-center font-medium border border-gray-600"
                    >
                      Ketidakhadiran
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      Izin
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      {totalAbsen.izin}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      Sakit
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      {totalAbsen.sakit}
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      Alpha
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                    >
                      {totalAbsen.alpha}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {loading && (
            <div className="absolute flex-center w-full h-full inset-0 bg-black/5 backdrop-blur-sm">
              <div className="flex-center flex-col">
                <div className="w-10 h-10 rounded-full border-4 border-t-black/5 border-neutral animate-spin"></div>
                <p className="mt-4 text-xs">Loading</p>
              </div>
            </div>
          )}
          <div className="hidden">
            <PrintComponent
              ref={raporRef}
              dataMapel={dataMapel}
              dataRapor={dataRapor}
              average={average}
              totalAbsen={totalAbsen}
            />
          </div>
        </div>
      </section>
    );
  }
};

export default HasilRaporPage;
