import { setDataDelete } from "@/store/slices/admin-slice";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const TableKelas = ({ data, handleToggleDelete }) => {
  const dispatch = useDispatch();

  const handleDeleteKelas = (kelas) => {
    dispatch(setDataDelete(kelas));
    handleToggleDelete();
  };

  return (
    <div className="block w-full shadow-md pb-16">
      <div className="w-full  min-h-[450px] overflow-auto rounded-xl">
        <table className="text-center w-full text-gray-500">
          <thead className="text-xs text-white bg-neutral">
            <tr>
              <th scope="col" className="px-2 py-3">
                Kelas
              </th>
              <th scope="col" className="px-3 py-3">
                Nama
              </th>
              <th scope="col" className="px-3 py-3">
                Jumlah Siswa
              </th>
              <th scope="col" className="px-6 py-3">
                Wali Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Posisi Kelas
              </th>

              <th className="sr-only"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((kelas) => (
              <tr key={kelas._id} className="hover:bg-gray-100">
                <td
                  scope="row"
                  className="px-2  border-b  border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.kelas}
                </td>
                <td
                  scope="row"
                  className="px-3  border-b  border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.nama}
                </td>
                <td
                  scope="row"
                  className="px-3  border-b  border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.jumlahSiswa} Siswa
                </td>
                <td
                  scope="row"
                  className="px-6  border-b  border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.waliKelas ? (
                    kelas.waliKelas
                  ) : (
                    <span className="text-gray-400">Data Kosong</span>
                  )}
                </td>
                <td
                  scope="row"
                  className="px-6  border-b  border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  {kelas.posisi ? (
                    kelas.posisi
                  ) : (
                    <span className="text-gray-400">Data Kosong</span>
                  )}
                </td>
                <td
                  scope="row"
                  className="px-3  border-b  border-gray-300  py-4 text-xs font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="flex-center gap-4">
                    <button className="w-[20px] h-[20px]  flex-center">
                      <Edit width={18} height={18} className="text-gray-800" />
                    </button>
                    <button
                      className="w-[20px] h-[20px]  flex-center"
                      onClick={() => handleDeleteKelas(kelas)}
                    >
                      <Trash2
                        width={18}
                        height={18}
                        className="text-gray-800"
                      />
                    </button>
                  </div>
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
