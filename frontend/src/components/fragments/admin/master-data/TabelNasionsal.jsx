import React from "react";

const TabelNasionsal = () => {
  return (
    <div className="w-full  min-h-[150px] overflow-x-auto rounded-md">
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
        <tbody></tbody>
      </table>
    </div>
  );
};

export default TabelNasionsal;
