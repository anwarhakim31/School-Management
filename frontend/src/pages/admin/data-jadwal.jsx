import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { File, Filter, Plus, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AddModal from "@/components/fragments/admin/data-jadwal.jsx/AddModal";
import AcaraIcon from "../../assets/svg/acara.svg?react";
import TableJadwal from "@/components/fragments/admin/data-jadwal.jsx/TableJadwal";
import DeleteModal from "@/components/fragments/admin/data-jadwal.jsx/DeleteModal";
import EditModal from "@/components/fragments/admin/data-jadwal.jsx/EditModal";
import DropDownFilter2 from "@/components/elements/DropDownFilter2";

const DataJadwalPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAddJadwal, setIsAddJadwal] = useState(false);
  const [isDeleteJadwal, setIsDeleteJadwal] = useState(false);
  const [isEditJadwal, setIsEditJadwal] = useState(false);
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [filter, setFilter] = useState({ hari: "", kelas: "", namaKelas: "" });
  const [search, setSearch] = useState("");

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
  }, [isAddJadwal, isDeleteJadwal, isEditJadwal]);

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

  console.log(dataJadwal);

  const handleToggleAdd = () => {
    setIsAddJadwal(!isAddJadwal);
  };

  const handleToggleDelete = () => {
    setIsDeleteJadwal(!isDeleteJadwal);
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
            placeholder="Cari Nama "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full py-1.5 pr-2 pl-10 text-sm border border-gray-400 outline-offset-1 outline-1 outline-neutral"
          />
          <button className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </button>
        </div>
        <div className="mr-auto">
          <DropDownFilter2
            handleFilterChange={handleFilterChange}
            setFilter={setFilter}
          />
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
        {loading ? (
          <div className="block w-full relative bg-backup animate-pulse shadow-md pb-[3.5rem]">
            <div className="w-full flex-center min-h-[340px] overflow-x-auto rounded-md">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableJadwal
            data={dataFilter}
            handleToggleDelete={handleToggleDelete}
            handleToggleEdit={handleToggleEdit}
            loading={loading}
          />
        )}
      </div>
      {isAddJadwal && <AddModal onClose={handleToggleAdd} />}
      {isDeleteJadwal && <DeleteModal onClose={handleToggleDelete} />}

      {isEditJadwal && <EditModal onClose={handleToggleEdit} />}
    </section>
  );
};

export default DataJadwalPage;
