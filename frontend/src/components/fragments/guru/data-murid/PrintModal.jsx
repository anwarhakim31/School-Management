import React from "react";
import logo from "../../../../assets/Schoolarcy (2).webp";
import { formatDate } from "@/util/formatDate";

const PrintComponent = React.forwardRef(({ data, dataSiswa }, ref) => {
  return (
    <div ref={ref} className="p-4">
      <div className="w-full flex-center">
        <img src={logo} alt="logo" width={200} height={200} />
      </div>
      <div className="w-full h-max p-8">
        <table className="w-full    text-left  text-gray-500 border">
          <thead className="text-xs text-left  text-white uppercase bg-gradient-to-r from-[#12a7e3] to-neutral">
            <tr>
              <th
                scope="col"
                colSpan={9}
                className="px-3 py-2 text-center border-b border-white"
              >
                DATA SISWA {data.kelas} {data.nama}
              </th>
            </tr>
            <tr className="border">
              <th scope="col" className="px-3 py-2  border ">
                NIS
              </th>

              <th scope="col" className="pl-1 pr-4  py-2 border">
                Nama
              </th>
              <th scope="col" className=" py-2 whitespace-nowrap border px-1">
                Jenis Kelamin
              </th>
              <th scope="col" className=" py-2 whitespace-nowrap border px-1">
                Tempat Lahir
              </th>
              <th scope="col" className=" py-2 whitespace-nowrap border px-1">
                Tanggal Lahir
              </th>
              <th scope="col" className=" py-2 whitespace-nowrap border px-1">
                Agama
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-center whitespace-nowrap border"
              >
                Tahun Masuk
              </th>
              <th scope="col" className="px-2 py-2 border">
                Alamat
              </th>
              <th scope="col" className="py-2 text-center border">
                Kontak
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSiswa && dataSiswa.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="px-2 py-2 border-gray-300 text-xs font-medium text-gray-900 h-[350px] whitespace-nowrap"
                >
                  <div className="flex justify-center w-full">
                    Tidak ada data
                  </div>
                </td>
              </tr>
            )}
            {dataSiswa &&
              dataSiswa.length !== 0 &&
              [...dataSiswa].reverse().map((siswa, i) => (
                <tr key={siswa.nis} className={` hover:bg-gray-100  `}>
                  <td
                    scope="row"
                    className="px-3 py-1 text-xs font-normal text-gray-900 whitespace-nowrap border"
                  >
                    {siswa.nis}
                  </td>
                  <td
                    scope="row"
                    className="pl-1 pr-4 py-1  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                  >
                    {siswa.nama}
                  </td>
                  <td
                    scope="row"
                    className="py-1 text-xs font-normal text-gray-900 whitespace-nowrap border px-1"
                  >
                    {siswa.jenisKelamin}
                  </td>
                  <td
                    scope="row"
                    className="py-1 text-xs font-normal text-gray-900 whitespace-nowrap border px-1"
                  >
                    {siswa.tempatLahir}
                  </td>
                  <td
                    scope="row"
                    className="py-1 text-xs font-normal text-gray-900 whitespace-nowrap border px-1"
                  >
                    {formatDate(siswa.tanggalLahir)}
                  </td>

                  <td
                    scope="row"
                    className="py-1 text-xs font-normal text-gray-900 whitespace-nowrap border px-1"
                  >
                    {siswa.agama}
                  </td>
                  <td
                    scope="row"
                    className=" py-1 px-3 text-xs text-center font-normal text-gray-900 whitespace-nowrap border"
                  >
                    {siswa.tahunMasuk}
                  </td>
                  <td
                    scope="row"
                    className="px-2 py-1   overflow-hidden line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap"
                  >
                    {siswa.alamat ? (
                      `${siswa.alamat}`
                    ) : (
                      <span className="text-gray-700 font-bold">
                        Data Kosong
                      </span>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="py-1 text-center  text-xs font-normal text-gray-900 whitespace-nowrap border"
                  >
                    {siswa.phone}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

PrintComponent.displayName = "PrintComponent";

export default PrintComponent;
