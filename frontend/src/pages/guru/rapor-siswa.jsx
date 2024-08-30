import DropdownSiswa from "@/components/elements/DropdownSiswa";
import { selectedUserData } from "@/store/slices/auth-slice";
import React from "react";
import { useSelector } from "react-redux";

const RaporSiswaPage = () => {
  const userData = useSelector(selectedUserData);

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="flex justify-start flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-gray-700">Tahun</p>
          <DropdownSiswa
            url={`/api/siswa/get-siswa/kelas/${userData.waliKelas._id}`}
          />
        </div>
      </div>
    </section>
  );
};

export default RaporSiswaPage;
