import React from "react";

const TableKelas = ({ data }) => {
  return (
    <div className="block w-full shadow-md pb-16">
      <div className="w-full  min-h-[450px] overflow-auto rounded-xl">
        <table className="text-center w-full text-gray-500">
          <thead className="text-xs text-white bg-neutral">
            <tr>
              <th scope="col" className="px-6 py-3">
                Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Wali Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Posisi Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Jumlah Siswa
              </th>
              <th className="sr-only"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((kelas) => (
              <tr key={kelas._id}>
                <td
                  scope="row"
                  className="px-3  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.kelas}
                </td>
                <td
                  scope="row"
                  className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.nama}
                </td>
                <td
                  scope="row"
                  className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                ></td>
                <td
                  scope="row"
                  className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                ></td>
                <td
                  scope="row"
                  className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                ></td>
                <td
                  scope="row"
                  className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableKelas;
