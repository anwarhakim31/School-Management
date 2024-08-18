import { formatDate } from "@/util/formatDate";
import React from "react";

const TabelNasionsal = ({ libur }) => {
  return (
    <div className="w-full  min-h-[250px] overflow-x-auto rounded-md">
      <table className="text-center w-full text-gray-500 table-a">
        <thead className="text-xs uppercase text-white bg-neutral">
          <tr>
            <th scope="col" className="px-2 py-4">
              Tanggal
            </th>
            <th scope="col" className="px-3 py-4">
              Keterangan
            </th>
            <th className="opacity-0">Edit</th>
          </tr>
        </thead>
        <tbody>
          {libur &&
            libur.map((free) => (
              <tr key={free.tanggal} className="border-b hover:bg-gray-200">
                <td scope="row" className="w-12 py-4 ">
                  {formatDate(free.tanggal)}
                </td>
                <td scope="row" className="w-12 py-4 ">
                  {free.keterangan}
                </td>
                <td scope="row" className="w-12 py-4 ">
                  <button></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelNasionsal;
