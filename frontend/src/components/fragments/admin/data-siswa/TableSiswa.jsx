import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TableSiswa = ({ data }) => {
  const [siswa, setSiswa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [siswaPerPage, setSiswaPerPage] = useState(7);

  console.log(siswaPerPage);

  useEffect(() => {
    setSiswa(data);
  }, [data]);

  const indexOfLastSiswa = currentPage * siswaPerPage;
  const indexOfFirstsiswa = indexOfLastSiswa - siswaPerPage;
  const currentSiswa = siswa.slice(indexOfFirstsiswa, indexOfLastSiswa);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const setPerPage = (perPage) => setSiswaPerPage(perPage);

  const HandleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("Succes mengambil data");
    });
  };

  return (
    <>
      <div className="block w-full shadow-md pb-16">
        <div className="w-full min-h-[450px]  overflow-auto rounded-xl">
          <table className="w-full   text-sm text-left  text-gray-500 ">
            <thead className="text-xs  text-white uppercase bg-neutral">
              <tr>
                <th scope="col" className="px-4 py-3">
                  NIS
                </th>
                <th scope="col" className="px-5 py-3">
                  Nama
                </th>
                <th scope="col" className=" py-3">
                  Tahun Masuk
                </th>
                <th scope="col" className="px-5 py-3">
                  Alamat
                </th>
                <th scope="col" className="py-3">
                  Kontak
                </th>
                <th scope="Kelas" className="px-5 py-3">
                  Kelas
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
                    className="bg-white hover:bg-gray-100 border-b "
                  >
                    <td
                      scope="row"
                      className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.nis}
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-4  overflow-hidden line-clamp-1 text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.nama}
                    </td>
                    <td
                      scope="row"
                      className=" py-4  text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.tahunMasuk}
                    </td>
                    <td
                      scope="row"
                      className="px-4 py-4   overflow-hidden line-clamp-1 text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.alamat}
                    </td>
                    {/* <td
                      scope="row"
                      className="py-4  text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex space-x-2">
                        <div
                          className="cursor-pointer flex-center bg-backup text-neutral w-5 h-5 rounded-full"
                          title={siswa.kontak[0].phone}
                          onClick={() => HandleCopyText(siswa.kontak[0].phone)}
                        >
                          <Phone width={12} height={12} />
                        </div>
                        <div
                          className="cursor-pointer flex-center bg-backup  text-neutral w-5 h-5 rounded-full"
                          title={siswa.kontak[0].email}
                          onClick={() => HandleCopyText(siswa.kontak[0].email)}
                        >
                          <Mail width={12} height={12} />
                        </div>
                      </div>
                    </td> */}
                    <td
                      scope="row"
                      className=" py-4 max-w-full text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.kelas}
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
          setPerPage={setPerPage}
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
  setPerPage,
}) => {
  const pageNumbers = [];
  const selectRow = [7, 14, 21, 28];
  const totalPages = Math.ceil(totalSiswa / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(1, currentPage - 1);

  const endPage = Math.min(totalPages, currentPage + 1);

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="w-full px-4  flex-between absolute left-0 py-2 sm:py-4 bottom-1 select-none text-gray-500">
      <div className="flex">
        <p className="text-[10px] sm:text-xs">{`Menampilkan ${
          indexOfFirstsiswa + 1
        } - ${
          indexOfLastSiswa > totalSiswa ? totalSiswa : indexOfLastSiswa
        } dari ${totalSiswa} data`}</p>
      </div>
      <div className="flex space-x-4">
        <div>
          <select
            name="perpage"
            id="perpage"
            className="border border-gray-400 text-sm rounded-sm outline-neutral"
            onChange={(e) => setPerPage(e.target.value)}
          >
            {selectRow.map((item) => (
              <option key={item} value={item} className="text-[14px] ">
                {item}
              </option>
            ))}
          </select>
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
                className={`${
                  number === currentPage &&
                  "rounded-full border-b shadow border-gray-500"
                } w-5 text-sm h-5`}
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
    </div>
  );
};

export default TableSiswa;
