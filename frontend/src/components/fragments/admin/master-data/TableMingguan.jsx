import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TableMingguan = ({ loading, libur }) => {
  const [isSabtu, setIsSabtu] = useState(false);
  const [isMinggu, setIsMinggu] = useState(false);

  const handleToggleSwitch = async (hari, status) => {
    hari === "sabtu" ? setIsSabtu(!isSabtu) : setIsMinggu(!isMinggu);

    try {
      const res = await axios.post(
        HOST + "/api/libur/toggle-perpekan",
        { hari, status },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      responseError(error);
    }
  };

  useEffect(() => {
    if (libur) {
      setIsSabtu(libur[0]?.status);
      setIsMinggu(libur[1]?.status);
    }
  }, [libur]);

  return (
    <div className="w-full  min-h-[150px] overflow-x-auto rounded-md shadow-lg">
      <table className="text-center w-full text-gray-500 table-a">
        <thead className="text-xs uppercase text-white bg-neutral">
          <tr>
            <th scope="col" className="px-2 py-4">
              Hari
            </th>
            <th scope="col" className="px-3 py-4">
              Status
            </th>
            <th className="opacity-0">Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr className="w-full h-full">
              <td
                colSpan="7"
                className="px-2 py-4  border-gray-300 text-xs text-gray800 whitespace-nowrap h-[220px]"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="w-8 h-8 block mb-2 animate-spin rounded-full border-4 border-t-gray-800 border-gray-300"></span>
                  <span>Loading</span>
                </div>
              </td>
            </tr>
          )}
          <tr className="border-b hover:bg-gray-200">
            <td scope="row" className="py-4 w-12 text-xs font-medium">
              Sabtu
            </td>
            <td
              scope="row"
              className={`${
                isSabtu ? "text-neutral1" : "text-neutral2"
              } py-4 w-12 text-xs font-semibold`}
            >
              {isSabtu ? "Aktif" : "Non Aktif"}
            </td>
            <td scope="row" className="py-4 w-12">
              <label
                htmlFor="sabtu"
                className={`${
                  isSabtu ? "bg-blue-500" : "bg-backup"
                } relative border w-12 h-6 flex center rounded-full  border-gray-500 duration-300 transition-all`}
              >
                <input
                  type="checkbox"
                  name=""
                  id="sabtu"
                  value={isSabtu}
                  className="w-full h-full opacity-0 cursor-pointer"
                  checked={isSabtu}
                  onChange={() => handleToggleSwitch("sabtu", !isSabtu)}
                />
                <div
                  className={`${
                    isSabtu ? "translate-x-6" : "translate-x-0.5"
                  } pointer-events-none absolute  top-1/2 -translate-y-1/2 bg-white border-gray-700 rounded-full w-5 h-5 duration-300 transition-all ease-in-out `}
                ></div>
              </label>
            </td>
          </tr>
          <tr className=" hover:bg-gray-200">
            <td scope="row" className="py-4 w-12 text-xs font-medium">
              Minggu
            </td>
            <td
              scope="row"
              className={`${
                isMinggu ? "text-neutral1" : "text-neutral2"
              } py-4 w-12 text-xs font-semibold`}
            >
              {isMinggu ? "Aktif" : "Non Aktif"}
            </td>
            <td scope="row" className="py-4 w-12">
              <label
                htmlFor="sabtu"
                className={`${
                  isMinggu ? "bg-blue-500" : "bg-backup"
                } relative border w-12 h-6 flex center rounded-full  border-gray-500 duration-300 transition-all`}
              >
                <input
                  type="checkbox"
                  name=""
                  value={isMinggu}
                  id="sabtu"
                  className="w-full h-full opacity-0 cursor-pointer"
                  checked={isMinggu}
                  onChange={() => handleToggleSwitch("minggu", !isMinggu)}
                />
                <div
                  className={`${
                    isMinggu ? "translate-x-6" : "translate-x-0.5"
                  } pointer-events-none absolute  top-1/2 -translate-y-1/2 bg-white border-gray-700 rounded-full w-5 h-5 duration-300 transition-all ease-in-out `}
                ></div>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableMingguan;
