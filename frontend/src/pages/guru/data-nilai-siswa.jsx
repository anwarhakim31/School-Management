import AddModal from "@/components/fragments/guru/data-nilai/AddModal";
import { selectedUserData } from "@/store/slices/auth-slice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const DataNilaiSiswaPage = () => {
  const userData = useSelector(selectedUserData);
  const [isAddNilai, setIsAddNilai] = useState(false);
  const [isEditNilai, setIsEditNilai] = useState(false);
  const [isDeleteNilai, setIsDeleteNilai] = useState(false);

  const handleToggleAdd = () => {
    setIsAddNilai(!isAddNilai);
  };

  const handleToggleEdit = () => {
    setIsEditNilai(!isEditNilai);
  };
  const handleToggleDelte = () => {
    setIsDeleteNilai(!isDeleteNilai);
  };

  return (
    <section className="px-6 py-4 mb-4 ">
      {/* <div className="border bg-white border-t-gray-300 border-l-gray-300 p-4 mb-6 md:max-w-[300px] border-r-4 border-b-4 border-neutral  rounded-md">
        <div className="flex items-center mb-4 justify-between">
          <h3 className="text-sm  font-bold">Detail Kelas</h3>
        </div>

        <div>
          <div className="text-xs mt-2 grid grid-cols-3 gap-1">
            <p className="font-semibold">Kelas </p>
            <p className="truncate col-span-2">
              {loading ? (
                <span className="w-1/2 h-4 bg-backup block animate-pulse rounded-sm "></span>
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
              <span className="w-1/2 h-4 col-span-2 bg-backup block animate-pulse rounded-sm "></span>
            ) : (
              <span>: {data.jumlahSiswa}</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-xs mt-2 grid grid-cols-3 gap-1">
            <span className="font-semibold">Posisi Kelas</span>
            {loading ? (
              <span className="w-1/2 h-4 col-span-2 bg-backup block animate-pulse rounded-sm "></span>
            ) : (
              <span>: {data.posisi ? data.posisi : ""}</span>
            )}
          </p>
        </div>
      </div> */}
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
          aria-label="tambah nilai"
          // disabled={loading}
          onClick={handleToggleAdd}
          className="flex-between gap-3 min-w-fit disabled:cursor-not-allowed bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          {/* <img src={Student} alt="student" width={15} height={15} /> */}
          Tambah Nilai
        </button>
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        {/* <div className="flex-between px-4 h-14 ">
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
          <div className="flex gap-2">
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
                  onClick={handlePrintScreen}
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
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[430px] flex-center bg-backup animate-pulse overflow-auto ">
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
            isPrint={isPrint}
          />
        )} */}
      </div>
      {/* {isDeleteSiswa && (
        <DeleteModal
          onClose={handleToggleDeleteOne}
          title={"Apakah And yakin ingin menghapus siswa?"}
        />
      )}
      {isEditSiswa && <EditModal onClose={handleToggleEdit} kelas={data} />} */}
      {isAddNilai && <AddModal onClose={handleToggleAdd} />}
      {/* {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )}
      <div style={{ display: "none" }}>
        <PrintComponent ref={componentRef} dataSiswa={dataSiswa} data={data} />
      </div> */}
    </section>
  );
};

export default DataNilaiSiswaPage;
