import React from "react";
import { Fragment } from "react";

const TableNilai = ({ data }) => {
  return (
    <div className="block w-full shadow-md pb-[3.5rem]">
      <div className="w-full min-h-[450px]  overflow-auto ">
        <table className="w-full    text-left  text-gray-500 ">
          <thead className="text-xs text-left  text-white uppercase bg-neutral">
            <tr>
              <th scope="col" className="px-10 py-4  whitespace-nowrap">
                Mata Pelajaran
              </th>

              <th scope="col" className="px-10 pr-4  py-4  whitespace-nowrap">
                Nama Siswa
              </th>
              <th
                scope="col"
                className="px-5 py-4 text-center whitespace-nowrap"
              >
                Kategori
              </th>
              <th scope="col" className="px-3 py-4 text-center ">
                Nilai
              </th>
              <th
                scope="col"
                className="px-5 py-4 text-center  whitespace-nowrap"
              >
                Tahun Ajaran
              </th>
              <th scope="col" className="py-4 text-center ">
                Semester
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {data && data.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="px-2 py-4 border-gray-300 text-xs font-medium text-gray-900 h-[350px] whitespace-nowrap"
                >
                  <div className="flex justify-center w-full">
                    Tidak ada data
                  </div>
                </td>
              </tr>
            )} */}
            {data &&
              data.length !== 0 &&
              data.map((nilai, i) => (
                <tr key={nilai._id} className={` hover:bg-gray-100 border-b  `}>
                  <td
                    scope="row"
                    className="px-10 py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                  >
                    {nilai.mataPelajaran.kode} {nilai.mataPelajaran.nama}
                  </td>

                  <td
                    scope="row"
                    className="px-10 pr-4 py-5  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                  >
                    {nilai.siswa.nama}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-5 text-xs font-normal text-center text-gray-900 whitespace-nowrap "
                  >
                    {nilai.kategori}
                  </td>
                  <td
                    scope="row"
                    className=" py-4 px-3 text-xs text-center font-normal text-gray-900 whitespace-nowrap "
                  >
                    {nilai.nilai}
                  </td>
                  <td
                    scope="row"
                    className="px-5 py-5 text-center  overflow-hidden line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap "
                  >
                    {nilai.tahunAjaran}
                  </td>
                  <td
                    scope="row"
                    className="py-4 text-center  text-xs font-normal text-gray-900 whitespace-nowrap "
                  >
                    {nilai.semester}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNilai;
