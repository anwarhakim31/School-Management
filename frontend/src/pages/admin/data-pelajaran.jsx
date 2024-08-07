import DeleteModal from "@/components/fragments/admin/data-pelajaran/DeleteModal";
import EditModal from "@/components/fragments/admin/data-pelajaran/EditModal";
import AddModal from "@/components/fragments/admin/data-pelajaran/AddModal";
import TablePelajaran from "@/components/fragments/admin/data-pelajaran/TablePelajaran";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FilterMapel from "@/components/elements/FilterMapel";

const DataPelajaranPage = () => {
  const [dataMapel, setDataMapel] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddMapel, setIsAddMapel] = useState(false);
  const [isEditMapel, setisEditMapel] = useState(false);
  const [isDeleteMapel, setisDeleteMapel] = useState(false);
  const [option, setOption] = useState("terbaru");
  const [isFilter, setIsFilter] = useState(false);
  const filterRef = useRef();
  const buttonFilterRef = useRef();

  useEffect(() => {
    const getmapel = async () => {
      try {
        const res = await axios.get(HOST + "/api/mapel/get-mapel", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataMapel(res.data.mapel);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getmapel();
  }, [isAddMapel, isDeleteMapel, isEditMapel]);

  useEffect(() => {
    let mapelFilter = [...dataMapel];

    if (search) {
      const value = search.trim().toLowerCase().split(" ");

      mapelFilter = mapelFilter.filter((mapel) => {
        return value.every(
          (key) =>
            mapel.nama.toLowerCase().includes(key) ||
            String(mapel.kode).includes(key)
        );
      });
    }

    if (option === "terlama") {
      mapelFilter = mapelFilter.reverse();
    }

    if (option === "a-z") {
      mapelFilter = mapelFilter.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    if (option === "z-a") {
      mapelFilter = mapelFilter.sort((a, b) => b.nama.localeCompare(a.nama));
    }

    setDataFilter(mapelFilter);
  }, [dataMapel, search, option]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        buttonFilterRef.current &&
        !buttonFilterRef.current.contains(e.target)
      ) {
        setIsFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [isFilter]);

  const handleOptionChange = (e) => {
    const { value } = e.target;

    setOption(value);
    setIsFilter(false);
  };

  const handleToggleFilter = (e) => {
    setIsFilter((prev) => !prev);
  };

  const handleToggleAdd = () => {
    setIsAddMapel(!isAddMapel);
  };
  const handleToggleDelete = () => {
    setisDeleteMapel(!isDeleteMapel);
  };
  const handleToggleEdit = () => {
    setisEditMapel(!isEditMapel);
  };

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between flex-wrap gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full py-2 pr-2 pl-10 text-sm border border-gray-400 outline-offset-1 outline-1 outline-neutral"
          />
          <button className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </button>
        </div>
        <div className="flex gap-2 relative  mr-auto  ">
          <button
            onClick={handleToggleFilter}
            ref={buttonFilterRef}
            disabled={dataFilter.length === 0}
            className="border border-gray-400 group disabled:cursor-not-allowed bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
          >
            <Filter
              width={15}
              height={15}
              className="text-gray-600 group-hover:text-white"
            />
          </button>
          {option !== "terbaru" && (
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
          )}
        </div>
        <button
          aria-label="tambah mapel"
          onClick={handleToggleAdd}
          className="bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
        >
          <Plus
            width={15}
            height={15}
            className="rounded-full bg-white text-neutral"
          />
          Tambah pelajaran
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-md">
        {loading ? (
          <div className="block w-full relative bg-gray-200 animate-pulse shadow-md pb-[3.5rem]">
            <div className="w-full flex-center min-h-[420px] overflow-x-auto rounded-md">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TablePelajaran
            data={dataFilter}
            handleToggleDelete={handleToggleDelete}
            handleToggleEdit={handleToggleEdit}
            loading={loading}
          />
        )}
      </div>
      {isDeleteMapel && <DeleteModal onClose={handleToggleDelete} />}
      {isAddMapel && <AddModal onClose={handleToggleAdd} />}
      {isEditMapel && <EditModal onClose={handleToggleEdit} />}
    </section>
  );
};

export default DataPelajaranPage;
