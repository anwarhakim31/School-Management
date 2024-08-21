import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TableSemester = ({ loading, semester }) => {
  const [isGanjil, setIsGanjil] = useState(false);
  const [isGenap, setIsGenap] = useState(false);

  const handleToggleSwitch = async (keterangan) => {
    keterangan === "semester 1" &&
      setIsGanjil(!isGanjil) & setIsGenap(!isGenap);
    keterangan === "semester 2" &&
      setIsGanjil(!isGanjil) & setIsGenap(!isGenap);

    try {
      const res = await axios.post(
        HOST + "/api/master/toggle-semester",
        { keterangan },
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
    if (semester) {
      setIsGanjil(semester[0]?.status);
      setIsGenap(semester[1]?.status);
    }
  }, [semester]);

  console.log(semester);

  return (
    <div className="w-full  min-h-[150px] overflow-x-auto rounded-md shadow-lg">
      <table className="text-center w-full text-gray-500 table-a">
        <thead className="text-xs uppercase text-white bg-neutral">
          <tr>
            <th scope="col" className="px-2 py-4 opacity-0"></th>
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
              Semester 1
            </td>
            <td
              scope="row"
              className={`${
                isGanjil ? "text-neutral1" : "text-neutral2"
              } py-4 w-12 text-xs font-semibold`}
            >
              {isGanjil ? "Aktif" : "Non Aktif"}
            </td>
            <td scope="row" className="py-4 w-12">
              <label
                htmlFor="sabtu"
                className={`${
                  isGanjil ? "bg-blue-500" : "bg-backup"
                } relative border w-10 h-5 flex center rounded-full  border-gray-500 duration-300 transition-all`}
              >
                <input
                  type="checkbox"
                  name=""
                  id="sabtu"
                  value={isGanjil}
                  className="w-full h-full opacity-0 cursor-pointer"
                  checked={isGanjil}
                  onChange={() => handleToggleSwitch("semester 1")}
                />
                <div
                  className={`${
                    isGanjil ? "translate-x-5" : "translate-x-0.5"
                  } pointer-events-none absolute  top-1/2 -translate-y-1/2 bg-white border-gray-700 rounded-full w-4 h-4 duration-300 transition-all ease-in-out `}
                ></div>
              </label>
            </td>
          </tr>
          <tr className=" hover:bg-gray-200">
            <td scope="row" className="py-4 w-12 text-xs font-medium">
              Semester 2
            </td>
            <td
              scope="row"
              className={`${
                isGenap ? "text-neutral1" : "text-neutral2"
              } py-4 w-12 text-xs font-semibold`}
            >
              {isGenap ? "Aktif" : "Non Aktif"}
            </td>
            <td scope="row" className="py-4 w-12">
              <label
                htmlFor="minggu"
                className={`${
                  isGenap ? "bg-blue-500" : "bg-backup"
                } relative border w-10 h-5 flex center rounded-full  border-gray-500 duration-300 transition-all`}
              >
                <input
                  type="checkbox"
                  name=""
                  value={isGenap}
                  id="minggu"
                  className="w-full h-full opacity-0 cursor-pointer"
                  checked={isGenap}
                  onChange={() => handleToggleSwitch("semester 2")}
                />
                <div
                  className={`${
                    isGenap ? "translate-x-5" : "translate-x-0.5"
                  } pointer-events-none absolute  top-1/2 -translate-y-1/2 bg-white border-gray-700 rounded-full w-4 h-4 duration-300 transition-all ease-in-out `}
                ></div>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSemester;
