import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import { formatIndonesiaDate } from "@/util/formatDate";
import responseError from "@/util/services";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import profile from "../../assets/profile.png";

const AbsenHarianPage = () => {
  const userData = useSelector(selectedUserData);

  const [data, setData] = useState([]);
  const [absensiData, setAbsensiData] = useState([]);

  const tanggal = new Date();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          HOST + `/api/absen/${userData.waliKelas}/siswa`
        );

        if (res.status === 200) {
          setData(res.data.kelas);
          const initialAbsensiData = res.data.kelas.siswa.map((siswa) => ({
            _id: siswa._id,
            status: "hadir",
          }));
          setAbsensiData(initialAbsensiData);
        }
      } catch (error) {
        responseError(error);
      }
    };

    getData();
  }, [userData]);

  const groupAlpahabet = (data) => {
    return data?.reduce((group, item) => {
      const firstLetter = item.nama[0].toUpperCase();

      if (!group[firstLetter]) {
        group[firstLetter] = [];
      }

      group[firstLetter].push(item);

      return group;
    }, {});
  };

  const groupData = useMemo(() => {
    return groupAlpahabet(data?.siswa || []);
  }, [data?.siswa]);

  const handleChangeAbsen = (e, id) => {
    const value = e.target.value;
    setAbsensiData((prev) =>
      prev.map((siswa) =>
        siswa._id === id ? { ...siswa, status: value } : siswa
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const res = axios.post(HOST);
    } catch (error) {
      responseError(error);
    }
  };

  return (
    <section className="px-6 py-4 mb-4 ">
      <div className="border bg-white border-t-gray-300 border-l-gray-300 p-4 mb-6 md:max-w-[300px] border-r-4 border-b-4 border-neutral  rounded-md">
        <div className="space-y-2 ">
          <h3 className="text-sm  font-semibold">
            Kelas {data.kelas} {data.nama}
          </h3>
          <h3 className="text-sm  font-semibold">
            {formatIndonesiaDate(tanggal)}
          </h3>
        </div>
      </div>
      {Object.keys(groupData).map((letter) => (
        <div key={letter}>
          <h2 className="my-2 font-bold text-neutral">{letter}</h2>
          <div className="grid grid-cols-4 sm:grid-cols-12 xl:grid-cols-10 gap-4 md:gap-6">
            {data &&
              groupData[letter].map((siswa, index) => (
                <div
                  key={siswa._id}
                  className="col-span-full xs:col-span-2 sm:col-span-4 min-h-52 p-4 bg-white border border-gray-300 rounded-md md:col-span-3 xl:col-span-2 flex flex-col items-center flex-between"
                >
                  <figure className="w-20 h-20 overflow-hidden bg-background rounded-full border">
                    <img
                      src={siswa.photo ? siswa.photo : profile}
                      alt="foto"
                      className="object-cover w-full h-full block"
                    />
                  </figure>

                  <div className="mt-2 text-center">
                    <h3 className="line-clamp-1 text-xs capitalize mb-1 font-medium">
                      {siswa.nis}
                    </h3>
                    <p className="line-clamp-1 text-xs capitalize font-medium">
                      {siswa.nama}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label
                      htmlFor={`${siswa._id}-hadir`}
                      className={`relative h-6 w-6 flex-center  cursor-pointer rounded-full bg-background border border-gray-300 ${
                        absensiData.find((item) => item._id === siswa._id)
                          ?.status === "hadir"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`${siswa._id}-hadir`}
                        name={`status-${siswa._id}`}
                        value={"hadir"}
                        checked={
                          absensiData.find((item) => item._id === siswa._id)
                            ?.status === "hadir"
                        }
                        onChange={(e) => handleChangeAbsen(e, siswa._id)}
                        className=" hidden "
                      />
                      <p className="text-xs font-medium  ">H</p>
                    </label>
                    <label
                      htmlFor={`${siswa._id}-izin`}
                      className={`relative h-6 w-6 flex-center  cursor-pointer rounded-full bg-background border border-gray-300 ${
                        absensiData.find((item) => item._id === siswa._id)
                          ?.status === "izin"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`${siswa._id}-izin`}
                        name={`status-${siswa._id}`}
                        value={"izin"}
                        checked={
                          absensiData.find((item) => item._id === siswa._id)
                            ?.status === "izin"
                        }
                        onChange={(e) => handleChangeAbsen(e, siswa._id)}
                        className=" hidden "
                      />
                      <p className="text-xs font-medium  ">I</p>
                    </label>
                    <label
                      htmlFor={`${siswa._id}-sakit`}
                      className={`relative h-6 w-6 flex-center  cursor-pointer rounded-full bg-background border border-gray-300 ${
                        absensiData.find((item) => item._id === siswa._id)
                          ?.status === "sakit"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`${siswa._id}-sakit`}
                        name={`status-${siswa._id}`}
                        value={"sakit"}
                        checked={
                          absensiData.find((item) => item._id === siswa._id)
                            ?.status === "sakit"
                        }
                        onChange={(e) => handleChangeAbsen(e, siswa._id)}
                        className=" hidden "
                      />
                      <p className="text-xs font-medium  ">S</p>
                    </label>
                    <label
                      htmlFor={`${siswa._id}-alfa`}
                      className={`relative h-6 w-6 flex-center  cursor-pointer rounded-full bg-background border border-gray-300 ${
                        absensiData.find((item) => item._id === siswa._id)
                          ?.status === "alfa"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`${siswa._id}-alfa`}
                        name={`status-${siswa._id}`}
                        value={"alfa"}
                        checked={
                          absensiData.find((item) => item._id === siswa._id)
                            ?.status === "alfa"
                        }
                        onChange={(e) => handleChangeAbsen(e, siswa._id)}
                        className=" hidden "
                      />
                      <p className="text-xs font-medium  ">A</p>
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="w-full flex justify-end">
        <button className="w-full sm:max-w-[200px] h-10 bg-neutral hover:bg-indigo-700 text-white mt-8 text-sm rounded-md">
          Simpan
        </button>
      </div>
    </section>
  );
};

export default AbsenHarianPage;
