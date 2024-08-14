import CustomDropdown from "@/components/elements/DropDown";
import Student from "../../assets/svg/Teacher.svg";
import TableSiswa from "@/components/fragments/guru/walikelas/TableSiswa";
import DeleteModal from "@/components/fragments/guru/walikelas/DeleteModal";
import {
  selectedDataDeleteMany,
  setDataDeleteMany,
  setDataEdit,
} from "@/store/slices/admin-slice";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Bolt, Filter, Search, Settings, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "@/components/fragments/guru/walikelas/AddModal";
import DeleteManyModal from "@/components/fragments/guru/walikelas/DeleteManyModal";
import FilterSiswa from "@/components/elements/wali-kelas/FilterSiswa";
import EditModal from "@/components/fragments/guru/walikelas/EditModal";
import EditKelasModal from "@/components/fragments/guru/walikelas/EditKelasModal";

const selectRow = [7, 14, 21, 28];

const DataKelasguruPage = () => {
  const dispatch = useDispatch();
  const buttonFilterRef = useRef();
  const FilterRef = useRef();
  const [loading, setLoading] = useState(true);
  const [isDeleteSiswa, setIsDeleteSiswa] = useState(false);
  const [isAddSiswa, setIsAddSiswa] = useState(false);
  const [isEditSiswa, setIsEditSiswa] = useState(false);
  const [isEditKelas, setIsEditKelas] = useState(false);
  const [isDeleteManySiswa, setIsDeleteManySiswa] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const dataChecked = useSelector(selectedDataDeleteMany);
  const userData = useSelector(selectedUserData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("terbaru");
  const [data, setData] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  useEffect(() => {
    dispatch(setDataDeleteMany([]));
    const getKelas = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/kelas/get-wali-kelas/" + userData._id,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setData(res.data.kelas);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    getKelas();
  }, [isDeleteSiswa, isAddSiswa, isDeleteManySiswa, isEditSiswa]);

  useEffect(() => {
    let datas = data?.siswa?.map((siswa) => siswa);

    if (search) {
      const splitValue = search.trim().toLocaleLowerCase().split(" ");
      datas = datas.filter((data) => {
        return splitValue.every(
          (key) => data.nama.includes(key) || data.nis.includes(key)
        );
      });
    }

    if (filter === "terlama") {
      datas.reverse();
    }
    if (filter === "a-z") {
      datas = datas.sort((a, b) => b.nama.localeCompare(a.nama));
    }

    if (filter === "z-a") {
      datas = datas.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    setDataSiswa(datas);
  }, [data, search, filter]);

  const handleToggleDeleteOne = () => {
    setIsDeleteSiswa(!isDeleteSiswa);
  };

  const handleToggleAdd = () => {
    setIsAddSiswa(!isAddSiswa);
  };

  const handleToggleDeleteMany = () => {
    setIsDeleteManySiswa(!isDeleteManySiswa);
  };

  const handleSelectBaris = (value) => {
    setLimit(value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleFilter = () => {
    setIsFilter(!isFilter);
  };

  const handleOptionChange = (e) => {
    setFilter(e.target.value);
    setIsFilter(false);
  };

  const handleToggleEdit = () => {
    setIsEditSiswa(!isEditSiswa);
  };

  const handleEditSiswa = (data) => {
    dispatch(setDataEdit(data));
    handleToggleEdit();
  };

  const handleToggleEditKelas = () => {
    setIsEditKelas(!isEditKelas);
  };

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="border bg-white border-gray-300 p-4 mb-6 md:max-w-[300px]  rounded-md">
        <div className="flex items-center mb-4 justify-between">
          <h3 className="text-sm  font-bold">Detail Kelas</h3>
          <button
            aria-label="pengaturan kelas"
            title="Edit Kelas"
            onClick={handleToggleEditKelas}
            className="w-6 h-6 rounded-full hover:bg-gray-200 flex-center hover:border"
          >
            <Settings width={18} height={18} />
          </button>
        </div>

        <div>
          <div className="text-xs mt-2 grid grid-cols-3 gap-1">
            <p className="font-semibold">Kelas </p>
            <p className="truncate col-span-2">
              {loading ? (
                <span className="w-1/2 h-4 bg-slate-300 block animate-pulse rounded-sm "></span>
              ) : (
                <span>
                  : {data.kelas} {data.nama}
                </span>
              )}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs mt-2 grid grid-cols-3 gap-1">
            <span className="font-semibold">Total Siswa</span>
            {loading ? (
              <span className="w-1/2 h-4 col-span-2 bg-slate-300 block animate-pulse rounded-sm "></span>
            ) : (
              <span>: {data.jumlahSiswa}</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-xs mt-2 grid grid-cols-3 gap-1">
            <span className="font-semibold">Posisi Kelas</span>
            {loading ? (
              <span className="w-1/2 h-4 col-span-2 bg-slate-300 block animate-pulse rounded-sm "></span>
            ) : (
              <span>: {data.posisi ? data.posisi : ""}</span>
            )}
          </p>
        </div>
      </div>
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

        <button
          aria-label="tambah siswa"
          onClick={handleToggleAdd}
          className="flex-between gap-3 min-w-fit bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <img src={Student} alt="student" width={15} height={15} />
          Tambah Siswa
        </button>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus siswa terpilih"
              onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } border block border-gray-300 bg-white  text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button>

            <CustomDropdown
              options={selectRow}
              onSelect={handleSelectBaris}
              selected={limit}
            />
            <div className="flex gap-2 relative  mr-auto  ">
              <button
                onClick={handleToggleFilter}
                ref={buttonFilterRef}
                disabled={dataSiswa?.length === 0}
                className="border border-gray-400 group disabled:cursor-not-allowed bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
              >
                <Filter
                  strokeWidth={2}
                  width={15}
                  height={15}
                  className="text-gray-600 group-hover:text-white"
                />
              </button>
              {filter !== "terbaru" && (
                <button
                  onClick={() => setFilter("terbaru")}
                  className="border border-gray-400 bg-white text-gray-500  hover:bg-neutral hover:border-gray-400 border-dashed  py-1.5 transition-all duration-300 font-medium hover:text-white  text-xs px-4 rounded-md flex-between gap-3"
                >
                  Clear
                </button>
              )}
              {isFilter && (
                <FilterSiswa
                  ref={FilterRef}
                  filter={filter}
                  isFilter={isFilter}
                  handleOptionChange={handleOptionChange}
                  handleToggleFilter={handleToggleFilter}
                />
              )}
            </div>
          </div>
          <div>
            {/* <ExportExcel
              columns={columns}
              data={dataSiswa}
              namaFile={"Data-Siswa"}
              loading={loading}
            /> */}
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[430px] flex-center bg-gray-300 animate-pulse overflow-auto ">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableSiswa
            data={dataSiswa}
            handleToggleDeleteOne={handleToggleDeleteOne}
            handleEditSiswa={handleEditSiswa}
            allCheck={allCheck}
            setAllCheck={setAllCheck}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
      {isDeleteSiswa && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          title={"Apakah And yakin ingin menghapus siswa?"}
        />
      )}
      {isEditSiswa && <EditModal onClose={handleToggleEdit} kelas={data} />}
      {isAddSiswa && <AddModal onClose={handleToggleAdd} kelas={data} />}
      {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )}
      {isEditKelas && (
        <EditKelasModal onClose={handleToggleEditKelas} datas={data} />
      )}
    </section>
  );
};

export default DataKelasguruPage;
