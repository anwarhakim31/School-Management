import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TableSiswa = ({
  data,
  limit,
  page,
  totalPage,
  totalSiswa,
  handlePagination,
}) => {
  const lastOfIndexSiswa = page * limit;
  const firstOfindexSiswa = lastOfIndexSiswa - limit;

  const HandleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("Succes mengambil data");
    });
  };

  console.log(data);

  return (
    <>
      <div className="block w-full shadow-md pb-[4rem]">
        <div className="w-full min-h-[420px]  overflow-auto rounded-xl">
          <table className="w-full    text-center  text-gray-500 ">
            <thead className="text-xs  text-white uppercase bg-neutral">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-4 flex items-center justify-center"
                >
                  <Checkbox
                    type="checkbox"
                    name=""
                    id=""
                    className={
                      "min-h-4 min-w-3  data-[state=checked]:bg-gray-800"
                    }
                  />
                </th>
                <th scope="col" className="px-3 py-4">
                  NIS
                </th>
                <th scope="col" className="px-4 py-4">
                  Nama
                </th>
                <th scope="col" className="px-4 py-4 whitespace-nowrap">
                  Jenis Kelamin
                </th>
                <th scope="col" className=" py-4 whitespace-nowrap">
                  Tahun Masuk
                </th>
                <th scope="col" className="px-5 py-4">
                  Alamat
                </th>
                <th scope="col" className="py-4 px-5">
                  Kontak
                </th>
                <th scope="Kelas" className="px-4 py-4">
                  Kelas
                </th>
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((siswa) => (
                  <tr
                    key={siswa.nis}
                    className={`${
                      data.length === 7 && "last:border-none"
                    } hover:bg-gray-100 border-b  `}
                  >
                    <td scope="row" className="px-3 py-3 relative">
                      <Checkbox
                        type="checkbox"
                        name=""
                        id=""
                        className={
                          "w-4 h-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  data-[state=checked]:bg-gray-800"
                        }
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.nis}
                    </td>

                    <td
                      scope="row"
                      className=" px-4 py-4 overflow-hidden line-clamp-1 text-xs font-medium text-gray-900 whitespace-nowrap  "
                    >
                      {siswa.nama}
                    </td>
                    <td
                      scope="row"
                      className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.jenisKelamin}
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
                    <td
                      scope="row"
                      className="py-4  text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex-center space-x-2">
                        <div
                          className="cursor-pointer flex-center bg-backup text-neutral w-[20px] h-[20px] rounded-full"
                          title={siswa.phone}
                          onClick={() => HandleCopyText(siswa.phone)}
                        >
                          <Phone width={12} height={12} />
                        </div>
                        <div
                          className="cursor-pointer flex-center bg-backup  text-neutral w-[20px] h-[20px] rounded-full"
                          title={siswa.email}
                          onClick={() => HandleCopyText(siswa.email)}
                        >
                          <Mail width={12} height={12} />
                        </div>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className=" py-4 max-w-full flex-center text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      {siswa.kelas.kelas} {siswa.kelas.nama}
                    </td>
                    <td
                      scope="row"
                      className="px-3    border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex-center gap-4">
                        <button
                          title="Edit"
                          onClick={() => handleEditKelas(kelas)}
                          className="w-[20px] h-[20px]  flex-center"
                        >
                          <Edit
                            width={18}
                            height={18}
                            className="text-gray-800  hover:text-neutral1 transition-all duration-300"
                          />
                        </button>
                        <button
                          title="Hapus"
                          className="w-[20px] h-[20px]  flex-center"
                          onClick={() => handleDeleteKelas(kelas)}
                        >
                          <Trash
                            width={18}
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
          lastOfIndexSiswa={lastOfIndexSiswa}
          firstOfindexSiswa={firstOfindexSiswa}
          limit={limit}
          page={page}
          totalPage={totalPage}
          data={data}
          totalSiswa={totalSiswa}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
};

const Pagination = ({
  lastOfIndexSiswa,
  firstOfindexSiswa,
  limit,
  data,
  page,
  totalSiswa,
  handlePagination,
  totalPage,
}) => {
  const pageNumber = [];
  const selectRow = [7, 14, 21, 28];

  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  const startPage =
    page === totalPage ? Math.max(1, page - 2) : Math.max(1, page - 1);

  const endPage =
    page === 1 ? Math.min(totalPage, page + 2) : Math.min(totalPage, page + 1);

  const visiblePage = pageNumber.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      <div className="flex">
        <p className="text-[10px] sm:text-xs">{`Menampilkan ${
          firstOfindexSiswa + 1
        } - ${
          page === totalPage ? totalSiswa : firstOfindexSiswa + lastOfIndexSiswa
        } dari ${totalSiswa} data`}</p>
      </div>
      <div className="flex space-x-4">
        <div>
          <select
            name="perpage"
            id="perpage"
            className="border border-gray-400 text-sm rounded-sm outline-neutral flex"
            onChange={(e) => handlePagination(e.target.value)}
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
            onClick={() => handlePagination(page - 1)}
            className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
            disabled={page === 1}
          >
            <ChevronLeft width={20} height={20} />
          </button>

          {visiblePage.map((number) => (
            <div
              key={number}
              className={`page-item ${page === number ? "" : ""}`}
            >
              <button
                onClick={() => handlePagination(number)}
                className={`${
                  number === page &&
                  "rounded-full border-b shadow border-gray-500"
                } w-5 text-sm h-5`}
              >
                {number}
              </button>
            </div>
          ))}

          <button
            onClick={() => handlePagination(page + 1)}
            className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
            disabled={page === pageNumber.length}
          >
            <ChevronRight width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSiswa;
