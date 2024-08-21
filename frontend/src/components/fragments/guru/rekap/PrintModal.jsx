import React from "react";
import logo from "../../../../assets/Schoolarcy (2).webp";

const PrintComponent = React.forwardRef(
  ({ rekapAbsen, countDay, kelas, month, year }, ref) => {
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

    return (
      <div ref={ref} className="p-4">
        <div className="w-full flex-center">
          <img src={logo} alt="logo" width={200} height={200} />
        </div>
        <div className="w-full h-max p-8">
          <div className="w-full ">
            <table className=" w-full">
              <thead className="uppercase text-xs bg-gradient-to-r from-[#12a7e3] to-neutral text-white">
                <tr>
                  <th
                    colSpan={countDay + 5}
                    scope="col"
                    className="py-4 border-b"
                  >
                    ABSENSI KELAS {kelas?.grade} {kelas?.nama}{" "}
                    {new Date(year, month + 1, 0).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {year}
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    rowSpan={2}
                    className="py-4 w-28 text-center border-r whitespace-nowrap"
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
                    className="px-2 text-center border border-r-0"
                  >
                    Total
                  </th>
                </tr>
                <tr>
                  {[...Array(countDay)].map((_, i) => (
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
                      <td className="px-4  border text-xs capitalize text-gray-800 font-medium">
                        {siswa.nama}
                      </td>
                      {siswa.statusPerHari.map((stat, idx) => (
                        <td
                          key={idx}
                          className={`${stat === " " && " text-white"} ${
                            stat === "hadir" && "bg-green-400 text-white"
                          } ${stat === "izin" && "bg-blue-400 text-white"} ${
                            stat === "sakit" && "bg-orange-400 text-white"
                          } ${
                            stat === "alpha" && "bg-red-400 text-white"
                          } border text-center`}
                        >
                          {formatTable(stat)}
                        </td>
                      ))}
                      <td className="px-4  border text-xs capitalize text-gray-800 font-medium">
                        {siswa.totalHadir}
                      </td>
                      <td className="px-4  border text-xs capitalize text-gray-800 font-medium">
                        {siswa.totalIzin}
                      </td>
                      <td className="px-4  border text-xs capitalize text-gray-800 font-medium">
                        {siswa.totalSakit}
                      </td>
                      <td className="px-4  border text-xs capitalize text-gray-800 font-medium">
                        {siswa.totalAlpha}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

PrintComponent.displayName = "PrintComponent";

export default PrintComponent;
