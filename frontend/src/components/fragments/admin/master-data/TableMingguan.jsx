import { Trash2 } from "lucide-react";
import React from "react";

const TableMingguan = ({ loading }) => {
  return (
    <div className="w-full  min-h-[231px] overflow-x-auto rounded-md">
      <table className="text-center w-full text-gray-500 table-a">
        <thead className="text-xs uppercase text-white bg-neutral">
          <tr>
            <th scope="col" className="px-2 py-4">
              Hari
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
          <tr>
            <td scope="row" className="py-4 text-sm font-medium">
              Sabtu
            </td>
            <td scope="row" className="py-4 text-sm font-medium">
              Tidak Aktif
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableMingguan;
