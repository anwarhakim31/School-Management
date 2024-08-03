import AddModal from "@/components/fragments/admin/data-kelas/AddModal";
import DeleteModal from "@/components/fragments/admin/data-kelas/DeleteModal";
import EditModal from "@/components/fragments/admin/data-kelas/EditModal";
import TableKelas from "@/components/fragments/admin/data-kelas/TableKelas";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ArrowDown01, ArrowDownNarrowWide, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const DataKelasPage = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddKelas, setIsAddKelas] = useState(false);
  const [isEditKelas, setIsEditKelas] = useState(false);
  const [isDeleteKelas, setIsDeleteKelas] = useState(false);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataKelas(res.data.kelas);
        }
      } catch (error) {
        responseError(error);
      }
    };

    getKelas();
  }, [isAddKelas, isDeleteKelas, isEditKelas]);

 

  useEffect(() => {
    
    
    if (search) {
        const 
      
    }



  },[dataKelas,search])


  const handleToggleAdd = () => {
    setIsAddKelas(!isAddKelas);
  };
  const handleToggleDelete = () => {
    setIsDeleteKelas(!isDeleteKelas);
  };
  const handleToggleEdit = () => {
    setIsEditKelas(!isEditKelas);
  };

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between flex-wrap gap-6">
        <div className="relative flex w-full  md:max-w-[240px]">
          <input
            type="search"
            placeholder="Cari Kelas"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
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
        <button
          aria-label="tambah kelas"
          onClick={handleToggleAdd}
          className="bg-gray-800 hover:bg-neutral transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
        >
          <Plus
            width={15}
            height={15}
            className="rounded-full bg-white text-neutral"
          />{" "}
          Tambah Kelas
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-xl">
        <TableKelas
          data={dataKelas}
          handleToggleDelete={handleToggleDelete}
          handleToggleEdit={handleToggleEdit}
        />
      </div>
      {isDeleteKelas && <DeleteModal onClose={handleToggleDelete} />}
      {isAddKelas && <AddModal onClose={handleToggleAdd} />}
      {isEditKelas && <EditModal onClose={handleToggleEdit} />}
    </section>
  );
};

export default DataKelasPage;
