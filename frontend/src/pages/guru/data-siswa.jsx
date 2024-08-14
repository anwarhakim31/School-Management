import CustomDropdown from "@/components/elements/DropDown";
import Student from "../../assets/svg/Teacher.svg";
import TableSiswa from "@/components/fragments/guru/walikelas/TableSiswa";
import DeleteModal from "@/components/fragments/guru/DeleteModal";
import { selectedDataDeleteMany } from "@/store/slices/admin-slice";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Bolt, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddModal from "@/components/fragments/guru/walikelas/AddModal";

const DataKelasguruPage = () => {
  const [loading, setLoading] = useState(false);
  const [isDeleteSiswa, setIsDeleteSiswa] = useState(false);
  const [isAddSiswa, setIsAddSiswa] = useState(false);
  const dataChecked = useSelector(selectedDataDeleteMany);
  const userData = useSelector(selectedUserData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getKelas = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          HOST + "/api/kelas/get-wali-kelas/" + userData._id,
          { withCredentials: true }
        );

        setData(res.data.kelas);
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    getKelas();
  }, [isDeleteSiswa, isAddSiswa]);

  const handleToggleDeleteOne = () => {
    setIsDeleteSiswa(!isDeleteSiswa);
  };

  const handleToggleAdd = () => {
    setIsAddSiswa(!isAddSiswa);
  };

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="border bg-white border-gray-300 p-4 mb-6 md:max-w-[300px]  rounded-md">
        <div className="flex items-center mb-2 gap-2">
          <h3 className="text-sm  font-bold">Detail Kelas</h3>
          <button aria-label="pengaturan kelas">
            <Bolt width={18} height={18} />
          </button>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-xs mt-2 grid grid-cols-2 gap-1">
              <p className="font-semibold">Kelas </p>

              <p className="truncate">
                {loading ? (
                  <span className="w-full h-4 bg-slate-300 block animate-pulse rounded-sm "></span>
                ) : (
                  <span>
                    : {data.kelas} {data.nama}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs mt-2 grid grid-cols-2 gap-1">
              <span className="font-semibold">Total Siswa</span>
              {loading ? (
                <span className="w-9 h-4 bg-slate-300 block animate-pulse rounded-sm "></span>
              ) : (
                <span>: {data.jumlahSiswa}</span>
              )}
            </p>
          </div>
        </div>
        <p className="text-xs mt-2 flex gap-1">
          <span className="font-semibold">Posisi </span>
          {loading ? (
            <span className="w-9 h-4 bg-slate-300 block animate-pulse rounded-sm "></span>
          ) : (
            <span className="ml-1">: {data.posisi ? data.posisi : ""}</span>
          )}
        </p>
      </div>
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari..."
            // value={search}
            // disabled={loading}
            // onChange={handleSearch}
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
              // onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } border block border-gray-300 bg-white  text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button>

            <CustomDropdown
            // options={selectRow}
            // onSelect={handleSelectBaris}
            // selected={limit}
            />
            {/* <DropdownFilter
              handleFilterChange={handleFilterChange}
              setFilters={setFilters}
            /> */}
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
            data={data}
            handleToggleDeleteOne={handleToggleDeleteOne}
          />
        )}
      </div>
      {isDeleteSiswa && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          title={"Apakah And yakin ingin menghapus siswa?"}
        />
      )}
      {isAddSiswa && <AddModal onClose={handleToggleAdd} kelas={data} />}
      {/* {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )} */}
    </section>
  );
};

export default DataKelasguruPage;
