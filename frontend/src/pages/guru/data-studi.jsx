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
import { useEffect, useState } from "react";
import TableStudi from "@/components/fragments/guru/data-studi/TableStudi";
import KelasDropdown from "@/components/elements/data-studi/kelasDropdown";
import PertemuanDropdown from "@/components/elements/data-studi/PertemuanDropdown";
import AddModal from "@/components/fragments/guru/data-studi/AddModal";
import responseError from "@/util/services";
import axios from "axios";
import { HOST } from "@/util/constant";

const DataStudiPage = () => {
  const [loading, setLoading] = useState(true);
  const [kelas, setKelas] = useState({ id: "", grade: "", nama: "" });

  const [pertemuan, setPertemuan] = useState("");
  const [isAddNilai, setIsAddNilai] = useState(false);
  const [isEditNilai, setIsEditNilai] = useState(false);
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
  }, [kelas, pertemuan, isAddNilai]);

  const handleChangeKelas = (value) => {
    setKelas(value);
  };

  const handleChangePertemuan = (value) => {
    setPertemuan(value);
  };

  const handleToggleAdd = () => {
    setIsAddNilai(!isAddNilai);
  };

  return (
    <section className="px-6 py-4  ">
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          <input
            type="search"
            placeholder="Cari Nama Siswa"
            // value={search}
            // disabled={loading}
            // onChange={handleSearch}
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
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            <div className="flex gap-2 relative  mr-auto  ">
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
          </div>
        </div>

        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[395px] flex-center bg-backup animate-pulse overflow-auto ">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableStudi data={dataNilai} />
        )}
      </div>
      {/* {isDeleteSiswa && (
          <DeleteModal
            onClose={handleToggleDeleteOne}
            title={"Apakah And yakin ingin menghapus siswa?"}
          />
        )}
        {isEditSiswa && <EditModal onClose={handleToggleEdit} kelas={data} />} */}
      {isAddNilai && (
        <AddModal
          onClose={handleToggleAdd}
          kelas={kelas}
          pertemuan={pertemuan}
        />
      )}
      {/* {isDeleteManySiswa && (
          <DeleteManyModal
            onClose={handleToggleDeleteMany}
            setAllCheck={setAllCheck}
          />
        )}
        <div style={{ display: "none" }}>
          <PrintComponent
            ref={componentRef}
            dataSiswa={dataSiswa}
            data={data}
          />
        </div> */}
    </section>
  );
};

export default DataStudiPage;
