import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TableJam = ({ loading, startTime, endTime }) => {
  const [start, setStart] = useState(startTime || 0);
  const [end, setEnd] = useState(endTime || 0);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let debounceTime;

    clearTimeout(debounceTime);
    debounceTime = setTimeout(() => {
      if (mounted) {
        updateTime();
      }
    }, [500]);

    return () => clearTimeout(debounceTime);
  }, [end, start]);

  const updateTime = async () => {
    try {
      const res = await axios.put(
        HOST + "/api/master/update-time",
        { end, start },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      responseError(error);
    }
  };

  return (
    <div className="w-full  min-h-[140px] overflow-x-auto rounded-md shadow-lg">
      <table className="text-center w-full text-gray-500 table-a">
        <thead className="text-xs uppercase text-white bg-neutral">
          <tr>
            <th scope="col" className="opacity-0"></th>
            <th scope="col" className="px-3 py-4">
              Pukul
            </th>
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
              Mulai
            </td>

            <td scope="row" className="py-4 w-12">
              <input
                type="time"
                name=""
                value={start}
                onChange={(e) => setStart(e.target.value)}
                id=""
                className="bg-inherit outline-none text-xs"
              />
            </td>
          </tr>
          <tr className=" hover:bg-gray-200">
            <td scope="row" className="py-4 w-12 text-xs font-medium">
              Selesai
            </td>

            <td scope="row" className="py-4 w-12">
              <input
                type="time"
                name=""
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                id=""
                className="bg-inherit outline-none text-xs"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableJam;
