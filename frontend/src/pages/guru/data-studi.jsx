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
import { useState } from "react";
import TableStudi from "@/components/fragments/guru/data-studi/TableStudi";
import KelasDropdown from "@/components/elements/data-studi/kelasDropdown";
import PertemuanDropdown from "@/components/elements/data-studi/PertemuanDropdown";
import AddModal from "@/components/fragments/guru/data-studi/AddModal";

const DataStudiPage = () => {
  const [loading, setLoading] = useState(false);

  const [kelas, setKelas] = useState({ id: "", grade: "", nama: "" });
  const [pertemuan, setPertemuan] = useState("");
  const [isAddNilai, setIsAddNilai] = useState(false);
  const [isEditNilai, setIsEditNilai] = useState(false);
  const [isDeleteNilai, setIsDeleteNilai] = useState(false);
  const [isDeleteManynilai, setIsDeleteManynilai] = useState(false);
  const [dataNilai, setDataNilai] = useState([]);

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
              <div className="flex items-center gap-4">
                <p className="text-xs font-semibold text-gray-700">Pertemuan</p>
                <PertemuanDropdown
                  kelas={kelas.id}
                  onChange={handleChangePertemuan}
                />
              </div>

              {/* {isFilter && (
                <FilterSiswa
                  ref={FilterRef}
                  filter={filter}
                  isFilter={isFilter}
                  handleOptionChange={handleOptionChange}
                  handleToggleFilter={handleToggleFilter}
                />
              )} */}
            </div>
          </div>
          {/* <div className="hidden sm:flex gap-2">
            <button
              title="Excel"
              disabled={loading}
              className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
              onClick={() => exportToExcel(dataSiswa, data.kelas, data.nama)}
            >
              <FileDown
                width={20}
                height={20}
                strokeWidth={1}
                className="group-hover:text-white"
              />
            </button>
            <ReactToPrint
              trigger={() => (
                <button
                  title="Print"
                  className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1.5 rounded-md"
                >
                  <Printer
                    width={20}
                    height={20}
                    strokeWidth={1}
                    className="group-hover:text-white"
                  />
                </button>
              )}
              content={() => componentRef.current}
            />
          </div> */}
          {/* <div ref={menuRef} className="relative block sm:hidden">
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
                className="absolute right-0 mt-1 flex-between p-2  border shadow-sm  w-fit bg-white rounded-md "
              >
                <div className="flex flex-col gap-3">
                  <button
                    title="Excel"
                    disabled={loading}
                    className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1 rounded-md"
                    onClick={() =>
                      exportToExcel(
                        dataSiswa,
                        userData.waliKelas.kelas,
                        userData.waliKelas.nama
                      )
                    }
                  >
                    <FileDown
                      width={20}
                      height={20}
                      strokeWidth={1}
                      className="group-hover:text-white"
                    />
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button
                        title="Print"
                        disabled={loading}
                        className="hover:bg-neutral transition-all disabled:cursor-not-allowed duration-300 group border p-1 rounded-md"
                      >
                        <Printer
                          width={20}
                          height={20}
                          strokeWidth={1}
                          className="group-hover:text-white"
                        />
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
            )}
          </div> */}
        </div>

        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[450px] flex-center bg-backup animate-pulse overflow-auto ">
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
