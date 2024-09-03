import CustomDropdown from "@/components/elements/DropDown";
import Student from "../../assets/svg/Teacher.svg";
import TableSiswa from "@/components/fragments/guru/data-murid/TableSiswa";
import {
  selectedDataDelete,
  selectedDataDeleteMany,
  setDataDeleteMany,
  setDataEdit,
} from "@/store/slices/admin-slice";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import {
  EllipsisVerticalIcon,
  FileDown,
  Filter,
  Printer,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "@/components/fragments/guru/data-murid/AddModal";
import FilterSiswa from "@/components/elements/wali-kelas/FilterSiswa";
import EditModal from "@/components/fragments/guru/data-murid/EditModal";

import { useNavigate } from "react-router-dom";
import ExelJs from "exceljs";
import { saveAs } from "file-saver";
import ReactToPrint from "react-to-print";
import PrintComponent from "@/components/fragments/guru/data-murid/PrintModal";
import { formatDate } from "@/util/formatDate";
import DeleteModal from "@/components/fragments/ModalDelete";
import DeleteManyModal from "@/components/fragments/ModalDeleteMany";

const selectRow = [7, 14, 21, 28];

const DataSiswaPageguru = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonFilterRef = useRef();
  const menuRef = useRef(null);
  const FilterRef = useRef();
  const componentRef = useRef();
  const dataDelete = useSelector(selectedDataDelete);
  const [loading, setLoading] = useState(true);
  const [isDeleteSiswa, setIsDeleteSiswa] = useState(false);
  const [isAddSiswa, setIsAddSiswa] = useState(false);
  const [isEditSiswa, setIsEditSiswa] = useState(false);
  const [isDeleteManySiswa, setIsDeleteManySiswa] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isMenuMobile, setIsMenuMobile] = useState(false);

  const dataChecked = useSelector(selectedDataDeleteMany);
  const userData = useSelector(selectedUserData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("terbaru");
  const [data, setData] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/kelas/get-wali-kelas/" + userData._id,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setData(res.data.kelas);
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
  }, [isDeleteSiswa, isAddSiswa, isDeleteManySiswa, isEditSiswa]);

  useEffect(() => {
    if (!userData.waliKelas) {
      navigate("/guru/dashboard");
    }
  }, []);

  useEffect(() => {
    let datas = data?.siswa?.map((siswa) => siswa);

    if (search) {
      const splitValue = search.trim().toLocaleLowerCase().split(" ");
      datas = datas.filter((data) => {
        return splitValue.every(
          (key) => data.nama.includes(key) || data.nis.includes(key)
        );
      });
    }

    if (filter === "terlama") {
      datas.reverse();
    }
    if (filter === "a-z") {
      datas = datas.sort((a, b) => b.nama.localeCompare(a.nama));
    }

    if (filter === "z-a") {
      datas = datas.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    setDataSiswa(datas);
  }, [data, search, filter]);

  useEffect(() => {
    setPage(1);
  }, [search, dataSiswa?.length]);

  const handleToggleDeleteOne = () => {
    setIsDeleteSiswa(!isDeleteSiswa);
  };

  const handleToggleAdd = () => {
    setIsAddSiswa(!isAddSiswa);
  };

  const handleToggleDeleteMany = () => {
    setIsDeleteManySiswa(!isDeleteManySiswa);
  };

  const handleSelectBaris = (value) => {
    setLimit(value);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleFilter = () => {
    setIsFilter(!isFilter);
  };

  const handleOptionChange = (e) => {
    setFilter(e.target.value);
    setIsFilter(false);
  };

  const handleToggleEdit = () => {
    setIsEditSiswa(!isEditSiswa);
  };

  const handleEditSiswa = (data) => {
    dispatch(setDataEdit(data));
    handleToggleEdit();
  };

  const handleToggleMenu = () => {
    setIsMenuMobile(!isMenuMobile);
  };

  console.log(dataChecked.length);

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari Nama Dan NIS Siswa"
            value={search}
            disabled={loading}
            onChange={handleSearch}
            className="w-full rounded-full disabled:cursor-not-allowed py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <button
          aria-label="tambah siswa"
          disabled={loading}
          onClick={handleToggleAdd}
          className="flex-between gap-3 min-w-fit disabled:cursor-not-allowed bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <img src={Student} alt="student" width={15} height={15} />
          Tambah Siswa
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus siswa terpilih"
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
            <div className="flex gap-2 relative  mr-auto  ">
              <button
                onClick={handleToggleFilter}
                ref={buttonFilterRef}
                disabled={dataSiswa?.length === 0}
                className="border border-gray-400 group disabled:cursor-not-allowed bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
              >
                <Filter
                  strokeWidth={2}
                  width={15}
                  height={15}
                  className="text-gray-600 group-hover:text-white"
                />
              </button>
              {filter !== "terbaru" && (
                <button
                  onClick={() => setFilter("terbaru")}
                  className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
                >
                  Clear
                </button>
              )}
              {isFilter && (
                <FilterSiswa
                  ref={FilterRef}
                  filter={filter}
                  isFilter={isFilter}
                  handleOptionChange={handleOptionChange}
                  handleToggleFilter={handleToggleFilter}
                />
              )}
            </div>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              title="Excel"
              disabled={loading}
              className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
              onClick={() => exportToExcel(dataSiswa, data.kelas, data.nama)}
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
                  className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
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
          <div ref={menuRef} className="relative block sm:hidden">
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

            {isMenuMobile && (
              <div
                role="menu"
                className="absolute right-0 mt-1 flex-between p-2  border shadow-sm  w-fit bg-white rounded-md "
              >
                <div className="flex flex-col gap-3">
                  <button
                    title="Excel"
                    disabled={loading}
                    className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1 rounded-md"
                    onClick={() =>
                      exportToExcel(
                        dataSiswa,
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
                        className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1 rounded-md"
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
            )}
          </div>
        </div>

        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[453px] flex-center bg-backup relative overflow-auto ">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableSiswa
            data={dataSiswa}
            handleToggleDeleteOne={handleToggleDeleteOne}
            handleEditSiswa={handleEditSiswa}
            allCheck={allCheck}
            setAllCheck={setAllCheck}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
      {isDeleteSiswa && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          title={"Apakah anda yakin ingin menghapus siswa?"}
          url={"/api/siswa/delete-one-siswa/" + dataDelete._id}
        />
      )}
      {isEditSiswa && <EditModal onClose={handleToggleEdit} kelas={data} />}
      {isAddSiswa && <AddModal onClose={handleToggleAdd} kelas={data} />}
      {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
          title={"Apakah anda yakin ingin menghapus siswa terpilih?"}
          url={"/api/siswa/delete-many-siswa"}
        />
      )}
      <div style={{ display: "none" }}>
        <PrintComponent ref={componentRef} dataSiswa={dataSiswa} data={data} />
      </div>
    </section>
  );
};

const exportToExcel = async (data, kelas, nama) => {
  const workbook = new ExelJs.Workbook();
  const worksheet = workbook.addWorksheet(`Data Siswa Kelas ${kelas} ${nama}`);

  worksheet.mergeCells("A1:I1"); // Menggabungkan sel A1 hingga D1
  worksheet.getCell("A1").value = `Data Siswa Kelas ${kelas} ${nama}`; // Menambahkan judul
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

  // Styling header

  // Menambahkan data siswa dan status
  data.forEach((siswa) => {
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
  saveAs(blob, `Data Siswa Kelas ${kelas} ${nama}.xlsx`);
};

export default DataSiswaPageguru;
