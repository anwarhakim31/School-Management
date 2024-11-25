import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { EllipsisVerticalIcon, FileDownIcon, Printer } from "lucide-react";
import { useEffect, useRef, useState, Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ReactToPrint from "react-to-print";

import DropdownSemester from "@/components/elements/DropdownSemester";

import KelasDropdown from "@/components/elements/data-studi/kelasDropdown";

import TableNilaiPertemuan from "./TableNilaiPertemuan";
import PrintComponent from "./PrintModaStudi";

const RekapNilaiStudiFragment = () => {
  const componentRef = useRef(null);
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false);
  const [kelas, setKelas] = useState({ kelas: "", nama: "", id: "" });
  const [semester, setSemester] = useState("");

  const [rekapNilai, setRekapNilai] = useState([]);
  const [totalPertemuan, setTotalPertemuan] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          HOST + `/api/nilaiPertemuan/get-rekap/${kelas.id}/${semester}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setRekapNilai(res.data.rekapNilai);
          setTotalPertemuan(res.data.totalPertemuan);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    if (kelas.id && semester) {
      getData();
    }
  }, [kelas, semester]);

  const handleSelectKelas = (value) => {
    setKelas(value);
  };

  const handleSelectSemester = (value) => {
    setSemester(value);
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
    <Fragment>
      <div className="  bg-white p-4 rounded-tr-md rounded-tl-md border border-b-0">
        <div className="flex-between flex-row-reverse md:flex-row">
          <div className=" hidden md:flex justify-start flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold text-gray-700">Kelas</p>
              <KelasDropdown onChange={handleSelectKelas} />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs font-semibold text-gray-700">Semester</p>
              <DropdownSemester onSelectedSemester={handleSelectSemester} />
            </div>
          </div>
          <div className="flex items-center justify-end flex-wrap gap-4">
            <button
              disabled={loading || rekapNilai.length === 0}
              onClick={() =>
                exportToExcel(rekapNilai, totalPertemuan, kelas, semester)
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
          <div className="relative block md:hidden w-fit" ref={menuRef}>
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
              <div className="absolute left-0  w-72  mt-1 z-10 bg-white border shadow-md rounded-md p-4">
                <div className="grid grid-cols-3 items-center">
                  <p className="text-xs font-semibold text-gray-700">Kelas</p>
                  <KelasDropdown onChange={handleSelectKelas} />
                </div>
                <div className="grid grid-cols-3 mt-4 items-center">
                  <p className="text-sm font-semibold text-gray-700">
                    Semester
                  </p>
                  <DropdownSemester onSelectedSemester={handleSelectSemester} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative border broder-gray-300 rounded-br-md rounded-bl-md bg-white  overflow-hidden">
        {loading ? (
          <div className="min-h-[calc(80vh-160px)]  bg-backup  flex-center">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
          </div>
        ) : (
          <TableNilaiPertemuan
            data={rekapNilai}
            totalPertemuan={totalPertemuan}
            kelas={kelas}
          />
        )}
      </div>
      <div style={{ display: "none" }}>
        <PrintComponent
          ref={componentRef}
          data={rekapNilai}
          totalPertemuan={totalPertemuan}
          kelas={kelas}
          semester={semester}
        />
      </div>
    </Fragment>
  );
};

const exportToExcel = async (rekapNilai, totalPertemuan, kelas, semester) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Rekap Absen");

  // Title Header
  const header = [
    `NILAI PERTEMUAN KELAS ${
      kelas.grade
    } ${kelas.nama.toUpperCase()}  ${semester.toUpperCase()}`,
  ];
  const headerRow = worksheet.addRow(header);

  // Merge cells for title header
  worksheet.mergeCells(
    headerRow.number,
    1,
    headerRow.number,
    totalPertemuan + 2
  );
  worksheet.getRow(1).height = 30;

  // Membuat header tabel
  const header1 = [
    "Nama Siswa",
    ...Array(totalPertemuan).fill("Pertemuan"),
    "",
  ];
  const header2 = [
    "",
    ...Array.from({ length: totalPertemuan }, (_, i) => i + 1),
    "U",
  ];

  // Menambahkan header ke worksheet
  worksheet.addRow(header1);
  worksheet.addRow(header2);

  // Merging header cells sesuai dengan struktur HTML
  worksheet.mergeCells(2, 1, 3, 1); // Menggabungkan "Nama Siswa" (RowSpan 2)
  worksheet.mergeCells(2, 2, 2, totalPertemuan + 1); // Menggabungkan header "Pertemuan" (ColSpan totalPertemuan)
  worksheet.mergeCells(2, totalPertemuan + 2, 2, totalPertemuan + 2); // Menggabungkan "Ujian" (ColSpan 1)

  // Mengatur lebar kolom
  worksheet.getColumn(1).width = 20; // Lebar kolom "Nama Siswa"
  for (let i = 2; i <= totalPertemuan + 1; i++) {
    worksheet.getColumn(i).width = 4; // Lebar kolom pertemuan
  }
  worksheet.getColumn(totalPertemuan + 2).width = 4; // Lebar kolom "Ujian"

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
  headerStyle(worksheet.getRow(1), "362f7e"); // Warna ungu untuk header 1
  headerStyle(worksheet.getRow(2), "362f7e"); // Warna ungu untuk header 2
  headerStyle(worksheet.getRow(3), "362f7e"); // Warna ungu untuk header 3

  // Menambahkan data siswa dan nilai (di sini data ditambahkan dengan contoh)
  rekapNilai.forEach((siswa) => {
    const rowValues = [siswa.nama, ...siswa.dataNilai, siswa.ujian];
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
  });

  // Ekspor workbook ke Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, "rekap_absen.xlsx");
};

export default RekapNilaiStudiFragment;
