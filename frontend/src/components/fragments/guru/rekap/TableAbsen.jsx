import React from "react";

const formatTable = (status) => {
  switch (status) {
    case "hadir":
      return <p className="text-xs">H</p>;
    case "izin":
      return <p className="text-xs">I</p>;
  }
};

const TableAbsen = ({ countDay, rekapAbsen }) => {
  return (
    <div className="w-full min-h-[430px] overflow-auto">
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
              <tr key={i}>
                <td
                  scope="row"
                  className="px-4 py-2 border text-xs capitalize text-gray-800"
                >
                  {siswa.nama}
                </td>
                {siswa?.statusPerHari.map((stat, idx) => (
                  <td
                    key={idx}
                    scope="row"
                    className={`${stat === " " && "bg-backup text-white"} ${
                      stat === "hadir" && "bg-green-400 text-white"
                    } ${stat === "izin" && "bg-blue-400 text-white"}  ${
                      stat === "sakit" && "bg-orange-400 text-white"
                    } ${
                      stat === "alfa" && "bg-red-400 text-white"
                    } border text-center`}
                  >
                    {formatTable(stat)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAbsen;
