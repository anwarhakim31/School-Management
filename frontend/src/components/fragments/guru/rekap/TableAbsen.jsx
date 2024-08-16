import React, { useState } from "react";

const formatTable = (status) => {
  switch (status) {
    case "hadir":
      return <p className="text-xs">H</p>;
    case "izin":
      return <p className="text-xs">I</p>;
    case "sakit":
      return <p className="text-xs">S</p>;
    case "alpha":
      return <p className="text-xs">A</p>;
    default:
      return <p className="text-xs">-</p>;
  }
};

const TableAbsen = ({ countDay, rekapAbsen, isPrintModalOpen }) => {
  return (
    <>
      <div className="w-full min-h-[420px] overflow-auto">
        <table className="w-full">
          <thead className="uppercase text-xs bg-neutral text-white">
            <tr>
              <th
                scope="col"
                rowSpan={2}
                className="py-4 px-4 text-center border-r whitespace-nowrap"
              >
                Nama Siswa
              </th>
              <th
                scope="col"
                colSpan={countDay}
                className="py-2 text-center border-b"
              >
                Tanggal
              </th>
              <th scope="col" colSpan={4} className="px-2 text-center border">
                Total
              </th>
            </tr>
            <tr>
              {[...Array(countDay)].fill().map((_, i) => (
                <th key={i + 1} className="py-2 px-1 border w-6">
                  {i + 1}
                </th>
              ))}
              <th className="py-2 px-1 border w-6">H</th>
              <th className="py-2 px-1 border w-6">I</th>
              <th className="py-2 px-1 border w-6">S</th>
              <th className="py-2 px-1 border w-6">A</th>
            </tr>
          </thead>
          <tbody>
            {rekapAbsen &&
              rekapAbsen.map((siswa, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td
                    scope="row"
                    className="px-4 py-2 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.nama}
                  </td>
                  {siswa?.statusPerHari.map((stat, idx) => (
                    <td
                      key={idx}
                      scope="row"
                      className={`${stat === " " && " text-white"} ${
                        stat === "hadir" && "bg-green-400 text-white"
                      } ${stat === "izin" && "bg-blue-400 text-white"}  ${
                        stat === "sakit" && "bg-orange-400 text-white"
                      } ${
                        stat === "alpha" && "bg-red-400 text-white"
                      } border text-center`}
                    >
                      {formatTable(stat)}
                    </td>
                  ))}
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalHadir}
                  </td>
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalIzin}
                  </td>
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalSakit}
                  </td>
                  <td
                    scope="row"
                    className="px-4 border text-xs capitalize text-gray-800 font-medium"
                  >
                    {siswa.totalAlpha}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal Print */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="w-full flex-center">
            <img src="" alt="" />
          </div>

          <div className="w-full h-full p-8 overflow-auto">
            <div className="w-full min-h-[420px]">
              <table className="w-full">
                <thead className="uppercase text-xs bg-neutral text-white">
                  <tr>
                    <th
                      scope="col"
                      rowSpan={2}
                      className="py-4 px-4 text-center border-r whitespace-nowrap"
                    >
                      Nama Siswa
                    </th>
                    <th
                      scope="col"
                      colSpan={countDay}
                      className="py-2 text-center border-b"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      colSpan={4}
                      className="px-2 text-center border"
                    >
                      Total
                    </th>
                  </tr>
                  <tr>
                    {[...Array(countDay)].fill().map((_, i) => (
                      <th key={i + 1} className="py-2 px-1 border w-6">
                        {i + 1}
                      </th>
                    ))}
                    <th className="py-2 px-1 border w-6">H</th>
                    <th className="py-2 px-1 border w-6">I</th>
                    <th className="py-2 px-1 border w-6">S</th>
                    <th className="py-2 px-1 border w-6">A</th>
                  </tr>
                </thead>
                <tbody>
                  {rekapAbsen &&
                    rekapAbsen.map((siswa, i) => (
                      <tr key={i} className="hover:bg-gray-100">
                        <td
                          scope="row"
                          className="px-4 py-2 border text-xs capitalize text-gray-800 font-medium"
                        >
                          {siswa.nama}
                        </td>
                        {siswa?.statusPerHari.map((stat, idx) => (
                          <td
                            key={idx}
                            scope="row"
                            className={`${stat === " " && " text-white"} ${
                              stat === "hadir" && "bg-green-400 text-white"
                            } ${stat === "izin" && "bg-blue-400 text-white"}  ${
                              stat === "sakit" && "bg-orange-400 text-white"
                            } ${
                              stat === "alpha" && "bg-red-400 text-white"
                            } border text-center`}
                          >
                            {formatTable(stat)}
                          </td>
                        ))}
                        <td
                          scope="row"
                          className="px-4 border text-xs capitalize text-gray-800 font-medium"
                        >
                          {siswa.totalHadir}
                        </td>
                        <td
                          scope="row"
                          className="px-4 border text-xs capitalize text-gray-800 font-medium"
                        >
                          {siswa.totalIzin}
                        </td>
                        <td
                          scope="row"
                          className="px-4 border text-xs capitalize text-gray-800 font-medium"
                        >
                          {siswa.totalSakit}
                        </td>
                        <td
                          scope="row"
                          className="px-4 border text-xs capitalize text-gray-800 font-medium"
                        >
                          {siswa.totalAlpha}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableAbsen;
