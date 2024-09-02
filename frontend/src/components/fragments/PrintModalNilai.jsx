import React, { Fragment, useMemo } from "react";
import logo from "../../assets/Schoolarcy (2).webp";

const PrintComponentNilai = React.forwardRef(
  ({ dataMapel, kelas, tahunAjaran, semester, data }, ref) => {
    const siswas = useMemo(() => {
      return Array.from(new Set(data.map((nilai) => nilai.siswa._id)))
        .map((siswaId) => {
          return data.find((nilai) => nilai.siswa._id === siswaId).siswa;
        })
        .sort((a, b) => a.nama.localeCompare(b.nama));
    }, [data]);

    const siswaWithAverage = useMemo(() => {
      return siswas.map((siswa) => {
        const nilaiTotal = dataMapel.reduce((acc, mapel) => {
          const nilaiTugas = data.find(
            (nilai) =>
              nilai.siswa._id === siswa._id &&
              nilai.mataPelajaran.kode === mapel &&
              nilai.kategori === "tugas"
          );

          const nilaiUjian = data.find(
            (nilai) =>
              nilai.siswa._id === siswa._id &&
              nilai.mataPelajaran.kode === mapel &&
              nilai.kategori === "ujian"
          );

          const tugasScore = nilaiTugas ? nilaiTugas.nilai : 0;
          const ujianScore = nilaiUjian ? nilaiUjian.nilai : 0;

          return acc + tugasScore + ujianScore;
        }, 0);

        const countScores = dataMapel.length * 2;
        const average = nilaiTotal / countScores;

        return {
          ...siswa,
          average,
        };
      });
    }, [siswas, data, dataMapel]);

    const siswaWithRanking = useMemo(() => {
      const sortedSiswa = [...siswaWithAverage].sort(
        (a, b) => b.average - a.average
      );

      let currentRank = 1;
      return sortedSiswa.map((siswa, index, array) => {
        if (index > 0 && siswa.average === array[index - 1].average) {
          siswa.ranking = array[index - 1].ranking;
        } else {
          siswa.ranking = currentRank;
        }
        currentRank++;
        return siswa;
      });
    }, [siswaWithAverage]);

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
                    colSpan={dataMapel.length + 5}
                    scope="col"
                    className="py-4 border-b uppercase"
                  >
                    Nilai Siswa Tahun Ajaran {tahunAjaran} {semester} - Kelas
                    {kelas?.kelas} {kelas?.nama}
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    rowSpan={3}
                    className="px-20 py-2  text-center whitespace-nowrap"
                  >
                    Nama Siswa
                  </th>

                  <th
                    scope="col"
                    colSpan={dataMapel.length * 2}
                    className="px-4 pr-4 py-2 text-center border whitespace-nowrap"
                  >
                    Mata Pelajaran
                  </th>
                  <th
                    scope="col"
                    rowSpan={3}
                    className="px-2 w-10 py-2 border text-center whitespace-nowrap"
                  >
                    Rata-Rata
                  </th>
                  <th
                    scope="col"
                    rowSpan={3}
                    className="w-10 py-2 px-2  text-center "
                  >
                    Rangking
                  </th>
                </tr>
                <tr>
                  {dataMapel.map((kode) => (
                    <th
                      key={kode}
                      scope="col"
                      colSpan={2}
                      className="px-5 text-center border"
                    >
                      {kode}
                    </th>
                  ))}
                </tr>
                <tr>
                  {Array(dataMapel.length)
                    .fill()
                    .map((_, i) => (
                      <Fragment key={i}>
                        <th
                          scope="col"
                          colSpan={1}
                          className="px-5 text-center border"
                        >
                          T
                        </th>
                        <th
                          key={i}
                          scope="col"
                          colSpan={1}
                          className="px-5 text-center border"
                        >
                          U
                        </th>
                      </Fragment>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data && data.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-2 py-4  text-xs font-medium text-gray-900 h-[400px]  whitespace-nowrap"
                    >
                      <div className="flex justify-center w-full">
                        Tidak ada data
                      </div>
                    </td>
                  </tr>
                )}
                {siswaWithRanking.map((siswa) => (
                  <tr key={siswa._id}>
                    <td scope="row" className="px-20 text-xs py-2 border">
                      {siswa.nama}
                    </td>
                    {dataMapel.map((mapel, i) => {
                      const nilaiTugas = data.find(
                        (nilai) =>
                          nilai.siswa._id === siswa._id &&
                          nilai.mataPelajaran.kode === mapel &&
                          nilai.kategori === "tugas"
                      );

                      const nilaiUjian = data.find(
                        (nilai) =>
                          nilai.siswa._id === siswa._id &&
                          nilai.mataPelajaran.kode === mapel &&
                          nilai.kategori === "ujian"
                      );

                      return (
                        <Fragment key={i}>
                          <td className="px-2 text-xs py-2 border text-center">
                            {nilaiTugas ? nilaiTugas.nilai : "-"}
                          </td>
                          <td className="px-2 text-xs py-2 border text-center">
                            {nilaiUjian ? nilaiUjian.nilai : "-"}
                          </td>
                        </Fragment>
                      );
                    })}
                    <td className="px-2 text-xs py-2 border text-center">
                      {siswa.average.toFixed(2)}
                    </td>
                    <td className="px-2 text-xs py-2 border text-center">
                      {siswa.ranking}
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

PrintComponentNilai.displayName = "PrintComponentNilai";

export default PrintComponentNilai;
