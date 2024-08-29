import MonthDropdown from "@/components/elements/MonthDropdown";
import YearDropdown from "@/components/elements/YearDropDown";
import TableAbsen from "@/components/fragments/guru/rekap/TableAbsen";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { FileDownIcon, Printer } from "lucide-react";
import { useEffect, useRef, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintComponent from "@/components/fragments/guru/rekap/PrintModal";

const RekapNilaiFragment = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const userData = useSelector(selectedUserData);
  const [countDay, setCountDay] = useState(0);
  const [rekapAbsen, setRekapAbsen] = useState([]);
  const [kelas, setkelas] = useState({});

  const componentRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/absen/" + userData.waliKelas._id + "/rekap-absen",
          { withCredentials: true, params: { month, year } }
        );

        if (res.status === 200) {
          setCountDay(res.data.jumlahHari);
          setRekapAbsen(res.data.rekapAbsensi);
          setkelas(res.data.kelas);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getData();
  }, [year, month]);

  const handleSelectYeay = (value) => {
    setYear(value);
  };

  const handleSelectMonth = (value) => {
    setMonth(value);
  };

  return (
    <Fragment>
      <div className="flex-between">
        <div className="flex justify-start flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-gray-700">Tahun</p>
            <YearDropdown onSelectYear={handleSelectYeay} />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-gray-700">Bulan</p>
            <MonthDropdown onSelectMonth={handleSelectMonth} />
          </div>
        </div>
        <div className="flex items-center justify-end flex-wrap gap-4">
          <button
            disabled={loading || rekapAbsen.length === 0}
            onClick={() =>
              exportToExcel(
                countDay,
                rekapAbsen,
                kelas.grade,
                kelas.nama,
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
      <div className="relative border broder-gray-300 rounded-md bg-white mt-6 overflow-hidden">
        {loading ? (
          <div className="min-h-[400px] bg-backup  animate-pulse  flex-center">
            <div>
              <div className="border-4 border-gray-200 border-t-neutral rounded-full w-6 h-6 animate-spin"></div>
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
      </div>
      <div style={{ display: "none" }}>
        <PrintComponent
          ref={componentRef}
          rekapAbsen={rekapAbsen}
          countDay={countDay}
          kelas={kelas}
          month={month}
          year={year}
        />
      </div>
    </Fragment>
  );
};

export default RekapNilaiFragment;

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
    ).toLocaleString("default", { month: "long" })} ${year}`,
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
