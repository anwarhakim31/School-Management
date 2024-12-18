import RekapAbsenFragment from "@/components/views/guru/rekap/RekapAbsenFragment";
import RekapNilaiFragment from "@/components/views/guru/rekap/RekapNilaiFragement";
import RekapNilaiStudiFragment from "@/components/views/guru/rekap/RekapNilaiStudiFragment";
import { selectedUserData } from "@/store/slices/auth-slice";
import { useState } from "react";
import { useSelector } from "react-redux";

const RekapDataPage = () => {
  const userData = useSelector(selectedUserData);
  const fragment = userData.waliKelas
    ? ["Rekap Absen", "Rekap Nilai Rapor", "Rekap Nilai Studi"]
    : ["Rekap Nilai Studi"];
  const [selectedFragment, setSelectedFragment] = useState(fragment[0]);

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="mb-10  bg-white  shadow-md flex  border-t-4 border-blue-800 py-4">
        {fragment.map((frag, i) => (
          <button
            key={i}
            onClick={() => setSelectedFragment(frag)}
            className={`${
              selectedFragment === frag
                ? "bg-neutral text-white"
                : "bg-white text-neutral"
            } text-xs sm:text-sm  border-gray-50 border-b w-[33.3%] md:w-[20%]  py-1.5 `}
          >
            {frag}
          </button>
        ))}
      </div>
      {selectedFragment === "Rekap Absen" && <RekapAbsenFragment />}
      {selectedFragment === "Rekap Nilai Rapor" && <RekapNilaiFragment />}
      {selectedFragment === "Rekap Nilai Studi" && <RekapNilaiStudiFragment />}
    </section>
  );
};

export default RekapDataPage;

////////////////////////////////////////
