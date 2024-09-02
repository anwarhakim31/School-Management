import React, { useMemo } from "react";
import { Fragment } from "react";

const TableNilaiPertemuan = ({ data, totalPertemuan }) => {
  return (
    <div className="block w-full shadow-md">
      <div className="w-full min-h-[calc(80vh-160px)]  overflow-auto ">
        <table className="w-full border-collapse border  border-white  text-left text-gray-500 ">
          <thead className="text-xs text-left text-white uppercase bg-neutral">
            <tr>
              <th
                scope="col"
                rowSpan={2}
                className="px-10 w-[30%] py-2 border text-center whitespace-nowrap"
              >
                Nama Siswa
              </th>

              <th
                scope="col"
                colSpan={totalPertemuan + 1}
                className="px-4 pr-4 py-2 text-center border whitespace-nowrap"
              >
                Pertemuan
              </th>
            </tr>
            <tr>
              {Array(totalPertemuan)
                .fill()
                .map((_, i) => (
                  <th
                    key={i + 1}
                    scope="col"
                    className="px-4 text-center border"
                  >
                    {i + 1}
                  </th>
                ))}
              <th scope="col" className="px-4 text-center border">
                U
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data?.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="px-2 py-4  text-xs font-medium text-gray-900 h-[350px]  whitespace-nowrap"
                >
                  <div className="flex justify-center w-full">
                    Tidak ada data
                  </div>
                </td>
              </tr>
            )}
            {data &&
              data.map((nilai) => (
                <tr key={nilai.id}>
                  <td
                    scope="row"
                    className="px-4 py-2 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {nilai.nama}
                  </td>
                  {nilai?.dataNilai?.map((data, i) => (
                    <td
                      key={i + 1}
                      scope="row"
                      className="px-2 py-2 border text-center text-xs capitalize text-gray-800 font-medium"
                    >
                      {data}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNilaiPertemuan;
