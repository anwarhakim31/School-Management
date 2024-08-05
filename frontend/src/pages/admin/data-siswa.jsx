import TableSiswa from "@/components/fragments/admin/data-siswa/TableSiswa";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ArrowDown01, ArrowDownNarrowWide, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DataSiswaPage = () => {
  const [search, setSearch] = useState("");
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setSiswaPerPage] = useState(7);

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
  }, [limit, page, search]);

  console.log(pagination);

  // useEffect(() => {
  //   const splitValue = search.trim().toLowerCase().split(" ");

  //   const dataFilter = dataSiswa.filter((siswa) => {
  //     const nisString = String(siswa.nis);

  //     return splitValue.every(
  //       (word) =>
  //         siswa.nama.toLowerCase().includes(word) || nisString.includes(word)
  //     );
  //   });

  //   if (dataFilter.length === 0) {
  //     setDataSearch(dataSiswa);
  //   } else {
  //     setDataSearch(dataFilter);
  //   }
  // }, [search, dataSiswa]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handlePagination = (page) => {
    console.log(page, "now");
    setPage(page);
  };

  console.log(pagination.perPage);

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between flex-wrap gap-6">
        <div className="relative flex w-full  md:max-w-[240px]">
          <input
            type="search"
            placeholder="Cari Siswa"
            value={search}
            onChange={handleSearch}
            className="w-full rounded-full py-2 pr-2 pl-8 text-sm border border-gray-400 outline-offset-1 outline-1 outline-neutral"
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>
        {/* <div className="flex gap-2  mr-auto  lg:ml-8">
          <button className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-2.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-full flex-between gap-3">
            <ArrowDown01
              width={15}
              height={15}
              className="rounded-full bg-white text-neutral"
            />
            Kelas
          </button>
          <button className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-2.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-full flex-between gap-3">
            <ArrowDownNarrowWide
              width={15}
              height={15}
              className="rounded-full bg-white text-neutral"
            />
            Nama
          </button>
        </div> */}

        <Link
          to={"/admin/tambah-siswa"}
          className="flex-between gap-3  bg-gray-700 hover:bg-neutral transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-lg "
        >
          <Plus
            width={15}
            height={15}
            className="rounded-full bg-white text-neutral"
          />{" "}
          Tambah Siswa
        </Link>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-xl">
        <TableSiswa
          data={dataSiswa}
          page={page}
          limit={pagination.perPage}
          totalSiswa={pagination.total}
          totalPage={pagination.totalPages}
          handlePagination={handlePagination}
        />
      </div>
    </section>
  );
};

export default DataSiswaPage;
