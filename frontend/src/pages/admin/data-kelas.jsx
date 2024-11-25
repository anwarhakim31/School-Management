import FilterKelas from "@/components/elements/data-kelas/FilterKelas";
import AddModal from "@/components/views/admin/data-kelas/AddModal";
import EditModal from "@/components/views/admin/data-kelas/EditModal";
import TableKelas from "@/components/views/admin/data-kelas/TableKelas";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Filter, Plus, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ClassIcon from "../../assets/svg/class.svg?react";
import { useSelector } from "react-redux";
import { selectedDataDelete } from "@/store/slices/admin-slice";
import DeleteModal from "@/components/fragments/ModalDelete";

const DataKelasPage = () => {
  const dataDelete = useSelector(selectedDataDelete);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddKelas, setIsAddKelas] = useState(false);
  const [isEditKelas, setIsEditKelas] = useState(false);
  const [isDeleteKelas, setIsDeleteKelas] = useState(false);
  const [option, setOption] = useState("terbaru");
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
        console.log(kelas);
        return value.every(
          (key) =>
            kelas.nama.toLowerCase().includes(key) ||
            String(kelas.kelas).includes(key)
        );
      });
    }

    if (option === "terbaru") {
      kelasFilter = kelasFilter.reverse();
    }

    if (option === "a-z") {
      kelasFilter = kelasFilter.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    if (option === "z-a") {
      kelasFilter = kelasFilter.sort((a, b) => b.nama.localeCompare(a.nama));
    }

    if (option === "1-12") {
      kelasFilter = kelasFilter.sort((a, b) => a.kelas - b.kelas);
    }

    if (option === "12-1") {
      kelasFilter = kelasFilter.sort((a, b) => b.kelas - a.kelas);
    }

    if (option === "terbanyak") {
      kelasFilter = kelasFilter.sort((a, b) => b.jumlahSiswa - a.jumlahSiswa);
    }

    if (option === "terdikit") {
      kelasFilter = kelasFilter.sort((a, b) => a.jumlahSiswa - b.jumlahSiswa);
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
    const { value } = e.target;

    setOption(value);
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
      <div className="w-full flex-between mt-8 flex-wrap gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari nama dan kelas "
            value={search}
            id="search"
            disabled={loading}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full disabled:bg-gray-100  rounded-full py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-1 outline-1 outline-neutral"
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
              strokeWidth={2}
              width={15}
              height={15}
              className="text-gray-600 group-hover:text-white"
            />
          </button>
          {option !== "terbaru" && (
            <button
              onClick={() => setOption("terbaru")}
              className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
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
          disabled={loading}
          className="bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
        >
          <ClassIcon width={15} height={15} className=" " /> Tambah Kelas
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-md">
        {loading ? (
          <div className="block w-full relative bg-backup animate-pulse shadow-md pb-[3.5rem]">
            <div className="w-full flex-center min-h-[338px] overflow-x-auto rounded-md">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
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
      {isDeleteKelas && (
        <DeleteModal
          url={"/api/kelas/delete-kelas/" + dataDelete._id}
          title={"Apakah anda yakin ingin menghapus kelas?"}
          onClose={handleToggleDelete}
        />
      )}
      {isAddKelas && <AddModal onClose={handleToggleAdd} />}
      {isEditKelas && <EditModal onClose={handleToggleEdit} />}
    </section>
  );
};

export default DataKelasPage;
