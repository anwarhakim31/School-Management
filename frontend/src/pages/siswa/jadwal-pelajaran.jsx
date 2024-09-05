import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ArrowDownToDot } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JadwalPelajaranPage = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectedUserData);
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const [dataJadwal, setDataJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libur, setLibur] = useState([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!userData.kelas) {
      if (!window.sessionStorage.getItem("toast")) {
        window.sessionStorage.setItem("toast", "true");
        toast.info("Tidak memiliki akses. dikarena anda tidak memiliki kelas.");

        setTimeout(() => {
          window.sessionStorage.removeItem("toast");
          navigate("/siswa/dashboard");
        }, 50);
      }
    }
  }, [userData]);

  useEffect(() => {
    const getJadwal = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/jadwal/get-jadwal-siswa/" + userData.kelas,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setDataJadwal(res.data.jadwal);
          setLibur(res.data.libur);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userData.kelas) {
      getJadwal();
    } else {
      setLoading(false);
    }
  }, [userData]);

  if (!userData.kelas) {
    return <div className="fixed inset-0 bg-white"></div>;
  }

  const detail = JSON.parse(localStorage.getItem("detail"));

  return (
    <section className="px-6 pt-4 pb-10">
      <div className="flex-center bg-white shadow-md border rounded-md w-full p-4">
        <h3 className="font-semibold text-neutral text-sm text-center uppercase">
          Jadwal Pelajaran Kelas{" "}
          <span>
            {detail && detail.userId === userData._id
              ? `${detail.kelas} ${detail.namaKelas}`
              : ""}{" "}
          </span>
          Tahun Ajaran {detail && detail.ajaran}
        </h3>
      </div>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex flex-wrap gap-8 justify-center mt-12"
      >
        {loading
          ? Array.from({ length: hari.length }, (_, i) => (
              <div
                key={i}
                className={`relative w-full xs:max-w-[250px] border shadow-md overflow-hidden sm:max-w-[220px] md:max-w-[220px] min-h-[300px]  rounded bg-backup text-neutral text-xl transition-all duration-300 ease-in-out`}
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
              </div>
            ))
          : hari.map((day, i) => (
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
                    .filter((jadwal) => jadwal?.hari === day)
                    .slice(0, hover ? dataJadwal.length : 3)
                    .map((jadwal, i) => (
                      <li
                        key={jadwal._id}
                        className={`relative border-b border-gray-300 px-4 py-2`}
                      >
                        <h5 className="text-xs font-medium text-center mb-2">
                          {jadwal?.mulai} {jadwal?.mulai && "-"}{" "}
                          {jadwal?.selesai}
                        </h5>
                        <h5 className="text-xs font-medium line-clamp-1">
                          {jadwal?.bidangStudi?.nama}
                        </h5>
                        <p className="text-xs mt-2">{jadwal?.guru?.nama}</p>
                        {i === 2 && !hover && (
                          <span className="absolute  left-1/2 -bottom-5 animate-bounce">
                            <ArrowDownToDot width={18} height={18} />
                          </span>
                        )}
                      </li>
                    ))}
                  {libur
                    .filter(
                      (holiday) =>
                        holiday.hari === day && holiday.status === true
                    )
                    .map((holiday) => (
                      <li
                        key={holiday._id}
                        className="w-full h-full  flex-center"
                      >
                        <h5 className=" mt-32 text-xs text-neutral font-medium line-clamp-1">
                          Libur Sekolah
                        </h5>
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
