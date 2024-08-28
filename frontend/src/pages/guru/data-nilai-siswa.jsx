import CustomDropdown from "@/components/elements/DropDown";
import AddModal from "@/components/fragments/guru/data-nilai/AddModal";
import DeleteManyModal from "@/components/fragments/guru/data-nilai/DeleteManyModal";
import DeleteModal from "@/components/fragments/guru/data-nilai/DeleteModal";
import EditModal from "@/components/fragments/guru/data-nilai/EditModal";
import Nilai from "../../assets/svg/Score.svg";
import TableNilai from "@/components/fragments/guru/data-nilai/Table-Nilai";
import { selectedDataDeleteMany } from "@/store/slices/admin-slice";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import ExelJS from "exceljs";
import { FileDown, Filter, Printer, Search, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FilterSort from "@/components/elements/data-nilai/FilterSort";
import FilterCategory from "@/components/elements/data-nilai/FilterCategory";
import PrintComponent from "@/components/fragments/guru/data-nilai/PrintModal";
import ReactToPrint from "react-to-print";
import { saveAs } from "file-saver";

const selectRow = [7, 14, 21, 28];

const DataNilainilaiPage = () => {
  const componentRef = useRef(null);
  const userData = useSelector(selectedUserData);
  const dataChecked = useSelector(selectedDataDeleteMany);
  const [loading, setLoading] = useState(true);
  const [allCheck, setAllCheck] = useState(false);
  const [isAddNilai, setIsAddNilai] = useState(false);
  const [isEditNilai, setIsEditNilai] = useState(false);
  const [isDeleteNilai, setIsDeleteNilai] = useState(false);
  const [isDeleteManynilai, setIsDeleteManynilai] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("terbaru");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [dataNilai, setDataNilai] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(
          `${HOST}/api/nilai/all-siswa/${userData._id}`,
          {
            params: { search, page, limit, selectedSort, selectedFilter },
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setDataNilai(res.data.nilai);
          setPagination(res.data.pagination);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getKelas();
  }, [
    isAddNilai,
    isDeleteNilai,
    isEditNilai,
    isDeleteManynilai,
    search,
    userData._id,
    page,
    limit,
    selectedSort,
    selectedFilter,
  ]);
  useEffect(() => {
    if (dataNilai.length === 0) {
      setPage(1);
    }
  }, [dataNilai]);

  const handleToggleAdd = () => {
    setIsAddNilai(!isAddNilai);
  };

  const handleEditNilai = () => {
    setIsEditNilai(!isEditNilai);
  };
  const handleToggleDeleteOne = () => {
    setIsDeleteNilai(!isDeleteNilai);
  };
  const handleToggleDeleteMany = () => {
    setIsDeleteManynilai(!isDeleteManynilai);
  };

  const handleSelectBaris = (value) => {
    setLimit(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const handleOptionChange = (value) => {
    setSelectedFilter(value);
  };

  const handlePrintScreen = () => {
    if (componentRef.current) {
      componentRef.current.print();
    }
  };

  return (
    <section className="px-6 py-4 mb-4 ">
      {/* <div className="border bg-white border-t-gray-300 border-l-gray-300 p-4 mb-6 md:max-w-[300px] border-r-4 border-b-4 border-neutral  rounded-md">
        <div className="flex items-center mb-4 justify-between">
          <h3 className="text-sm  font-bold">Detail Kelas</h3>
        </div>

        <div>
          <div className="text-xs mt-2 grid grid-cols-3 gap-1">
            <p className="font-semibold">Kelas </p>
            <p className="truncate col-span-2">
              {loading ? (
                <span className="w-1/2 h-4 bg-backup block animate-pulse rounded-sm "></span>
              ) : (
                <span>
                  : {data.kelas} {data.nama}
                </span>
              )}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs mt-2 grid grid-cols-3 gap-1">
            <span className="font-semibold">Total nilai</span>
            {loading ? (
              <span className="w-1/2 h-4 col-span-2 bg-backup block animate-pulse rounded-sm "></span>
            ) : (
              <span>: {data.jumlahnilai}</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-xs mt-2 grid grid-cols-3 gap-1">
            <span className="font-semibold">Posisi Kelas</span>
            {loading ? (
              <span className="w-1/2 h-4 col-span-2 bg-backup block animate-pulse rounded-sm "></span>
            ) : (
              <span>: {data.posisi ? data.posisi : ""}</span>
            )}
          </p>
        </div>
      </div> */}
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari Nama nilai, Kode dan Nama Mapel"
            value={search}
            disabled={loading}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full disabled:cursor-not-allowed text-xs py-2 pr-2 pl-10  border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <button
          aria-label="tambah nilai"
          disabled={loading}
          onClick={handleToggleAdd}
          className="flex-between gap-3 min-w-fit disabled:cursor-not-allowed bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <img
            src={Nilai}
            alt="student"
            width={15}
            height={15}
            className="bg-white"
          />
          Tambah Nilai
        </button>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus nilai terpilih"
              onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } border block border-gray-300 bg-white  text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button>

            <CustomDropdown
              options={selectRow}
              onSelect={handleSelectBaris}
              selected={limit}
            />
            <FilterSort
              selectedSort={selectedSort}
              handleSortChange={handleSortChange}
            />
            <FilterCategory
              selectedFilter={selectedFilter}
              handleOptionChange={handleOptionChange}
            />
          </div>
          <div className="flex gap-2">
            <button
              title="Excel"
              disabled={loading}
              className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
              onClick={() =>
                exportToExcel(
                  dataNilai,
                  userData.waliKelas.kelas,
                  userData.waliKelas.nama
                )
              }
            >
              <FileDown
                width={20}
                height={20}
                strokeWidth={1}
                className="group-hover:text-white"
              />
            </button>
            <ReactToPrint
              trigger={() => (
                <button
                  title="Print"
                  disabled={loading}
                  className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
                  onClick={handlePrintScreen}
                >
                  <Printer
                    width={20}
                    height={20}
                    strokeWidth={1}
                    className="group-hover:text-white"
                  />
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[450px] flex-center bg-backup animate-pulse overflow-auto ">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableNilai
            data={dataNilai}
            handleToggleDeleteOne={handleToggleDeleteOne}
            handleEditNilai={handleEditNilai}
            allCheck={allCheck}
            setAllCheck={setAllCheck}
            limit={limit}
            page={page}
            setPage={setPage}
            pagination={pagination}
          />
        )}
      </div>
      {isDeleteNilai && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          title={"Apakah And yakin ingin menghapus nilai?"}
        />
      )}
      {isEditNilai && <EditModal onClose={handleEditNilai} />}
      {isAddNilai && <AddModal onClose={handleToggleAdd} />}
      {isDeleteManynilai && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )}
      <div style={{ display: "none" }}>
        <PrintComponent
          ref={componentRef}
          dataNilai={dataNilai}
          data={userData.waliKelas}
        />
      </div>
    </section>
  );
};

