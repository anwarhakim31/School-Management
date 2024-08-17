import { setDataDelete } from "@/store/slices/admin-slice";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TableUmum = ({ data, handleToggleDelete, handleEditAjaran, loading }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  const lastIndexajaran = perPage * currentPage;
  const firstIndexajaran = lastIndexajaran - perPage;

  const dataSlice = data?.slice(firstIndexajaran, lastIndexajaran);

  const handleDeleteajaran = (ajaran) => {
    dispatch(setDataDelete(ajaran));
    handleToggleDelete();
  };

  const handlePaginate = (index) => setCurrentPage(index);
  useEffect(() => {
    if (currentPage > 1 && dataSlice.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [dataSlice]);

  return (
    <div className="block w-full relative  shadow-md pb-[3.5rem]">
      <div className="w-full  min-h-[231px] overflow-x-auto rounded-md">
        <table className="text-center w-full text-gray-500 table-a">
          <thead className="text-xs uppercase text-white bg-neutral">
            <tr>
              <th scope="col" className="px-2 py-4">
                Tahun Ajaran
              </th>
              <th scope="col" className="px-3 py-4">
                Status
              </th>
              <th className="opacity-0">Edit</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="w-full h-full">
                <td
                  colSpan="7"
                  className="px-2 py-4  border-gray-300 text-xs text-gray800 whitespace-nowrap h-[220px]"
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
                  className="px-2 py-4  border-gray-300 text-xs text-gray-900 whitespace-nowrap h-[220px]"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
            {dataSlice &&
              !loading &&
              dataSlice.map((ajaran) => (
                <tr
                  key={ajaran._id}
                  className={`${
                    dataSlice.length === 7 && "last:border-none"
                  } hover:bg-gray-100 border-b  `}
                >
                  <td
                    scope="row"
                    className="px-2    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    {ajaran.ajaran}
                  </td>
                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    <button
                      onClick={() => handleEditAjaran(ajaran._id)}
                      disabled={ajaran.status}
                      className={`${
                        ajaran.status ? "bg-neutral1" : "bg-neutral2"
                      }  text-white w-20 py-1.5 rounded-md font-medium`}
                    >
                      {ajaran.status ? "Aktif" : "Non Aktif"}
                    </button>
                  </td>

                  <td
                    scope="row"
                    className="px-3    border-gray-300  py-4 text-xs text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex-center gap-4">
                      <button
                        title="Hapus"
                        className="w-[20px] h-[20px]  flex-center"
                        onClick={() => handleDeleteajaran(ajaran)}
                      >
                        <Trash2
                          width={18}
                          strokeWidth={1}
                          height={18}
                          className="text-gray-800 hover:text-neutral2  transition-all duration-300"
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
        totalajaran={data.length}
        perPage={perPage}
        currentPage={currentPage}
        firstIndexajaran={firstIndexajaran}
        lastIndexajaran={lastIndexajaran}
        paginate={handlePaginate}
        loading={loading}
        dataSlice={dataSlice}
      />
    </div>
  );
};

const Pagination = ({
  loading,
  totalajaran,
  perPage,
  currentPage,
  firstIndexajaran,
  lastIndexajaran,
  paginate,
  dataSlice,
}) => {
  const pageNumber = [];

  const totalPage = Math.ceil(totalajaran / perPage);

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

  console.log(totalPage);

  const visiblePage = pageNumber.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      {!loading && (
        <>
          <div className="h-6 flex-center">
            <p className="text-xs">{`Menampilkan ${
              dataSlice.length === 0 ? 0 : firstIndexajaran + 1
            } - ${
              firstIndexajaran + dataSlice.length
            } dari ${totalajaran} Data`}</p>
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

export default TableUmum;
