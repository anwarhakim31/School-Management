import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ArrowDownToDot } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const JadwalPelajaranPage = () => {
  const userData = useSelector(selectedUserData);
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const [dataJadwal, setDataJadwal] = useState([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const getJadwal = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/jadwal/get-jadwal-siswa/" + userData.kelas,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setDataJadwal(res.data.jadwal);
        }
      } catch (error) {
        responseError(error);
      }
    };

    if (userData.kelas) {
      getJadwal();
    }
  }, [userData]);

  return (
    <section className="px-6 pt-4 pb-10">
      <div className="flex-center bg-white shadow-md border rounded-md w-full p-4">
        <h3 className="font-semibold text-neutral text-sm text-center uppercase">
          Jadwal Pelajaran Kelas <span>7 Alfa</span>
          Tahun Ajaran 2024/2025
        </h3>
      </div>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex flex-wrap gap-8 justify-center mt-12"
      >
        {hari.map((day, i) => (
          <div
            key={i}
            className={`relative w-full xs:max-w-[250px] border shadow-md overflow-hidden sm:max-w-[220px] md:max-w-[220px] min-h-[300px]  rounded bg-white text-neutral text-xl transition-all duration-300 ease-in-out`}
          >
            <div className="bg-neutral px-4 py-1.5">
              <p className="text-white text-sm capitalize">{day}</p>
            </div>

            <ul
              className={`transition-all duration-500 ease-in-out ${
                hover ? "max-h-full overflow-hidden " : "max-h-[250px]"
              } relative`}
            >
              {dataJadwal
                .filter((jadwal) => jadwal.hari === day)
                .slice(0, hover ? dataJadwal.length : 3)
                .map((jadwal, i) => (
                  <li
                    key={jadwal._id}
                    className="border-b border-gray-300 px-4 py-2"
                  >
                    <h5 className="text-xs font-medium text-center mb-2">
                      {jadwal.mulai} - {jadwal.selesai}
                    </h5>
                    <h5 className="text-xs font-medium line-clamp-1">
                      {jadwal.bidangStudi.nama}
                    </h5>
                    <p className="text-xs mt-2">{jadwal.guru.nama}</p>
                    {i === 2 && !hover && (
                      <span className="absolute  left-1/2 -bottom-5 animate-bounce">
                        <ArrowDownToDot width={18} height={18} />
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JadwalPelajaranPage;
