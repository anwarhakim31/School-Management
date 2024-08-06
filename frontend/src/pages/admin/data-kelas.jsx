import FilterKelas from "@/components/elements/FilterKelas";
import AddModal from "@/components/fragments/admin/data-kelas/AddModal";
import DeleteModal from "@/components/fragments/admin/data-kelas/DeleteModal";
import EditModal from "@/components/fragments/admin/data-kelas/EditModal";
import TableKelas from "@/components/fragments/admin/data-kelas/TableKelas";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import {
  ArrowDown01,
  ArrowDownNarrowWide,
  ListFilter,
  Plus,
  Search,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

const DataKelasPage = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddKelas, setIsAddKelas] = useState(false);
  const [isEditKelas, setIsEditKelas] = useState(false);
  const [isDeleteKelas, setIsDeleteKelas] = useState(false);
  const [option, setOption] = useState(["", ""]);
  const [isFilter, setIsFilter] = useState(false);
  const filterRef = useRef();
  const buttonFilterRef = useRef();

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
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getKelas();
  }, [isAddKelas, isDeleteKelas, isEditKelas]);

  useEffect(() => {
    let kelasFilter = [...dataKelas];

    if (search) {
      const value = search.trim().toLowerCase().split(" ");

      kelasFilter = kelasFilter.filter((kelas) => {
        return value.every(
          (key) =>
            kelas.nama.toLowerCase().includes(key) ||
            String(kelas.kelas).includes(key)
        );
      });
    }

    if (option[0] === "kelas") {
      if (option[1] === "asc") {
        kelasFilter = kelasFilter.sort((a, b) => a.kelas - b.kelas);
      } else if (option[1] === "desc") {
        kelasFilter = kelasFilter.sort((a, b) => b.kelas - a.kelas);
      }
    }

    if (option[0] === "nama") {
      if (option[1] === "asc") {
        kelasFilter = kelasFilter.sort((a, b) => a.nama.localeCompare(b.nama));
      } else if (option[1] === "desc") {
        kelasFilter = kelasFilter.sort((a, b) => b.nama.localeCompare(a.nama));
      }
    }

    setDataFilter(kelasFilter);
  }, [dataKelas, search, option]);

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
    const { value, name } = e.target;

    setOption([name, value]);
    setIsFilter(false);
  };

  const handleToggleFilter = (e) => {
    setIsFilter((prev) => !prev);
  };

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
            className="border border-gray-400 disabled:cursor-not-allowed bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-lg flex-between gap-3"
          >
            <ListFilter width={15} height={15} className="" />
          </button>
          {option[0] && (
            <button
              onClick={() => setOption(["", ""])}
              className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-lg flex-between gap-3"
            >
              Clear
            </button>
          )}

          {isFilter && (
            <FilterKelas
              option={option}
              handleOptionChange={handleOptionChange}
              onClose={handleToggleFilter}
              ref={filterRef}
            />
          )}
        </div>
        <button
          aria-label="tambah kelas"
          onClick={handleToggleAdd}
          className="bg-gray-700 hover:bg-neutral transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
        >
          <Plus
            width={15}
            height={15}
            className="rounded-full bg-white text-neutral"
          />{" "}
          Tambah Kelas
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
          <TableKelas
            data={dataFilter}
            handleToggleDelete={handleToggleDelete}
            handleToggleEdit={handleToggleEdit}
            loading={loading}
          />
        )}
      </div>
      {isDeleteKelas && <DeleteModal onClose={handleToggleDelete} />}
      {isAddKelas && <AddModal onClose={handleToggleAdd} />}
      {isEditKelas && <EditModal onClose={handleToggleEdit} />}
    </section>
  );
};

export default DataKelasPage;
