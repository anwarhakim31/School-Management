import DropdownSiswa from "@/components/elements/DropdownSiswa";
import { selectedUserData } from "@/store/slices/auth-slice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { Printer } from "lucide-react";
import ReactToPrint from "react-to-print";
import PrintComponent from "@/components/views/guru/rapor/PrintModal";
import TableRapor from "@/components/views/guru/rapor/TableRapor";

const RaporSiswaPage = () => {
  const userData = useSelector(selectedUserData);
  const raporRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dataRapor, setDataRapor] = useState([]);
  const [dataMapel, setDataMapel] = useState([]);
  const [siswaId, setSiswaId] = useState("");
  const [dataAbsen, setDataAbsen] = useState([]);

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

          setDataMapel(uniqueMapel.sort((a, b) => a.localeCompare(b)));
          setDataAbsen(res.data.absen);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    if (siswaId) {
      getData();
    }
  }, [siswaId]);

  const handleSelectSiswa = (value) => {
    setSiswaId(value);
  };

  const average = useMemo(() => {
    // Initialize accumulator object
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

  return (
    <section className="px-6 py-4 mb-4">
      <div className="flex flex-col flex-wrap gap-4">
        <h3 className="text-sm font-semibold text-neutral">
          Pilih Siswa untuk menampilkan dan cetak rapor
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center w-fit gap-4">
            <p className="text-sm font-semibold text-gray-700">Siswa</p>
            <DropdownSiswa
              onChange={handleSelectSiswa}
              url={`/api/siswa/get-siswa/kelas/${userData.waliKelas._id}`}
            />
          </div>
          <ReactToPrint
            trigger={() => (
              <button
                disabled={loading || dataRapor?.nilai?.length === 0 || !siswaId}
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
        <TableRapor
          dataMapel={dataMapel}
          dataRapor={dataRapor}
          average={average}
          totalAbsen={totalAbsen}
        />
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
};

export default RaporSiswaPage;
