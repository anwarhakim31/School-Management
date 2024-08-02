import TableSiswa from "@/components/fragments/admin/data-siswa/TableSiswa";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ArrowDown01, ArrowDownNarrowWide, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const DataSiswaPage = () => {
  const [search, setSearch] = useState("");
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    const getSiswa = async () => {
      try {
        const res = await axios.get(HOST + "/api/siswa/get-all-siswa", {
          withCredentials: true,
        });

        setDataSiswa(res.data.data);
      } catch (error) {
        responseError(error);
      }
    };

    getSiswa();
  }, []);

  useEffect(() => {
    const splitValue = search.trim().toLowerCase().split(" ");

    const dataFilter = dataSiswa.filter((siswa) => {
      const nisString = String(siswa.nis);

      return splitValue.every(
        (word) =>
          siswa.nama.toLowerCase().includes(word) || nisString.includes(word)
      );
    });

    if (dataFilter.length === 0) {
      setDataSearch(dataSiswa);
    } else {
      setDataSearch(dataFilter);
    }
  }, [search, dataSiswa]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

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
          <button className="absolute left-2 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </button>
        </div>
        <div className="flex gap-2  mr-auto  lg:ml-8">
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
        </div>
        <button className="bg-gray-700 hover:bg-neutral transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-full flex-between gap-3">
          <Plus
            width={15}
            height={15}
            className="rounded-full bg-white text-neutral"
          />{" "}
          Tambah Siswa
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-xl">
        <TableSiswa data={dataSearch} />
      </div>
    </section>
  );
};

export default DataSiswaPage;
