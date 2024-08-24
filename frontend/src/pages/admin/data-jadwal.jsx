import DeleteModal from "@/components/fragments/admin/data-pelajaran/DeleteModal";
import EditModal from "@/components/fragments/admin/data-pelajaran/EditModal";
import TablePelajaran from "@/components/fragments/admin/data-pelajaran/TablePelajaran";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Filter, Plus, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MapelIcon from "../../assets/svg/pelajaran.svg?react";
import AddModal from "@/components/fragments/admin/data-jadwal.jsx/AddModal";
import AcaraIcon from "../../assets/svg/acara.svg?react";
import TableJadwal from "@/components/fragments/admin/data-jadwal.jsx/TableJadwal";

const DataJadwalPage = () => {
  const [loading, setLoading] = useState(false);
  const [isAddJadwal, setIsAddJadwal] = useState(false);
  const [dataJadwal, setDataJadwal] = useState([]);

  useEffect(() => {
    const getJadwal = async () => {
      try {
        const res = await axios.get(HOST + "/api/jadwal/get-jadwal", {
          withCredentials: true,
        });

        console.log(res);
        if (res.status === 200) {
          setDataJadwal(res.data.jadwal);
        }
      } catch (error) {
        responseError(error);
      }
    };
    getJadwal();
  }, []);

  const handleToggleAdd = () => {
    setIsAddJadwal(!isAddJadwal);
  };

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between flex-wrap mt-8 gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari Nama "
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full py-1.5 pr-2 pl-10 text-sm border border-gray-400 outline-offset-1 outline-1 outline-neutral"
          />
          <button className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </button>
        </div>
        <div className="flex gap-2 relative  mr-auto  ">
          <button
            // onClick={handleToggleFilter}
            // ref={buttonFilterRef}
            // disabled={dataFilter.length === 0}
            className="border border-gray-400 group disabled:cursor-not-allowed bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
          >
            <Filter
              width={15}
              height={15}
              className="text-gray-600 group-hover:text-white"
            />
          </button>
          {/* {option !== "terbaru" && (
            <button
              onClick={() => setOption("terbaru")}
              className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-lg flex-between gap-3"
            >
              Clear
            </button>
          )}

          {isFilter && (
            <FilterMapel
              option={option}
              handleOptionChange={handleOptionChange}
              onClose={handleToggleFilter}
              ref={filterRef}
            />
          )} */}
        </div>
        <button
          aria-label="tambah jawa;"
          onClick={handleToggleAdd}
          // disabled={loading}
          className="bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
        >
          <AcaraIcon width={15} height={15} className="" />
          Tambah Jadwal
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-md">
        {loading ? (
          <div className="block w-full relative bg-backup animate-pulse shadow-md pb-[3.5rem]">
            <div className="w-full flex-center min-h-[340px] overflow-x-auto rounded-md">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableJadwal
            data={dataJadwal}
            // handleToggleDelete={handleToggleDelete}
            // handleToggleEdit={handleToggleEdit}
            loading={loading}
          />
        )}
      </div>
      {isAddJadwal && <AddModal onClose={handleToggleAdd} />}
      {/* {isDeleteMapel && <DeleteModal onClose={handleToggleDelete} />}

      {isEditMapel && <EditModal onClose={handleToggleEdit} />} */}
    </section>
  );
};

export default DataJadwalPage;
