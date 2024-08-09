import guru from "../../assets/svg/Student.svg";
import ExportExcel from "@/components/elements/DataToExel";
import CustomDropdown from "@/components/elements/DropDown";
import DropdownFilter from "@/components/elements/DropDownFilter";
import HeaderBox from "@/components/elements/data-guru/HeaderBox";
import { selectedDataDeleteMany } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import { formatDate } from "@/util/formatDate";
import responseError from "@/util/services";
import axios from "axios";
import { FileDown, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableGuru from "@/components/fragments/admin/data-guru.jsx/TableGuru";
import DeleteModal from "@/components/fragments/admin/data-guru.jsx/DeleteModal";
import DeleteManyModal from "@/components/fragments/admin/data-guru.jsx/DeleteManyModal";

const selectRow = [7, 14, 21, 28];

const DataGuruPage = () => {
  const dataChecked = useSelector(selectedDataDeleteMany);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dataGuru, setDataGuru] = useState([]);
  const [pagination, setPagination] = useState({});
  const [dataDetail, setDataDetail] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [isDeleteSiswa, setIsDeleteSiswa] = useState(false);
  const [isDeleteManySiswa, setIsDeletManySiswa] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [filters, setFilters] = useState({
    kelas: "",
    kelasNama: "",
    jenisKelamin: "",
    tahunMasuk: "",
  });
  const columns = useMemo(
    () => [
      {
        Header: "NIP",
        accessor: "nip",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Jenis Kelamin",
        accessor: "jenisKelamin",
      },
      {
        Header: "Tempat Lahir",
        accessor: "tempatLahir",
      },

      {
        Header: "Tanggal Lahir",
        accessor: (row) => `${formatDate(row.tanggalLahir)}`,
      },
      {
        Header: "Bidang Studi",
        accessor: "bidangStudi",
      },
      {
        Header: "Alamat",
        accessor: "alamat",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Wali Kelas",
        accessor: (row) =>
          `${row.waliKelas ? row.waliKelas.kelas + row.waliKelas.nama : ""}`,
      },
    ],
    []
  );

  useEffect(() => {
    const getSiswa = async () => {
      try {
        const res = await axios.get(`${HOST}/api/guru/get-all-guru`, {
          params: {
            page,
            limit,
            search,
            jenisKelamin: filters.jenisKelamin,
            kelasNama: filters.kelasNama,
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

          console.log(res.data.data);
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

  return (
    <section className="px-6 py-4 mb-4 ">
      <HeaderBox dataDetail={dataDetail} loading={loading} />
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari..."
            value={search}
            disabled={loading}
            onChange={handleSearch}
            className="w-full rounded-full disabled:cursor-not-allowed py-1.5 pr-2 pl-10 text-sm border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <Link
          to={"/admin/tambah-guru"}
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
              title="Hapus siswa terpilih"
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
            <ExportExcel
              columns={columns}
              data={dataGuru}
              namaFile={"Data-Siswa"}
              loading={loading}
            />
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[430px] flex-center bg-gray-200 animate-pulse overflow-auto ">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableGuru
            data={dataGuru}
            page={page}
            limit={pagination.page}
            totalGuru={pagination.totalGuru}
            totalPage={pagination.totalPage}
            handlePagination={handlePagination}
            handleToggleDeleteOne={handleToggleDeleteOne}
            setAllCheck={setAllCheck}
            allCheck={allCheck}
            loading={loading}
          />
        )}
      </div>
      {isDeleteSiswa && <DeleteModal onClose={handleToggleDeleteOne} />}
      {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )}
    </section>
  );
};

export default DataGuruPage;
