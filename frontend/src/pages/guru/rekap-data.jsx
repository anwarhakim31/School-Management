import MonthDropdown from "@/components/elements/MonthDropdown";
import YearDropdown from "@/components/elements/YearDropDown";
import TableAbsen from "@/components/fragments/guru/rekap/TableAbsen";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RekapDataPage = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const userData = useSelector(selectedUserData);

  const [countDay, setCountDay] = useState(0);
  const [rekapAbsen, setRekapAbsen] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/absen/" + userData.waliKelas + "/rekap-absen",
          { withCredentials: true, params: { month, year } }
        );

        if (res.status === 200) {
          setCountDay(res.data.jumlahHari);
          setRekapAbsen(res.data.rekapAbsensi);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [year, month]);

  console.log(year, month);

  const handleSelectYeay = (value) => {
    setYear(value);
  };

  const handleSelectMonth = (value) => {
    setMonth(value);
  };

  console.log(rekapAbsen);

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="border bg-white border-t-gray-300 border-l-gray-300 p-4 mb-6 md:max-w-[300px] border-r-4 border-b-4 border-neutral  rounded-md">
        <div className="space-y-2 "></div>
      </div>
      <div className="flex flex-wrap gap-8">
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-gray-700">Tahun</p>
          <YearDropdown onSelectYear={handleSelectYeay} />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-gray-700">Bulan</p>
          <MonthDropdown onSelectMonth={handleSelectMonth} />
        </div>
      </div>
      <div className="border broder-gray-300 rounded-md bg-white mt-6">
        <TableAbsen rekapAbsen={rekapAbsen} countDay={countDay} />
      </div>
    </section>
  );
};

export default RekapDataPage;
