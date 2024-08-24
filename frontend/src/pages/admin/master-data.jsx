import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import {
  CalendarCog,
  CalendarPlus,
  Check,
  Filter,
  Plus,
  Search,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ClassIcon from "../../assets/svg/class.svg?react";
import TableUmum from "@/components/fragments/admin/master-data/TableUmum";
import { toast } from "sonner";
import DeleteModal from "@/components/fragments/admin/master-data/DeleteModal";
import TableMingguan from "@/components/fragments/admin/master-data/TableMingguan";
import TabelNasionsal from "@/components/fragments/admin/master-data/TabelNasionsal";
import AddModalNasional from "@/components/fragments/admin/master-data/AddModalNasional";
import DeleteModalNasional from "@/components/fragments/admin/master-data/DeleteModalNasional";
import TableSemester from "@/components/fragments/admin/master-data/TableSemester";
import TableJam from "@/components/fragments/admin/master-data/TableJam";

const MasterDataPage = () => {
  const [dataAjaran, setDataAjaran] = useState([]);
  const [dataLibur, setDataLibur] = useState([]);
  const [dataAkademik, setDataAkademik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddajaran, setIsAddAjaran] = useState(false);
  const [isAddNasional, setIsAddNasional] = useState(false);
  const [isDeleteajaran, setIsDeleteajaran] = useState(false);
  const [isDeleteNasional, setIsDeleteNasional] = useState(false);
  const [ajaran, setAjaran] = useState("");
  const [trigger, setTrigger] = useState(1);

  useEffect(() => {
    const getAjaran = async () => {
      try {
        const res = await axios.get(HOST + "/api/ajaran/get-ajaran", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataAjaran(res.data.ajaran);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    const getLibur = async () => {
      try {
        const res = await axios.get(HOST + "/api/libur/get-libur", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataLibur(res.data.libur);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    const getAkademik = async () => {
      try {
        const res = await axios.get(HOST + "/api/master/get-akademik", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataAkademik(res.data.akademik);
          console.log(res.data);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 50);
      }
    };

    getLibur();
    getAjaran();
    getAkademik();
  }, [isAddajaran, isDeleteajaran, trigger, isAddNasional, isDeleteNasional]);

  const handleAddAjaran = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        HOST + "/api/ajaran/add-ajaran",
        { ajaran },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        handleToggleAdd();
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAjaran = async (id) => {
    try {
      const res = await axios.put(
        HOST + "/api/ajaran/edit-ajaran/" + id,
        { id },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setTrigger(trigger + 1);
      }
    } catch (error) {
      responseError(error);
    }
  };

  const handleToggleAdd = () => {
    setAjaran("");
    setIsAddAjaran(!isAddajaran);
  };

  const handleToggleDelete = () => {
    setIsDeleteajaran(!isDeleteajaran);
  };

  const handleToggleAddNasional = () => {
    setIsAddNasional(!isAddNasional);
  };

  const handleToggleDeleteNasional = () => {
    setIsDeleteNasional(!isDeleteNasional);
  };

  return (
    <section className="px-6 py-8  ">
      <div className="w-full">
        <div className="w-full   py-4 px-2 rounded-md  gap-6 border border-b-0 bg-white">
          <h1 className="font-bold text-sm text-gray-800 ">Sistem Akademik</h1>
        </div>
        <div className="w-full flex-between  pt-8 pb-4 px-2    gap-6 border bg-white">
          <h1 className=" font-semibold text-xs  text-neutral w-36 text-center py-1 rounded-full border bg-gray-100 border-gray-300">
            Jam Pembelajaran
          </h1>
        </div>
        <div className="relative bg-white w-full   border  overflow-hidden  rounded-md">
          {loading ? (
            <div className="block w-full relative bg-gray-200 animate-pulse shadow-md pb-[3.5rem]">
              <div className="w-full flex-center min-h-[231px] overflow-x-auto rounded-md">
                <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
              </div>
            </div>
          ) : (
            <TableJam
              endTime={dataAkademik?.endTime}
              startTime={dataAkademik?.startTime}
              loading={loading}
            />
          )}
        </div>
        <div className="w-full flex-between  pt-8 pb-4 px-2    gap-6 border bg-white">
          <h1 className=" font-semibold text-xs  text-neutral w-36 text-center py-1 rounded-full border bg-gray-100 border-gray-300">
            Semester
          </h1>
        </div>
        <div className="relative bg-white w-full   border  overflow-hidden  rounded-md">
          {loading ? (
            <div className="block w-full relative bg-gray-200 animate-pulse shadow-md pb-[3.5rem]">
              <div className="w-full flex-center min-h-[231px] overflow-x-auto rounded-md">
                <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
              </div>
            </div>
          ) : (
            <TableSemester
              semester={dataAkademik?.semester}
              loading={loading}
            />
          )}
        </div>
        <div className="w-full flex-between  pt-8 pb-4 px-2 rounded-md    gap-6 border bg-white">
          <h1 className=" font-semibold text-xs  text-neutral w-36 text-center py-1 rounded-full border bg-gray-100 border-gray-300">
            Tahun Ajaran
          </h1>
          <div className="flex-center ml-auto gap-2">
            {isAddajaran && (
              <div
                className={`${
                  isAddajaran
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-40 opacity-0"
                } relative bg-white flex items-center  border border-gray-400 rounded-md transition-all duration-300`}
              >
                <input
                  type="text"
                  placeholder="2000/2001"
                  value={ajaran}
                  onChange={(e) => setAjaran(e.target.value)}
                  maxLength={10}
                  className="py-2 px-2 text-xs rounded-md max-w-40 outline-neutral pr-14"
                />
                <div className="flex gap-2 absolute right-1">
                  <button
                    onClick={handleAddAjaran}
                    disabled={loading}
                    className="space-x-2 w-4 h-4 rounded-full flex-center bg-neutral1 text-white"
                  >
                    <Check width={12} height={12} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleToggleAdd}
                    className=" w-4 h-4 rounded-full flex-center bg-neutral2 text-white"
                  >
                    <X width={12} height={12} />
                  </button>
                </div>
              </div>
            )}

            <button
              aria-label="tambah ajaran"
              disabled={loading || isAddajaran}
              onClick={handleToggleAdd}
              className="bg-neutral hover:bg-indigo-800  min-w-fit transition-all w-fit duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
            >
              <CalendarCog width={15} height={15} className=" " /> Tambah Ajaran
            </button>
          </div>
        </div>
        <div className="relative bg-white w-full   border  overflow-hidden  rounded-md">
          {loading ? (
            <div className="block w-full relative bg-gray-200 animate-pulse shadow-md pb-[3.5rem]">
              <div className="w-full flex-center min-h-[231px] overflow-x-auto rounded-md">
                <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
              </div>
            </div>
          ) : (
            <TableUmum
              data={dataAjaran}
              handleToggleDelete={handleToggleDelete}
              loading={loading}
              handleEditAjaran={handleEditAjaran}
            />
          )}
        </div>
      </div>
      <div className="w-full mt-8">
        <div className="w-full   py-4 px-2 rounded-md  gap-6 border border-b-0 bg-white">
          <h1 className="font-bold text-sm text-gray-800 ">
            Sistem Libur Sekolah
          </h1>
        </div>
        <div className="w-full flex-between  pt-8 pb-4 px-2    gap-6 border bg-white">
          <h1 className=" font-semibold text-xs  text-neutral w-36 text-center py-1 rounded-full border bg-gray-100 border-gray-300">
            Libur Perpekan
          </h1>
        </div>
        <div className="relative bg-white w-full   border  overflow-hidden  rounded-md">
          {loading ? (
            <div className="block w-full relative bg-gray-200 animate-pulse shadow-md pb-[3.5rem]">
              <div className="w-full flex-center min-h-[231px] overflow-x-auto rounded-md">
                <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
              </div>
            </div>
          ) : (
            <TableMingguan libur={dataLibur?.perpekan} loading={loading} />
          )}
        </div>
        <div className="w-full flex-between pt-10 pb-4  py-4 px-2  mt  gap-6 border bg-white">
          <h1 className=" font-semibold text-xs  text-neutral w-36 text-center py-1 rounded-full border bg-gray-100 border-gray-300">
            Libur Nasional
          </h1>
          <button
            aria-label="tambah ajaran"
            onClick={handleToggleAddNasional}
            className="bg-neutral hover:bg-indigo-800  min-w-fit transition-all w-fit duration-300 text-white py-2.5 text-xs px-4 rounded-md flex-between gap-3"
          >
            <CalendarPlus width={15} height={15} className=" " /> Tambah Libur
          </button>
        </div>
        <div className="relative bg-white w-full   border  overflow-hidden  rounded-md">
          {loading ? (
            <div className="block w-full relative bg-gray-200 animate-pulse shadow-md pb-[3.5rem]">
              <div className="w-full flex-center min-h-[231px] overflow-x-auto rounded-md">
                <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
              </div>
            </div>
          ) : (
            <TabelNasionsal
              libur={dataLibur?.nasional}
              loading={loading}
              handleToggleDeleteNasional={handleToggleDeleteNasional}
            />
          )}
        </div>
      </div>

      {isDeleteajaran && <DeleteModal onClose={handleToggleDelete} />}
      {isAddNasional && <AddModalNasional onClose={handleToggleAddNasional} />}
      {isDeleteNasional && (
        <DeleteModalNasional onClose={handleToggleDeleteNasional} />
      )}
    </section>
  );
};

export default MasterDataPage;
{
  /* <div className="w-full h-full   bg-white rounded-md border p-4">
          <div className="mb-2 gap-2 flex flex-col">
            <label htmlFor="" className="text-xs font-semibold">
              Kegiatan Belajar Mengajar
            </label>
            <div className="space-x-2">
              <input
                type="time"
                className="bg-none border border-gray-300 px-2 py-0.5 text-xs  rounded-md outline-neutral"
              />
              <span className="text-xs font-semibold">sd</span>
              <input
                type="time"
                className="bg-none border border-gray-300 px-2 py-0.5 text-xs rounded-md outline-neutral"
              />
            </div>
          </div>
          <div className="mb-2 gap-2 flex flex-col">
            <label htmlFor="" className="text-xs font-semibold text-gray-800">
              Semester
            </label>
            <select
              name=""
              id=""
              className="text-xs border max-w-[175px] border-gray-300 px-4 py-0.5 rounded-md outline-neutral"
            >
              <option value="ganjil">Semester Ganjil</option>
              <option value="genap">Semester Genap</option>
            </select>
          </div>
          <div className="">
            <button className="self-start bg-neutral md:col-start-2 w-fit text-white text-xs px-4 py-2 rounded-md">
              Simpan
            </button>
          </div>
        </div> */
}
