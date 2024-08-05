import CustomDropdown from "@/components/elements/DropDown";
import DropdownFilter from "@/components/elements/DropDownFilter";
import DeleteManyModal from "@/components/fragments/admin/data-siswa/DeleteManyModal";
import DeleteModal from "@/components/fragments/admin/data-siswa/DeleteModal";
import TableSiswa from "@/components/fragments/admin/data-siswa/TableSiswa";
import { selectedDataDeleteMany } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const selectRow = [7, 14, 21, 28];

const DataSiswaPage = () => {
  const dataChecked = useSelector(selectedDataDeleteMany);

  const [search, setSearch] = useState("");
  const [dataSiswa, setDataSiswa] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [isDeleteSiswa, setIsDeleteSiswa] = useState(false);
  const [isDeleteManySiswa, setIsDeletManySiswa] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [filters, setFilters] = useState({
    kelas: "",
    jenisKelamin: "",
    tahunMasuk: "",
  });

  useEffect(() => {
    const getSiswa = async () => {
      try {
        const res = await axios.get(`${HOST}/api/siswa/get-all-siswa`, {
          params: { page, limit, search },
          withCredentials: true,
        });

        setDataSiswa(res.data.data);
        setPagination(res.data.pagination);
      } catch (error) {
        responseError(error);
      }
    };

    getSiswa();
  }, [limit, page, search, isDeleteSiswa, isDeleteManySiswa]);

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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  console.log(filters);

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between flex-wrap gap-6">
        <div className="relative flex w-full  md:max-w-[240px]">
          <input
            type="search"
            placeholder="Cari Siswa"
            value={search}
            onChange={handleSearch}
            className="w-full rounded-full py-2 pr-2 pl-8 text-sm border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <Link
          to={"/admin/tambah-siswa"}
          className="flex-between gap-3  bg-gray-700 hover:bg-neutral transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <Plus
            width={15}
            height={15}
            className="rounded-full bg-white text-neutral"
          />{" "}
          Tambah Siswa
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
            <DropdownFilter handleFilterChange={handleFilterChange} />
          </div>
          <div>
            <button>sds</button>
          </div>
        </div>
        <TableSiswa
          data={dataSiswa}
          page={page}
          limit={pagination.perPage}
          totalSiswa={pagination.total}
          totalPage={pagination.totalPages}
          handlePagination={handlePagination}
          handleToggleDeleteOne={handleToggleDeleteOne}
          setAllCheck={setAllCheck}
          allCheck={allCheck}
        />
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

export default DataSiswaPage;