const exportToExcel = async (data, kelas, nama) => {
  const workbook = new ExelJS.Workbook();
  const worksheet = workbook.addWorksheet(
    `Data Nilai nilai Kelas ${kelas} ${nama}`
  );

  worksheet.mergeCells("A1:F1");
  worksheet.getCell("A1").value = `Data Nilai Siswa Kelas ${kelas} ${nama}`;
  worksheet.getCell("A1").font = { size: 16, bold: true };
  worksheet.getCell("A1").border = {
    top: { style: "thin", color: "FFFFFFFF" },
    left: { style: "thin", color: "FFFFFFFF" },
    bottom: { style: "thin", color: "FFFFFFFF" },
    right: { style: "thin", color: "FFFFFFFF" },
  };
  worksheet.getCell("A1").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  worksheet.getRow(2).values = [
    "Mata Pelajaran",
    "Nama Siswa",
    "Kategori",
    "Nilai",
    "Tahun Ajaran",
    "Semsester",
  ]; // Mengatur nilai header kolom
  worksheet.getRow(2).eachCell((cell, colNumber) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "362f7e" }, // Warna Biru
    };
    cell.font = { color: { argb: "FFFFFFFF" }, bold: true }; // Teks putih
    cell.alignment = { vertical: "middle", horizontal: "center" }; // Rata tengah
    cell.border = {
      top: { style: "thin", color: "FFFFFFFF" },
      left: { style: "thin", color: "FFFFFFFF" },
      bottom: { style: "thin", color: "FFFFFFFF" },
      right: { style: "thin", color: "FFFFFFFF" },
    };
    worksheet.getColumn(colNumber).alignment =
      colNumber === 1
        ? { horizontal: "left" }
        : colNumber === 2
        ? { horizontal: "left" }
        : { horizontal: "center" };

    worksheet.getColumn(colNumber).width =
      colNumber === 1
        ? 20
        : colNumber === 2
        ? 30
        : colNumber === 3
        ? 10
        : colNumber === 4
        ? 5
        : 15;
  });

  // Styling header

  // Menambahkan data nilai dan status
  data.forEach((nilai) => {
    const rowValues = [
      `${nilai.mataPelajaran.kode} ${nilai.mataPelajaran.nama}`,
      nilai.siswa.nama,
      nilai.kategori,
      nilai.nilai,
      nilai.tahunAjaran,
      nilai.semester,
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

    // Menambahkan border pada setiap cell di body

    // Styling berdasarkan status untuk setiap cell
  });

  // Ekspor workbook ke Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, `Data Nilai Siswa Kelas ${kelas} ${nama}.xlsx`);
};

export default DataNilainilaiPage;
