import guru from "../../assets/svg/Student.svg";
import ExcelJs from "exceljs";
import CustomDropdown from "@/components/elements/DropDown";
import DropdownFilter from "@/components/elements/DropDownFilter";
import HeaderBox from "@/components/elements/data-guru/HeaderBox";
import {
  selectedDataDelete,
  selectedDataDeleteMany,
} from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import { formatDate } from "@/util/formatDate";
import responseError from "@/util/services";
import axios from "axios";
import { FileDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TableGuru from "@/components/views/admin/data-guru/TableGuru";
import DeleteModal from "@/components/fragments/ModalDelete";
import DeleteManyModal from "@/components/fragments/ModalDeleteMany";
import InputSearch from "@/components/elements/InputSearch";

const selectRow = [7, 14, 21, 28];

const DataGuruPage = () => {
  const [searchParams] = useSearchParams();
  const dataChecked = useSelector(selectedDataDeleteMany);
  const dataDelete = useSelector(selectedDataDelete);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataGuru, setDataGuru] = useState([]);

  const [dataDetail, setDataDetail] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
    totalPages: 0,
    totalGuru: 0,
  });
  const [isDeleteGuru, setIsDeleteGuru] = useState(false);
  const [isDeleteManyGuru, setIsDeletManyGuru] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [filters, setFilters] = useState({
    kelas: "",
    kelasNama: "",
    jenisKelamin: "",
    bidangStudi: "",
  });

  const page = parseInt(searchParams.get("page")) || pagination.page;
  const limit = parseInt(searchParams.get("limit")) || pagination.limit;
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const getGuru = async () => {
      try {
        const res = await axios.get(`${HOST}/api/guru/get-all-guru`, {
          params: {
            page,
            limit,
            search,
            jenisKelamin: filters.jenisKelamin,
            kelasNama: filters.kelasNama,
            bidangStudi: filters.bidangStudi,
          },
          withCredentials: true,
        });
        if (res.status == 200) {
          setDataGuru(res.data.data);
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
        const res = await axios.get(`${HOST}/api/guru/get-detail-guru`, {
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
    getGuru();
    getDetail();
  }, [limit, page, search, isDeleteGuru, isDeleteManyGuru, filters]);

  const handleToggleDeleteOne = () => {
    setIsDeleteGuru(!isDeleteGuru);
  };
  const handleToggleDeleteMany = () => {
    setIsDeletManyGuru(!isDeleteManyGuru);
  };

  const handleSelectBaris = (option) => {
    if (option === 7) {
      searchParams.delete("limit");
      setPagination((prev) => ({ ...prev, limit: 7 }));
      navigate("/admin/data-guru?" + searchParams.toString(), {
        replace: true,
      });
      if (searchParams.size === 1 && searchParams.get("page") === "1") {
        searchParams.delete("page");
        navigate("/admin/data-guru?" + searchParams.toString(), {
          replace: true,
        });
      }
    } else {
      searchParams.set("page", "1");
      searchParams.set("limit", option.toString());

      navigate(`/admin/data-guru?${searchParams.toString()}`);
    }
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

  return (
    <section className="px-6 py-4 mb-4 ">
      <HeaderBox dataDetail={dataDetail} loading={loading} />
      <div className="w-full flex-between gap-6">
        <InputSearch loading={loading} />
        <Link
          to={"/admin/tambah-guru"}
          disabled={loading}
          className="flex-between gap-3 min-w-fit bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <img src={guru} alt="guru" width={15} height={15} />
          Tambah Guru
        </Link>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus Guru terpilih"
              disabled={loading}
              onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0 ? "opacity-100" : "opacity-0"
              } border block border-gray-300 bg-white text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
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
              onClick={() => exportToExcel(dataGuru)}
            >
              <FileDown
                width={20}
                height={20}
                strokeWidth={1}
                className="group-hover:text-white"
              />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[453px] flex-center bg-backup animate-pulse overflow-auto ">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableGuru
            data={dataGuru}
            page={page}
            limit={limit}
            totalGuru={pagination.totalGuru}
            totalPage={pagination.totalPage}
            handleToggleDeleteOne={handleToggleDeleteOne}
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            loading={loading}
            setPagination={setPagination}
          />
        )}
      </div>
      {isDeleteGuru && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          url={"/api/guru/delete-one-guru/" + dataDelete._id}
          title={"Apakah anda yakin ingin menghapus guru?"}
        />
      )}
      {isDeleteManyGuru && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
          url={"/api/guru/delete-many-guru"}
          title={"Apakah anda yakin ingin mengapus guru terpilih?"}
        />
      )}
    </section>
  );
};

const exportToExcel = async (data) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet(`Data Guru`);

  worksheet.mergeCells("A1:J1"); // Menggabungkan sel A1 hingga D1
  worksheet.getCell("A1").value = `Data Guru`; // Menambahkan judul
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
    "NIP",
    "Nama Guru",
    "Jenis Kelamin",
    "Tempat Lahir",
    "Tanggal Lahir",
    "Bidang Studi",
    "status",
    "Alamat",
    "Telepon",
    "Wali Kelas",
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
        : colNumber === 3
        ? 15
        : 15;
  });

  data.forEach((Guru) => {
    const waliKelas = Guru.waliKelas
      ? `${Guru.waliKelas.kelas || ""} ${Guru.waliKelas.nama || ""}`
      : "";

    const rowValues = [
      Guru.nip,
      Guru.nama,
      Guru.jenisKelamin,
      Guru.tempatLahir,
      formatDate(Guru.tanggalLahir),
      Guru.bidangStudi.nama,
      Guru.status,
      Guru.alamat,
      Guru.phone,
      waliKelas,
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
  saveAs(blob, `Data Guru.xlsx`);
};

export default DataGuruPage;
