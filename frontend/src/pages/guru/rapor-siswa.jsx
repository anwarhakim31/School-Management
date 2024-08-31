import DropdownSiswa from "@/components/elements/DropdownSiswa";
import { selectedUserData } from "@/store/slices/auth-slice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/Schoolarcy (2).webp";
import axios from "axios";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";

const RaporSiswaPage = () => {
  const userData = useSelector(selectedUserData);
  const [loading, setLoading] = useState(false);
  const [dataRapor, setDataRapor] = useState([]);
  const [dataMapel, setDataMapel] = useState([]);
  const [siswaId, setSiswaId] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(HOST + "/api/nilai/get-raport/" + siswaId, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataRapor(res.data.rapor);

          const uniqueMapel = Array.from(
            new Set(res.data.rapor.nilai.map((mapel) => mapel.mapel))
          );

          setDataMapel(uniqueMapel);
        }
      } catch (error) {
        responseError(error);
      }
    };

    if (siswaId) {
      getData();
    }
  }, [siswaId]);

  const handleSelectSiswa = (value) => {
    setSiswaId(value);
  };

  return (
    <section className="px-6 py-4 mb-4">
      <div className="flex flex-col flex-wrap gap-4">
        <h3 className="text-sm font-semibold text-neutral">
          Pilih Siswa untuk menampilkan dan cetak rapor
        </h3>
        <div className="flex items-center w-fit gap-4">
          <p className="text-sm font-semibold text-gray-700">Siswa</p>
          <DropdownSiswa
            onChange={handleSelectSiswa}
            url={`/api/siswa/get-siswa/kelas/${userData.waliKelas._id}`}
          />
        </div>
      </div>
      <div className="bg-white border mt-4 text-gray-900 border-gray-800 max-w-full md:max-w-[210mm] h-auto md:h-[297mm] mx-auto">
        <div className="p-4 md:p-8">
          <div className="flex justify-center border-b-2 border-double border-gray-700 py-6">
            <img
              src={logo}
              alt="Logo"
              className="w-[150px] h-[30px] md:w-[180px] md:h-[40px]"
            />
          </div>
          <div className="border-t-2 border-gray-700 mt-2 md:mx-8"></div>
          <div className="grid grid-cols-4 mt-6">
            <div className="col-span-2 space-y-2">
              <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                <p className="min-w-[30px] md:min-w-[80px] font-medium">
                  Nama Siswa
                </p>
                <span className="block">:</span>
                <p className="font-medium">Anwar Hakim</p>
              </div>
              <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                <p className="min-w-[30px] md:min-w-[80px] font-medium">
                  Nomor Induk
                </p>
                <span className="block">:</span>
                <p className="font-medium">1232131</p>
              </div>
              <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                <p className="min-w-[30px] md:min-w-[80px] font-medium">
                  Wali Kelas
                </p>
                <span className="block">:</span>
                <p className="font-medium">1232131</p>
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                <p className="min-w-[30px] md:min-w-[80px] font-medium">
                  Kelas
                </p>
                <span className="block">:</span>
                <p className="font-medium">Anwar Hakim</p>
              </div>
              <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                <p className="min-w-[30px] md:min-w-[80px] font-medium">
                  Tahun Ajaran
                </p>
                <span className="block">:</span>
                <p className="font-medium">1232131</p>
              </div>
              <div className="flex text-[0.5rem] sm:text-[0.625rem] md:text-xs gap-2">
                <p className="min-w-[30px] md:min-w-[80px] font-medium">
                  Semester
                </p>
                <span className="block">:</span>
                <p className="font-medium">1232131</p>
              </div>
            </div>
          </div>
          <div className="border mt-6 border-gray-600">
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
                <tr>
                  <td
                    scope="row"
                    className="px-4 py-1 text-center w-[10%] font-medium border border-gray-600"
                  >
                    1
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-1 w-[40%] font-medium border border-gray-600"
                  >
                    1
                  </td>

                  <td
                    scope="row"
                    className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                  >
                    1
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-1 w-[25%] text-center font-medium border border-gray-600"
                  >
                    1
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaporSiswaPage;
