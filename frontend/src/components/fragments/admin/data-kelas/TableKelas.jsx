import { setDataDelete, setDataEdit } from "@/store/slices/admin-slice";
import { ChevronLeft, ChevronRight, Edit, Trash, Trash2 } from "lucide-react";
import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TableKelas = ({
  data,
  handleToggleDelete,
  handleToggleEdit,
  loading,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const lastIndexKelas = perPage * currentPage;
  const firstIndexKelas = lastIndexKelas - perPage;

  const dataSlice = data.slice(firstIndexKelas, lastIndexKelas);

  const handleDeleteKelas = (kelas) => {
    dispatch(setDataDelete(kelas));
    handleToggleDelete();
  };

  const handleEditKelas = (kelas) => {
    dispatch(setDataEdit(kelas));
    handleToggleEdit();
  };

  const handlePaginate = (index) => setCurrentPage(index);
  useEffect(() => {
    if (currentPage > 1 && dataSlice.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [dataSlice]);

  return (
    <div className="block w-full relative  shadow-md pb-[3.5rem]">
      <div className="w-full  min-h-[340px] overflow-x-auto rounded-md">
        <table className="text-center w-full text-gray-500 table-a">
          <thead className="text-xs uppercase text-white bg-neutral">
            <tr>
              <th scope="col" className="px-2 py-4">
                Kelas
              </th>
              <th scope="col" className="px-3 py-4">
                Nama
              </th>
              <th scope="col" className="px-3 py-4 whitespace-nowrap">
                Jumlah Siswa
              </th>
              <th
                scope="col"
                className="px-6 py-4  whitespace-nowrap text-left"
              >
                Wali Kelas
              </th>
              <th
                scope="col"
                className="px-6  whitespace-nowrap  py-4 text-left"
              >
                Posisi Kelas
              </th>

              <th className="opacity-0 px-3 ">Edit</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="w-full h-full">
                <td
                  colSpan="7"
                  className="px-2 py-4  border-gray-300 text-xs text-gray800 whitespace-nowrap h-[350px]"
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="w-8 h-8 block mb-2 animate-spin rounded-full border-4 border-t-gray-800 border-gray-300"></span>
                    <span>Loading</span>
                  </div>
                </td>
              </tr>
            )}
            {dataSlice && !loading && dataSlice.length === 0 && (
              <tr className="w-full h-full">
                <td
                  colSpan="10"
                  className="px-2 py-4  border-gray-300 text-xs text-gray-900 whitespace-nowrap h-[350px]"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
            {dataSlice &&
              !loading &&
              [...dataSlice].map((kelas) => (
                <tr
                  key={kelas._id}
                  className={`${
                    dataSlice.length === 7 && "last:border-none"
                  } hover:bg-gray-100 border-b  `}
                >
                  <td
                    scope="row"
                    className="px-2    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {kelas.kelas}
                  </td>
                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {kelas.nama}
                  </td>
                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {kelas.jumlahSiswa} Siswa
                  </td>
                  <td
                    scope="row"
                    className="px-6    border-gray-300 text-left py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {kelas.waliKelas ? (
                      kelas.waliKelas.nama
                    ) : (
                      <span className="text-gray-800 font-bold">
                        Data Kosong
                      </span>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="px-6    border-gray-300 text-left  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {kelas.posisi ? (
                      kelas.posisi
                    ) : (
                      <span className="text-gray-800 font-bold">
                        Data Kosong
                      </span>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex-center gap-4">
                      <button
                        title="Edit"
                        onClick={() => handleEditKelas(kelas)}
                        className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral1 flex-center transition-all duration-300"
                      >
                        <Edit
                          width={15}
                          strokeWidth={1}
                          height={15}
                          className="text-gray-800  group-hover:text-neutral1 transition-all duration-300"
                        />
                      </button>
                      <button
                        title="Hapus"
                        className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral2 flex-center transition-all duration-300"
                        onClick={() => handleDeleteKelas(kelas)}
                      >
                        <Trash
                          width={15}
                          strokeWidth={1}
                          height={15}
                          className="text-gray-800 group-hover:text-neutral2  transition-all duration-300"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalKelas={data.length}
        perPage={perPage}
        currentPage={currentPage}
        firstIndexKelas={firstIndexKelas}
        lastIndexKelas={lastIndexKelas}
        paginate={handlePaginate}
        loading={loading}
        dataSlice={dataSlice}
      />
    </div>
  );
};

const Pagination = ({
  loading,
  totalKelas,
  perPage,
  currentPage,
  firstIndexKelas,
  lastIndexKelas,
  paginate,
  dataSlice,
}) => {
  const pageNumber = [];

  const totalPage = Math.ceil(totalKelas / perPage);

  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  const startPage =
    currentPage === totalPage
      ? Math.max(1, currentPage - 2)
      : Math.max(1, currentPage - 1);
  const endPage =
    currentPage === 1
      ? Math.min(totalPage, currentPage + 2)
      : Math.min(totalPage, currentPage + 1);

  const visiblePage = pageNumber.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      {!loading && (
        <>
          <div className="h-6 flex-center">
            <p className="text-xs">{`Menampilkan ${
              dataSlice.length === 0 ? 0 : firstIndexKelas + 1
            } - ${
              firstIndexKelas + dataSlice.length
            } dari ${totalKelas} Data`}</p>
          </div>
          {pageNumber.length !== 0 && (
            <div className="flex gap-2 ">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
                disabled={currentPage === 1}
              >
                <ChevronLeft width={20} height={20} />
              </button>

              {visiblePage.map((number) => (
                <div key={number}>
                  <button
                    onClick={() => paginate(number)}
                    className={`${
                      number === currentPage &&
                      "rounded-full border-b  shadow border-gray-400"
                    } w-5 text-sm h-5`}
                  >
                    {number}
                  </button>
                </div>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
                disabled={currentPage === pageNumber.length}
              >
                <ChevronRight width={20} height={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableKelas;
