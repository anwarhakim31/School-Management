import TableAbsen from "@/components/views/guru/rekap/TableAbsen";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { EllipsisVerticalIcon, FileDownIcon, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintComponent from "@/components/views/guru/rekap/PrintModal";
import DropdownGroup from "@/components/views/admin/RekapData/DropdownGrup";

const RekapAbsensiPage = () => {
  const menuRef = useRef();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [countDay, setCountDay] = useState(0);
  const [rekapAbsen, setRekapAbsen] = useState([]);
  const [kelas, setkelas] = useState(0);
  const [idKelas, setIdKelas] = useState("");
  const [detailKelas, setDetailKelas] = useState({});
  const componentRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          HOST + "/api/absen/" + idKelas + "/rekap-absen",
          {
            withCredentials: true,
            params: { month, year },
          }
        );

        if (res.status === 200) {
          setCountDay(res.data.jumlahHari);
          setRekapAbsen(res.data.rekapAbsensi);
          setDetailKelas(res.data.kelas);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    if (idKelas) {
      getData();
    }
  }, [year, month, idKelas]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

  const handleSelectYeay = (value) => {
    setYear(value);
  };

  const handleSelectMonth = (value) => {
    setMonth(value);
  };

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const onSelectKelas = (value) => {
    setkelas(value);
  };

  const onSelectIdKelas = (value) => {
    setIdKelas(value);
  };

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className=" bg-white p-4 border shadow-md rounded-md">
        <h3 className="text-sm font-semibold mb-4 text-neutral">
          Pilih rekap absensi siswa pada setiap kelas.
        </h3>
        <div className="flex-between">
          <div className="hidden md:flex gap-4">
            <DropdownGroup
              handleSelectYear={handleSelectYeay}
              handleSelectMonth={handleSelectMonth}
              onSelectKelas={onSelectKelas}
              onSelectIdKelas={onSelectIdKelas}
              kelas={kelas}
            />
          </div>
          <div ref={menuRef} className="flex-center md:hidden relative block ">
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

            {isActive && (
              <div className="absolute bg-white z-10 p-4 rounded-md shadow-md border mt-1">
                <DropdownGroup
                  handleSelectYear={handleSelectYeay}
                  handleSelectMonth={handleSelectMonth}
                  onSelectKelas={onSelectKelas}
                  onSelectIdKelas={onSelectIdKelas}
                  kelas={kelas}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end flex-wrap gap-4">
            <button
              disabled={loading || rekapAbsen.length === 0}
              onClick={() =>
                exportToExcel(
                  countDay,
                  rekapAbsen,
                  detailKelas.grade,
                  detailKelas.nama,
                  month,
                  year
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
                  disabled={loading || rekapAbsen.length === 0}
                  className="rounded-md py-2  border disabled:cursor-not-allowed text-xs px-4 shadow-sm hover:border-neutral bg-white font-medium flex-center gap-2 border-gray-400"
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
      <div className="relative border broder-gray-300 rounded-md bg-white shadow-md mt-10 overflow-hidden">
        {loading ? (
          <div className="min-h-[calc(80vh-160px)] bg-backup border border-gray-400 rounded-md  animate-pulse flex-center">
            <div>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableAbsen
            month={month}
            rekapAbsen={rekapAbsen}
            countDay={countDay}
            kelas={kelas}
          />
        )}
        {(!kelas || !idKelas) && (
          <div className="absolute inset-0 flex-center bg-white">
            <p className="text-xs font-medium">Pilih Kelas Terlebih dulu..</p>
          </div>
        )}
      </div>
      <div style={{ display: "none" }}>
        <PrintComponent
          ref={componentRef}
          rekapAbsen={rekapAbsen}
          countDay={countDay}
          kelas={detailKelas}
          month={month}
          year={year}
        />
      </div>
    </section>
  );
};

export default RekapAbsensiPage;

////////////////////////////////////////

const formatStatus = (status) => {
  switch (status) {
    case "hadir":
      return "H";
    case "izin":
      return "I";
    case "sakit":
      return "S";
    case "alpha":
      return "A";
    default:
      return "";
  }
};

const exportToExcel = async (
  countDay,
  rekapAbsen,
  kelas,
  nama,
  month,
  year
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Rekap Absen");

  // Title Header
  const header = [
    `Absensi Kelas ${kelas} ${nama} ${new Date(
      year,
      month + 1,
      0
    ).toLocaleString("id-ID", { month: "long" })} ${year}`,
  ];
  const headerRow = worksheet.addRow(header);

  // Merge cells for title header
  worksheet.mergeCells(headerRow.number, 1, headerRow.number, countDay + 5); // Adjust the number of columns to match header width
  worksheet.getRow(1).height = 30;
  // Membuat header tabel
  const header1 = ["Nama Siswa", ...Array(countDay).fill("Tanggal"), "Total"];
  const header2 = [
    "",
    ...Array.from({ length: countDay }, (_, i) => i + 1),
    "H",
    "I",
    "S",
    "A",
  ];

  // Menambahkan header ke worksheet

  worksheet.addRow(header1);
  worksheet.addRow(header2);

  // Merging header cells sesuai dengan struktur HTML
  worksheet.mergeCells(2, 1, 3, 1); // Menggabungkan "Nama Siswa" (RowSpan 2)
  worksheet.mergeCells(2, 2, 2, countDay + 1); // Menggabungkan "Tanggal" (ColSpan countDay)
  worksheet.mergeCells(2, countDay + 2, 2, countDay + 5); // Menggabungkan "Total" (ColSpan 4)

  // Mengatur lebar kolom agar sesuai dengan tampilan HTML
  worksheet.getColumn(1).width = 20; // Lebar kolom "Nama Siswa" (disesuaikan dengan lebar di HTML)

  // Lebar untuk kolom tanggal
  for (let i = 2; i <= countDay + 1; i++) {
    worksheet.getColumn(i).width = 4; // Lebar kolom tanggal, bisa diatur sesuai kebutuhan
  }

  // Lebar untuk kolom total (Hadir, Izin, Sakit, Alpha)
  worksheet.getColumn(countDay + 2).width = 4; // Lebar kolom H
  worksheet.getColumn(countDay + 3).width = 4; // Lebar kolom I
  worksheet.getColumn(countDay + 4).width = 4; // Lebar kolom S
  worksheet.getColumn(countDay + 5).width = 4; // Lebar kolom A

  // Styling header
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

  // Menggunakan warna dan border pada header
  headerStyle(worksheet.getRow(1), "362f7e"); // Warna abu-abu netral untuk header 1
  headerStyle(worksheet.getRow(2), "362f7e"); // Warna abu-abu netral untuk header 2
  headerStyle(worksheet.getRow(3), "362f7e"); // Warna abu-abu netral untuk header 2

  // Menambahkan data siswa dan status
  rekapAbsen.forEach((siswa) => {
    const rowValues = [
      siswa.nama,
      ...siswa.statusPerHari.map(formatStatus),
      siswa.totalHadir,
      siswa.totalIzin,
      siswa.totalSakit,
      siswa.totalAlpha,
    ];

    const row = worksheet.addRow(rowValues);

    // Menambahkan border pada setiap cell di body
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Styling berdasarkan status untuk setiap cell
    siswa.statusPerHari.forEach((status, idx) => {
      const cell = row.getCell(idx + 2); // Menggeser karena kolom pertama untuk nama siswa

      switch (status) {
        case "hadir":
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "28A745" }, // Hijau untuk hadir
          };
          cell.font = { bold: true, color: { argb: "FFFFFF" } };
          break;
        case "izin":
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "007BFF" }, // Biru untuk izin
          };
          cell.font = { bold: true, color: { argb: "FFFFFF" } };
          break;
        case "sakit":
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC107" }, // Kuning untuk sakit
          };
          cell.font = { bold: true, color: { argb: "FFFFFF" } };
          break;
        case "alpha":
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "DC3545" }, // Merah untuk alpha
          };
          cell.font = { bold: true, color: { argb: "FFFFFF" } };
          break;
        default:
          break;
      }

      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
  });

  // Ekspor workbook ke Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, "rekap_absen.xlsx");
};
