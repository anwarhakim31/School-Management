import { ArrowDown01, ArrowDownNarrowWide, Plus, Search } from "lucide-react";
import React, { useState } from "react";

const DataKelasPage = () => {
  const [search, setSearch] = useState("");

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
            placeholder="Cari Kelas"
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
            Tingkat
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
          Tambah Kelas
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-xl">
        {/* <TableKelas data={dataSearch} /> */}
      </div>
    </section>
  );
};

export default DataKelasPage;
