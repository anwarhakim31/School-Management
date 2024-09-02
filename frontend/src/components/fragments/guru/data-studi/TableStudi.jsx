import { Checkbox } from "@/components/ui/checkbox";
import {
  setDataDelete,
  setDataDeleteMany,
  setDataEdit,
} from "@/store/slices/admin-slice";
import { ChevronLeft, ChevronRight, Edit, Trash, Trash2 } from "lucide-react";
import { space } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TableStudi = ({
  data,
  handleToggleDelete,
  handleToggleEdit,
  loading,
  allChecked,
  setAllChecked,
}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataChecked, setDataChecked] = useState([]);
  const perPage = 6;

  const lastIndexNilai = perPage * currentPage;
  const firstIndexNilai = lastIndexNilai - perPage;

  const dataSlice = data?.slice(firstIndexNilai, lastIndexNilai);

  const handleDeleteNilai = (Nilai) => {
    dispatch(setDataDelete(Nilai));
    handleToggleDelete();
  };

  const handleEditNilai = (Nilai) => {
    dispatch(setDataEdit(Nilai));
    handleToggleEdit();
  };

  const handlePaginate = (index) => setCurrentPage(index);
  useEffect(() => {
    if (currentPage > 1 && dataSlice?.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [dataSlice]);

  const handleCheckboxChange = (checked, nilai) => {
    if (checked) {
      setDataChecked((prev) => [...prev, nilai._id]);
      dispatch(setDataDeleteMany([...dataChecked, nilai._id]));
    } else {
      setDataChecked((prev) => prev.filter((id) => id !== nilai._id));
      dispatch(setDataDeleteMany(dataChecked.filter((id) => id !== nilai._id)));
    }
  };

  const handleCheckboxAll = (checked) => {
    setAllChecked(!allChecked);

    if (checked) {
      setDataChecked(dataSlice.map((nilai) => nilai._id));
      dispatch(setDataDeleteMany(dataSlice.map((nilai) => nilai._id)));
    } else {
      setDataChecked([]);
      dispatch(setDataDeleteMany([]));
    }
  };

  return (
    <div className="block w-full relative  shadow-md pb-[3.5rem]">
      <div className="w-full  min-h-[396px] overflow-x-auto ">
        <table className="text-center w-full text-gray-500 ">
          <thead className="text-xs uppercase text-white bg-neutral">
            <tr>
              <th
                scope="col"
                className="px-5 py-4 flex items-center justify-center"
              >
                <Checkbox
                  type="checkbox"
                  checked={allChecked}
                  onCheckedChange={handleCheckboxAll}
                  className={
                    "min-h-4 min-w-3 border-white data-[state=checked]:bg-gray-800"
                  }
                />
              </th>
              <th
                scope="col"
                className="w-[25%] px-10 py-4 text-left whitespace-nowrap  "
              >
                Nama Siswa
              </th>

              <th scope="col" className="px-5 py-4 w-[15%] ">
                Pertemuan
              </th>
              <th
                scope="col"
                className="px-5 w-[15%]  whitespace-nowrap  py-4 text-center"
              >
                Nilai
              </th>
              <th
                scope="col"
                className="px-5 w-[20%]  whitespace-nowrap  py-4 text-center"
              >
                Tahun Ajaran
              </th>
              <th
                scope="col"
                className="px-5 w-[20%]  whitespace-nowrap  py-4 text-center"
              >
                Semester
              </th>
              <th className="opacity-0 px-3 ">Edit</th>
            </tr>
          </thead>
          <tbody>
            {dataSlice && !loading && dataSlice.length === 0 && (
              <tr className="w-full h-full">
                <td
                  colSpan="10"
                  className="px-2 py-4  border-gray-300 text-xs text-gray-900 whitespace-nowrap h-[290px]"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
            {dataSlice &&
              !loading &&
              dataSlice.map((Nilai) => (
                <tr
                  key={Nilai._id}
                  className={`${
                    dataSlice.length === 7 && "last:border-none"
                  } hover:bg-gray-100 border-b  `}
                >
                  <td scope="row" className="px-3 py-3 relative">
                    <Checkbox
                      type="checkbox"
                      name=""
                      checked={dataChecked.includes(Nilai._id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(checked, Nilai)
                      }
                      id=""
                      className={
                        "w-4 h-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  data-[state=checked]:bg-gray-800"
                      }
                    />
                  </td>
                  <td
                    scope="row"
                    className="px-10  text-left  border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {Nilai.siswa.nama}
                  </td>
                  <td
                    scope="row"
                    className="px-5    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {Nilai.pertemuan}
                  </td>
                  <td
                    scope="row"
                    className="px-5    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {Nilai.nilai}
                  </td>
                  <td
                    scope="row"
                    className="px-3  text-center border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {Nilai.tahunAjaran}
                  </td>
                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {Nilai.semester}
                  </td>

                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex-center gap-4">
                      <button
                        title="Edit"
                        onClick={() => handleEditNilai(Nilai)}
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
                        onClick={() => handleDeleteNilai(Nilai)}
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
        totalNilai={data?.length}
        perPage={perPage}
        currentPage={currentPage}
        firstIndexNilai={firstIndexNilai}
        lastIndexNilai={lastIndexNilai}
        paginate={handlePaginate}
        loading={loading}
        dataSlice={dataSlice}
      />
    </div>
  );
};

const Pagination = ({
  loading,
  totalNilai,
  perPage,
  currentPage,
  firstIndexNilai,
  lastIndexNilai,
  paginate,
  dataSlice,
}) => {
  const pageNumber = [];

  const totalPage = Math.ceil(totalNilai / perPage);

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

  const visiblePage = pageNumber?.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      {!loading && (
        <>
          <div className="h-6 flex-center">
            <p className="text-xs">{`Menampilkan ${
              dataSlice?.length === 0 ? 0 : firstIndexNilai + 1
            } - ${
              firstIndexNilai + dataSlice?.length
            } dari ${totalNilai} Data`}</p>
          </div>
          {pageNumber?.length !== 0 && (
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

export default TableStudi;
