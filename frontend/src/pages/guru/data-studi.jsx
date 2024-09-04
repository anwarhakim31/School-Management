import {
  Bolt,
  EllipsisVerticalIcon,
  FileDown,
  Filter,
  Printer,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import Studi from "../../assets/svg/studi.svg?react";
import { useEffect, useRef, useState } from "react";
import TableStudi from "@/components/fragments/guru/data-studi/TableStudi";
import KelasDropdown from "@/components/elements/data-studi/kelasDropdown";
import PertemuanDropdown from "@/components/elements/data-studi/PertemuanDropdown";
import AddModal from "@/components/fragments/guru/data-studi/AddModal";
import responseError from "@/util/services";
import axios from "axios";
import { HOST } from "@/util/constant";
import ModalDelete from "@/components/fragments/ModalDelete";
import { useSelector } from "react-redux";
import {
  selectedDataDelete,
  selectedDataDeleteMany,
} from "@/store/slices/admin-slice";
import DeleteManyModal from "@/components/fragments/ModalDeleteMany";
import EditModal from "@/components/fragments/guru/data-studi/EditModal";

const DataStudiPage = () => {
  const menuRef = useRef(null);
  const dataDelete = useSelector(selectedDataDelete);
  const dataChecked = useSelector(selectedDataDeleteMany);
  const [loading, setLoading] = useState(true);
  const [kelas, setKelas] = useState({ id: "", grade: "", nama: "" });
  const [pertemuan, setPertemuan] = useState("");
  const [isAddNilai, setIsAddNilai] = useState(false);
  const [search, setSearch] = useState("");
  const [isEditNilai, setIsEditNilai] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isMenuMobile, setIsMenuMobile] = useState(false);
  const [isDeleteNilai, setIsDeleteNilai] = useState(false);
  const [isDeleteManynilai, setIsDeleteManynilai] = useState(false);
  const [dataNilai, setDataNilai] = useState([]);

  useEffect(() => {
    const getNilai = async () => {
      try {
        const res = await axios.get(
          HOST + `/api/nilaiPertemuan/${kelas.id}/pertemuan/${pertemuan}`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setDataNilai(res.data.nilai);

          console.log(res.data);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    if (kelas && pertemuan) {
      getNilai();
    }
  }, [
    kelas,
    pertemuan,
    isAddNilai,
    isDeleteNilai,
    isDeleteManynilai,
    isEditNilai,
  ]);

  const handleChangeKelas = (value) => {
    setKelas(value);
  };

  const handleChangePertemuan = (value) => {
    setPertemuan(value);
  };

  const handleToggleAdd = () => {
    setIsAddNilai(!isAddNilai);
  };
  const handleToggleDelete = () => {
    setIsDeleteNilai(!isDeleteNilai);
  };

  const handleToggleDeleteMany = () => {
    setIsDeleteManynilai(!isDeleteManynilai);
  };

  const handleToggleMenu = () => {
    setIsMenuMobile(!isMenuMobile);
  };

  const handleToggleEdit = () => {
    setIsEditNilai(!isEditNilai);
  };

  useEffect(() => {
    if (dataNilai) {
      let clone = [...dataNilai];

      if (search) {
        const split = search.trim().toLocaleLowerCase().split(" ");

        clone = clone.filter((item) => {
          return split.every((key) =>
            item.siswa.nama.toLocaleLowerCase().includes(key)
          );
        });
      }

      setDataSearch(clone);
    }
  }, [dataNilai, search]);

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari Nama Siswa"
            value={search}
            disabled={loading}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full disabled:cursor-not-allowed py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div>
        </div>

        <button
          aria-label="tambah data"
          disabled={loading || pertemuan === 0}
          onClick={handleToggleAdd}
          className="flex-between gap-3 min-w-fit disabled:cursor-not-allowed bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <Studi width={15} height={15} className="stroke-white" />
          Tambah Data
        </button>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex items-center gap-4  ">
          <div className="flex-center gap-2 relative  mr-auto  px-4 h-14 ">
            <div className="flex-center">
              <button
                title="Hapus nilai terpilih"
                onClick={handleToggleDeleteMany}
                className={`${
                  dataChecked.length > 0
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                } border block border-gray-300 bg-white  text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
              >
                <Trash2 width={15} height={15} className=" text-neutral2 " />
              </button>
            </div>
            <div className="hidden sm:flex-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-xs font-semibold text-gray-700">Kelas</p>
                <KelasDropdown onChange={handleChangeKelas} />
              </div>
              {kelas.id && (
                <div className="flex items-center gap-4">
                  <p className="text-xs font-semibold text-gray-700">
                    Pertemuan
                  </p>
                  <PertemuanDropdown
                    kelas={kelas.id}
                    onChange={handleChangePertemuan}
                  />
                </div>
              )}
            </div>
            <div ref={menuRef} className="relative block sm:hidden">
              <button
                onClick={handleToggleMenu}
                className="flex-center  w-8 h-8 rounded-full border p-1 bg-gray-100 hover:bg-gray-200 border-neutral"
              >
                <EllipsisVerticalIcon
                  width={15}
                  height={15}
                  className="text-gray-800"
                />
              </button>

              {isMenuMobile && (
                <div
                  role="menu"
                  className="absolute left-0 z-50 mt-1 flex-between p-4  border shadow-sm  w-fit bg-white rounded-md "
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <p className="text-xs font-semibold text-gray-700">
                        Kelas
                      </p>
                      <KelasDropdown onChange={handleChangeKelas} />
                    </div>
                    {kelas.id && (
                      <div className="flex items-center gap-4">
                        <p className="text-xs font-semibold text-gray-700">
                          Pertemuan
                        </p>
                        <PertemuanDropdown
                          kelas={kelas.id}
                          onChange={handleChangePertemuan}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[396px] flex-center bg-backup  overflow-auto transition-all duration-300 ease-in-out">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        ) : (
          <TableStudi
            data={dataSearch}
            handleToggleDelete={handleToggleDelete}
            handleToggleDeleteMany={handleToggleDeleteMany}
            handleToggleEdit={handleToggleEdit}
            allChecked={allChecked}
            setAllChecked={setAllChecked}
          />
        )}
      </div>
      {isDeleteNilai && (
        <ModalDelete
          onClose={handleToggleDelete}
          title={"Apakah Anda yakin ingin menghapus nilai pertemuan?"}
          url={`/api/nilaiPertemuan/delete-one/${dataDelete._id}`}
        />
      )}
      {isEditNilai && <EditModal onClose={handleToggleEdit} />}
      {isAddNilai && (
        <AddModal
          onClose={handleToggleAdd}
          kelas={kelas}
          pertemuan={pertemuan}
        />
      )}
      {isDeleteManynilai && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllChecked}
          url={"/api/nilaiPertemuan/delete-many"}
          title={"Apakah And yakin ingin menghapus nilai terpilih?"}
        />
      )}
    </section>
  );
};

export default DataStudiPage;
