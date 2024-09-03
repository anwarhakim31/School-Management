import React from "react";
import TableAbsen from "@/components/fragments/guru/rekap/TableAbsen";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import {
  EllipsisVerticalIcon,
  FileDownIcon,
  Filter,
  Printer,
} from "lucide-react";
import { useEffect, useRef, useState, Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import DropdownTahunAjaran from "@/components/elements/DropdownTahunAjaran";
import DropdownSemester from "@/components/elements/DropdownSemester";

import { data } from "autoprefixer";

import KelasDropdown from "@/components/elements/KelasDropdown";
import NamaKelasDropdown from "@/components/elements/NamaKelasDropdown";
import TableNilai from "@/components/fragments/TableNilai";
import PrintComponentNilai from "@/components/fragments/PrintModalNilai";

const RekapNilaiPageadmin = () => {
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false);
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [semester, setSemester] = useState("");
  const [kelas, setKelas] = useState("");
  const [idKelas, setIdKelas] = useState("");
  const userData = useSelector(selectedUserData);
  const [dataKelas, setDataKelas] = useState({});
  const [rekapNilai, setRekapNilai] = useState([]);
  const [dataMapel, setDataMapel] = useState([]);

  const componentRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(HOST + "/api/nilai/rekap-nilai", {
          params: {
            semester,
            tahunAjaran,
            id: idKelas,
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          const sortMapel = res.data.nilai.sort((a, b) =>
            a.mataPelajaran.kode.localeCompare(b.mataPelajaran.kode)
          );

          const uniqueMapel = Array.from(
            new Set(sortMapel.map((mapel) => mapel.mataPelajaran.kode))
          );

          setDataMapel(uniqueMapel);
          setRekapNilai(res.data.nilai);
          setDataKelas(res.data.kelas);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    if ((idKelas, semester, idKelas)) {
      getData();
    }
  }, [semester, tahunAjaran, idKelas]);

  const handleSelectAjaran = (value) => {
    setTahunAjaran(value);
  };

  const handleSelectSemester = (value) => {
    setSemester(value);
  };
  const onSelectKelas = (value) => {
    setKelas(value);
  };

  const onSelectIdKelas = (value) => {
    setIdKelas(value);
  };

  const handleToggleMenu = (e) => {
    e.preventDefault();
    setIsMenu(!isMenu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenu]);

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="  bg-white p-4 rounded-md shadow-md border border-b-0">
        <h3 className="text-sm font-semibold mb-4 text-neutral">
          Pilih rekap nilai siswa pada setiap kelas.
        </h3>
        <div className="flex-between">
          <div className="hidden xl:flex-between">
            <div className="flex justify-start flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-gray-700">
                  Tahun Ajaran
                </p>
                <DropdownTahunAjaran onSelectAjaran={handleSelectAjaran} />
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-gray-700">Semester</p>
                <DropdownSemester onSelectedSemester={handleSelectSemester} />
              </div>
              <div className="flex justify-start flex-wrap md:flex-nowrap  gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-gray-700">Kelas</p>
                  <KelasDropdown onChange={onSelectKelas} />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-gray-700">
                    Nama Kelas
                  </p>
                  <NamaKelasDropdown onChange={onSelectIdKelas} kelas={kelas} />
                </div>
              </div>
            </div>
          </div>
          <div className="relative block xl:hidden w-fit" ref={menuRef}>
            <button
              onClick={handleToggleMenu}
              className="flex-center  w-8 h-8 rounded-full border p-1 bg-gray-100 hover:bg-gray-200 border-neutral"
            >
              <EllipsisVerticalIcon
                width={15}
                height={15}
                className="text-gray-800"
              />
            </button>

            {isMenu && (
              <div className="absolute left-0  w-max  mt-1 z-10 bg-white border shadow-md rounded-md p-4">
                <div className="grid grid-cols-2 items-center">
                  <p className="text-sm font-semibold text-gray-700">
                    Tahun Ajaran
                  </p>
                  <DropdownTahunAjaran onSelectAjaran={handleSelectAjaran} />
                </div>
                <div className="grid grid-cols-2 mt-4 items-center">
                  <p className="text-sm font-semibold text-gray-700">
                    Semester
                  </p>
                  <DropdownSemester onSelectedSemester={handleSelectSemester} />
                </div>
                <div className="grid grid-cols-2 mt-4 items-center">
                  <p className="text-xs font-semibold text-gray-700">Kelas</p>
                  <KelasDropdown onChange={onSelectKelas} />
                </div>
                <div className="grid grid-cols-2 mt-4 items-center">
                  <p className="text-xs font-semibold text-gray-700">
                    Nama Kelas
                  </p>
                  <NamaKelasDropdown onChange={onSelectIdKelas} kelas={kelas} />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end flex-wrap gap-4">
            <button
              disabled={loading || rekapNilai.length === 0}
              onClick={() =>
                exportToExcel(
                  rekapNilai,
                  dataMapel,
                  dataKelas,
                  tahunAjaran,
                  semester
                )
              }
              className="rounded-md py-2 border disabled:cursor-not-allowed text-xs px-4 shadow-sm hover:border-neutral bg-white font-medium flex-center gap-2 border-gray-400"
            >
              <FileDownIcon height={15} width={15} />
              Excel
            </button>

            <ReactToPrint
              trigger={() => (
                <button
                  disabled={loading || rekapNilai.length === 0}
                  className="rounded-md py-2 border disabled:cursor-not-allowed text-xs px-4 shadow-sm hover:border-neutral bg-white font-medium flex-center gap-2 border-gray-400"
                >
                  <Printer height={15} width={15} />
                  Print
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
      </div>
      <div className="relative border mt-10 broder-gray-300 rounded-md  shadow-md bg-white  overflow-hidden">
        {loading ? (
          <div className="min-h-[calc(80vh-160px)] relative bg-backup  animate-pulse  flex-center">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
          </div>
        ) : (
          <TableNilai data={rekapNilai} dataMapel={dataMapel} />
        )}
        {(!kelas || !idKelas) && (
          <div className="absolute inset-0 flex-center bg-white">
            <p className="text-xs font-medium">Pilih Kelas Terlebih dulu..</p>
          </div>
        )}
      </div>
      <div style={{ display: "none" }}>
        <PrintComponentNilai
          ref={componentRef}
          data={rekapNilai}
          dataMapel={dataMapel}
          kelas={dataKelas}
          semester={semester}
          tahunAjaran={tahunAjaran}
        />
      </div>
    </section>
  );
};

const getUniqueStudents = (data) => {
  const uniqueStudentMap = new Map();

  data.forEach((nilai) => {
    const studentId = nilai.siswa._id;
    if (!uniqueStudentMap.has(studentId)) {
      uniqueStudentMap.set(studentId, nilai.siswa);
    }
  });

  return Array.from(uniqueStudentMap.values()).sort((a, b) =>
    a.nama.localeCompare(b.nama)
  );
};

const exportToExcel = async (data, dataMapel, kelas, tahunAjaran, semester) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Rekap Nilai");

  // Step 1: Get Unique Students
  const uniqueStudents = getUniqueStudents(data);

  // Step 2: Calculate Averages for Each Student
  const siswaWithAverage = uniqueStudents.map((siswa) => {
    const nilaiTotal = dataMapel.reduce((acc, mapel) => {
      const nilaiTugas = data.find(
        (nilai) =>
          nilai.siswa._id === siswa._id &&
          nilai.mataPelajaran.kode === mapel &&
          nilai.kategori === "tugas"
      );

      const nilaiUjian = data.find(
        (nilai) =>
          nilai.siswa._id === siswa._id &&
          nilai.mataPelajaran.kode === mapel &&
          nilai.kategori === "ujian"
      );

      const tugasScore = nilaiTugas ? nilaiTugas.nilai : 0;
      const ujianScore = nilaiUjian ? nilaiUjian.nilai : 0;

      return acc + tugasScore + ujianScore;
    }, 0);

    const countScores = dataMapel.length * 2;
    const average = nilaiTotal / countScores;

    return {
      siswa,
      average,
    };
  });

  // Step 3: Rank Students Based on Their Averages
  const siswaWithRanking = [...siswaWithAverage].sort(
    (a, b) => b.average - a.average
  );

  let currentRank = 1;
  siswaWithRanking.forEach((siswa, index, array) => {
    if (index > 0 && siswa.average === array[index - 1].average) {
      siswa.ranking = array[index - 1].ranking;
    } else {
      siswa.ranking = currentRank;
    }
    currentRank++;
  });

  // Step 4: Export to Excel
  // Title Header
  const headerTitle = [
    `NILAI SISWA KELAS TAHUN AJARAN ${tahunAjaran} ${semester.toUpperCase()} - KELAS ${
      kelas.kelas
    } ${kelas.nama.toUpperCase()} `,
  ];
  worksheet.addRow(headerTitle);

  // Merge cells for title header
  worksheet.mergeCells(1, 1, 1, dataMapel.length * 2 + 3); // Adjust the number of columns to match header width
  worksheet.getRow(1).height = 30;

  // Create headers for the table
  const header1 = [
    "Nama Siswa",
    ...dataMapel.flatMap((mapel) => ["Mata Pelajaran", ""]),
    "Rata-Rata",
    "Rangking",
  ];
  const header2 = ["", ...dataMapel.flatMap((mapel) => [mapel, ""]), "", ""];
  const header3 = ["", ...dataMapel.flatMap(() => ["T", "U"]), "", ""];

  // Add headers to the worksheet
  worksheet.addRow(header1);
  worksheet.addRow(header2);
  worksheet.addRow(header3);

  // Merge cells for "Nama Siswa"
  worksheet.mergeCells(2, 1, 4, 1); // Merges "Nama Siswa" cells (RowSpan 3)

  // Merge cells for each "Mata Pelajaran"
  worksheet.mergeCells(2, 2, 2, 2 + dataMapel.length * 2 - 1);

  // Merge cells for "Rata-Rata" and "Rangking"
  const rataRataColumn = dataMapel.length * 2 + 2;
  const rangkingColumn = dataMapel.length * 2 + 3;
  worksheet.mergeCells(2, rataRataColumn, 4, rataRataColumn); // Merge "Rata-Rata"
  worksheet.mergeCells(2, rangkingColumn, 4, rangkingColumn); // Merge "Rangking"

  // Set column widths
  worksheet.getColumn(1).width = 30; // Width for "Nama Siswa"

  for (let i = 2; i <= dataMapel.length * 2 + 3; i++) {
    worksheet.getColumn(i).width = 8; // Width for "T" and "U" columns
  }

  // Styling headers
  const headerStyle = (row, color) => {
    row.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  };

  // Apply styles to headers
  headerStyle(worksheet.getRow(1), "362f7e"); // Color for header 1
  headerStyle(worksheet.getRow(2), "362f7e"); // Color for header 2
  headerStyle(worksheet.getRow(3), "362f7e"); // Color for header 3
  headerStyle(worksheet.getRow(4), "362f7e"); // Color for header 3

  // Add student data and scores
  siswaWithRanking.forEach((siswa) => {
    const nilaiPerMapel = dataMapel.flatMap((mapel) => {
      const nilaiTugas = data.find(
        (nilai) =>
          nilai.siswa._id === siswa.siswa._id &&
          nilai.mataPelajaran.kode === mapel &&
          nilai.kategori === "tugas"
      );
      const nilaiUjian = data.find(
        (nilai) =>
          nilai.siswa._id === siswa.siswa._id &&
          nilai.mataPelajaran.kode === mapel &&
          nilai.kategori === "ujian"
      );
      return [
        nilaiTugas ? nilaiTugas.nilai : "-",
        nilaiUjian ? nilaiUjian.nilai : "-",
      ];
    });

    const rataRata = siswa.average || 0;
    const rangking = siswa.ranking || "-";

    const rowValues = [siswa.siswa.nama, ...nilaiPerMapel, rataRata, rangking];
    const row = worksheet.addRow(rowValues);

    // Add border to each cell in the body
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
  });

  // Export workbook to Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, "rekap_nilai.xlsx");
};

export default RekapNilaiPageadmin;
