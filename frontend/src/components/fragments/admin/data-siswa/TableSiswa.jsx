import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const TableSiswa = ({ data }) => {
  const [siswa, setSiswa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const siswaPerPage = 7;

  useEffect(() => {
    setSiswa(data);
  }, [data]);

  const indexOfLastSiswa = currentPage * siswaPerPage;
  const indexOfFirstsiswa = indexOfLastSiswa - siswaPerPage;
  const currentSiswa = siswa.slice(indexOfFirstsiswa, indexOfLastSiswa);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="block min-h-[490px]  shadow-md pb-8">
        <div className="w-full overflow-auto rounded-xl">
          <table className="w-full   text-sm text-left  text-gray-500 ">
            <thead className="text-xs  text-white uppercase bg-neutral">
              <tr>
                <th scope="col" className="px-5 py-3">
                  NIS
                </th>
                <th scope="col" className="px-5 py-3">
                  Nama
                </th>
                <th scope="col" className="px-5 py-3">
                  Category
                </th>
                <th scope="col" className="px-5 py-3">
                  Price
                </th>
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSiswa &&
                currentSiswa.map((siswa) => (
                  <tr
                    key={siswa.nis}
                    className="bg-white hover:bg-gray-100 border-b dark:bg-gray-500 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-5 py-4">Silver</td>
                    <td className="px-5 py-4">Laptop</td>
                    <td className="px-5 py-4">$2999</td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          indexOfLastSiswa={indexOfLastSiswa}
          indexOfFirstsiswa={indexOfFirstsiswa}
          perPage={siswaPerPage}
          totalSiswa={siswa.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

const Pagination = ({
  indexOfLastSiswa,
  indexOfFirstsiswa,
  perPage,
  totalSiswa,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalSiswa / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(1, currentPage - 1);

  const endPage = Math.min(totalPages, currentPage + 1);

  console.log(totalPages, currentPage + 1);

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="w-full px-9  flex-between absolute left-0  py-5 bottom-0 text-gray-500">
      <div className="flex">
        <p className="text-xs">{`Menampilkan ${
          indexOfFirstsiswa + 1
        } - ${indexOfLastSiswa} dari ${totalSiswa} data`}</p>
      </div>
      <div className="flex gap-2 ">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
          disabled={currentPage === 1}
        >
          <ChevronLeft width={20} height={20} />
        </button>

        {visiblePages.map((number) => (
          <div
            key={number}
            className={`page-item ${currentPage === number ? "" : ""}`}
          >
            <button
              onClick={() => paginate(number)}
              className="w-5 text-sm h-5"
            >
              {number}
            </button>
          </div>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
          disabled={currentPage === pageNumbers.length}
        >
          <ChevronRight width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default TableSiswa;
