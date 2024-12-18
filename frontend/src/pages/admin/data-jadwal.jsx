import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Search, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AddModal from "@/components/views/admin/data-jadwal/AddModal";
import AcaraIcon from "../../assets/svg/acara.svg?react";
import TableJadwal from "@/components/views/admin/data-jadwal/TableJadwal";
import EditModal from "@/components/views/admin/data-jadwal/EditModal";
import DropDownFilter2 from "@/components/elements/DropDownFilter2";
import { useSelector } from "react-redux";
import {
  selectedDataDelete,
  selectedDataDeleteMany,
} from "@/store/slices/admin-slice";
import DeleteModal from "@/components/fragments/ModalDelete";
import DeleteManyModal from "@/components/fragments/ModalDeleteMany";

const DataJadwalPage = () => {
  const dataChecked = useSelector(selectedDataDeleteMany);
  const dataDelete = useSelector(selectedDataDelete);
  const [loading, setLoading] = useState(true);
  const [isAddJadwal, setIsAddJadwal] = useState(false);
  const [isDeleteJadwal, setIsDeleteJadwal] = useState(false);
  const [isEditJadwal, setIsEditJadwal] = useState(false);
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [filter, setFilter] = useState({ hari: "", kelas: "", namaKelas: "" });
  const [search, setSearch] = useState("");
  const [allCheck, setAllCheck] = useState(false);
  const [isDeleteMany, setIsDeleteMany] = useState(false);

  useEffect(() => {
    const getJadwal = async () => {
      try {
        const res = await axios.get(HOST + "/api/jadwal/get-jadwal", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataJadwal(res.data.jadwal);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };
    getJadwal();
  }, [isAddJadwal, isDeleteJadwal, isEditJadwal, isDeleteMany]);

  useEffect(() => {
    let clone = [...dataJadwal];

    if (search) {
      const splitValue = search.trim().toLocaleLowerCase().split(" ");

      clone = clone.filter((jadwal) =>
        splitValue.every(
          (key) =>
            jadwal.guru.nama.toLocaleLowerCase().includes(key) ||
            jadwal.bidangStudi.nama.toLocaleLowerCase().includes(key) ||
            jadwal.bidangStudi.kode.toLocaleLowerCase().includes(key)
        )
      );
    }

    if (filter.hari) {
      clone = clone.filter((jadwal) => jadwal.hari.includes(filter.hari));
    }

    if (filter.kelas) {
      clone = clone.filter((jadwal) => jadwal.kelas.kelas === filter.kelas);
    }

    if (filter.namaKelas) {
      clone = clone.filter((jadwal) =>
        jadwal.kelas.nama.includes(filter.namaKelas)
      );
    }

    setDataFilter(clone);
  }, [dataJadwal, search, filter]);

  const handleToggleAdd = () => {
    setIsAddJadwal(!isAddJadwal);
  };

  const handleToggleDelete = () => {
    setIsDeleteJadwal(!isDeleteJadwal);
  };
  const handleToggDeleteMany = () => {
    setIsDeleteMany(!isDeleteMany);
  };
  const handleToggleEdit = () => {
    setIsEditJadwal(!isEditJadwal);
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between flex-wrap mt-8 gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            id="search"
            placeholder="Cari bidang studi dan guru dari jadwal.  "
            value={search}
            disabled={loading}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full disabled:bg-gray-100 rounded-full py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-1 outline-1 outline-neutral"
          />
          <button className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </button>
        </div>

        <button
          aria-label="tambah jawdwal"
          onClick={handleToggleAdd}
          disabled={loading}
          className="bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
        >
          <AcaraIcon width={15} height={15} className="" />
          Tambah Jadwal
        </button>
      </div>
      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-md">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <button
              title="Hapus siswa terpilih"
              onClick={handleToggDeleteMany}
              className={`${
                dataChecked.length > 0 ? "opacity-100" : "opacity-0"
              } border block border-gray-300 bg-white text-gray-500 group rounded-md disabled:cursor-not-allowed  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button>
            <DropDownFilter2
              handleFilterChange={handleFilterChange}
              setFilter={setFilter}
            />
          </div>
        </div>
        {loading ? (
          <div className="block w-full relative bg-backup animate-pulse shadow-md pb-[3.5rem]">
            <div className="w-full flex-center min-h-[340px] overflow-x-auto rounded-md">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableJadwal
            data={dataFilter}
            handleToggleDelete={handleToggleDelete}
            handleToggleEdit={handleToggleEdit}
            loading={loading}
            allCheck={allCheck}
            setAllCheck={setAllCheck}
          />
        )}
      </div>
      {isAddJadwal && <AddModal onClose={handleToggleAdd} />}
      {isDeleteJadwal && (
        <DeleteModal
          onClose={handleToggleDelete}
          url={"/api/jadwal/delete-jadwal/" + dataDelete._id}
          title={"Apakah anda yakin ingin menghapus jadwal?"}
        />
      )}
      {isDeleteMany && (
        <DeleteManyModal
          onClose={handleToggDeleteMany}
          setAllCheck={setAllCheck}
          title={"Apakah anda yakin ingin menghapus jadwal terpilih?"}
          url={"/api/jadwal/delete-many-jadwal"}
        />
      )}
      {isEditJadwal && <EditModal onClose={handleToggleEdit} />}
    </section>
  );
};

export default DataJadwalPage;
