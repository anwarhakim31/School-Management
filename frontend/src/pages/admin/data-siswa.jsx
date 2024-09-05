import CustomDropdown from "@/components/elements/DropDown";
import Student from "../../assets/svg/Teacher.svg";
import DropdownFilter from "@/components/elements/DropDownFilter";
import HeaderBox from "@/components/elements/data-siswa/HeaderBox";
import TableSiswa from "@/components/fragments/admin/data-siswa/TableSiswa";
import {
  selectedDataDelete,
  selectedDataDeleteMany,
} from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import { formatDate } from "@/util/formatDate";
import responseError from "@/util/services";
import ExcelJs from "exceljs";
import axios from "axios";
import { FileDown, Plus, Search, Trash2, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import DeleteModal from "@/components/fragments/ModalDelete";
import DeleteManyModal from "@/components/fragments/ModalDeleteMany";
import ModalUploadExcel from "@/components/fragments/admin/data-siswa/ModalUploadExcel";

const selectRow = [7, 14, 21, 28];

const DataSiswaPage = () => {
  const dataChecked = useSelector(selectedDataDeleteMany);
  const dataDelete = useSelector(selectedDataDelete);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dataSiswa, setDataSiswa] = useState([]);
  const [pagination, setPagination] = useState({});
  const [dataDetail, setDataDetail] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [isDeleteSiswa, setIsDeleteSiswa] = useState(false);
  const [isDeleteManySiswa, setIsDeletManySiswa] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [filters, setFilters] = useState({
    kelas: "",
    kelasNama: "",
    jenisKelamin: "",
    tahunMasuk: "",
  });

  useEffect(() => {
    const getSiswa = async () => {
      try {
        const res = await axios.get(`${HOST}/api/siswa/get-all-siswa`, {
          params: {
            page,
            limit,
            search,
            tahunMasuk: filters.tahunMasuk,
            jenisKelamin: filters.jenisKelamin,
            kelas: filters.jenisKelamin,
            kelasNama: filters.kelasNama,
          },
          withCredentials: true,
        });

        if (res.status == 200) {
          setDataSiswa(res.data.data);
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
    const getDetail = async () => {
      try {
        const res = await axios.get(`${HOST}/api/siswa/get-detail-siswa`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataDetail(res.data.data);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getSiswa();
    getDetail();
  }, [limit, page, search, isDeleteSiswa, isDeleteManySiswa, filters]);

  useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  const handleToggleDeleteOne = () => {
    setIsDeleteSiswa(!isDeleteSiswa);
  };
  const handleToggleDeleteMany = () => {
    setIsDeletManySiswa(!isDeleteManySiswa);
  };

  const handleToggleUpload = () => {
    setIsUpload(!isUpload);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  const handleSelectBaris = (option) => {
    setLimit(option);
  };

  const handleFilterChange = (filterName, filterValue) => {
    if (filterName === "kelas" && filterValue === "") {
      setFilters((prev) => ({ ...prev, kelasNama: "" }));
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  useEffect(() => {
    if (dataSiswa.length === 0) {
      setPage(1);
    }
  }, [dataSiswa]);

  return (
    <section className="px-6 py-4 mb-4 ">
      <HeaderBox dataDetail={dataDetail} loading={loading} />
      <div className="w-full flex-between flex-wrap gap-6">
        <div className="relative flex w-full   sm:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari nama dan nis dari siswa."
            value={search}
            id="search"
            disabled={loading}
            onChange={handleSearch}
            className="w-full rounded-full disabled:cursor-not-allowed py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <div className="ml-auto flex-center gap-2 ">
          <button
            onClick={handleToggleUpload}
            className="w-9 h-9 bg-neutral rounded-md flex-center "
            title="upload siswa with excel"
          >
            <Upload width={18} height={18} className="text-white" />
          </button>
          <Link
            to={"/admin/tambah-siswa"}
            className="flex-between gap-3 min-w-fit bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
          >
            <img src={Student} alt="student" width={15} height={15} />
            Tambah Siswa
          </Link>
        </div>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus siswa terpilih"
              disabled={loading}
              onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0 ? "opacity-100" : "opacity-0"
              } border block border-gray-300 bg-white text-gray-500 group rounded-md disabled:cursor-not-allowed  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button>

            <CustomDropdown
              options={selectRow}
              onSelect={handleSelectBaris}
              selected={limit}
            />
            <DropdownFilter
              handleFilterChange={handleFilterChange}
              setFilters={setFilters}
            />
          </div>
          <div>
            <button
              title="Excel"
              disabled={loading}
              className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
              onClick={() => exportToExcel(dataSiswa)}
            >
              <FileDown
                width={20}
                height={20}
                strokeWidth={1}
                className="group-hover:text-white"
              />
            </button>

            <button></button>
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[453px] flex-center bg-backup animate-pulse overflow-auto ">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableSiswa
            data={dataSiswa}
            page={page}
            limit={limit}
            totalSiswa={pagination.total}
            totalPage={pagination.totalPages}
            handlePagination={handlePagination}
            handleToggleDeleteOne={handleToggleDeleteOne}
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            loading={loading}
          />
        )}
      </div>
      {isDeleteSiswa && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          url={"/api/siswa/delete-one-siswa/" + dataDelete._id}
          title={"Apakah anda yakin ingin menghapus siswa?"}
        />
      )}
      {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
          url={"/api/siswa/delete-many-siswa"}
          title={"Apakah anda yakin ingin menghapus siswa terpilih?"}
        />
      )}
      {isUpload && <ModalUploadExcel onClose={handleToggleUpload} />}
    </section>
  );
};

const exportToExcel = async (data) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet(`Data Siswa`);

  worksheet.mergeCells("A1:J1"); // Menggabungkan sel A1 hingga D1
  worksheet.getCell("A1").value = `Data Siswa`; // Menambahkan judul
  worksheet.getCell("A1").font = { size: 16, bold: true };
  worksheet.getCell("A1").border = {
    top: { style: "thin", color: "FFFFFFFF" },
    left: { style: "thin", color: "FFFFFFFF" },
    bottom: { style: "thin", color: "FFFFFFFF" },
    right: { style: "thin", color: "FFFFFFFF" },
  }; // Mengatur gaya font
  worksheet.getCell("A1").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  worksheet.getRow(2).values = [
    "NIS",
    "Nama Siswa",
    "Jenis Kelamin",
    "Tempat Lahir",
    "Tanggal Lahir",
    "Agama",
    "Tahun Masuk",
    "Alamat",
    "Telepon",
    "kelas",
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
    worksheet.getColumn(colNumber).width =
      colNumber === 1
        ? 20
        : colNumber === 2
        ? 30
        : colNumber === 6
        ? 25
        : colNumber === 8
        ? 30
        : colNumber === 10
        ? 25
        : colNumber === 3
        ? 15
        : 15;
  });

  // Styling header

  // Menambahkan data siswa dan status
  data.forEach((siswa) => {
    const kelas = `${siswa?.kelas?.kelas || ""} ${siswa?.kelas?.nama || ""}`;

    const rowValues = [
      siswa.nis,
      siswa.nama,
      siswa.jenisKelamin,
      siswa.tempatLahir,
      formatDate(siswa.tanggalLahir),
      siswa.agama,
      siswa.tahunMasuk,
      siswa.alamat,
      siswa.phone,
      kelas ? kelas : "kosong",
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
  saveAs(blob, `Data Siswa.xlsx`);
};

export default DataSiswaPage;
