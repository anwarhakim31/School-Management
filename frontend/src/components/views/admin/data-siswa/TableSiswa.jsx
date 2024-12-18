/* eslint-disable react/prop-types */
import TablePagination from "@/components/fragments/TablePagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  setDataDelete,
  setDataDeleteMany,
  setDataEdit,
} from "@/store/slices/admin-slice";
import { ChevronLeft, ChevronRight, Edit, Phone, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const TableSiswa = ({
  data,
  limit,
  page,
  totalPage,
  totalSiswa,
  handlePagination,
  handleToggleDeleteOne,
  setAllCheck,
  allCheck,
  loading,
  setPagination,
}) => {
  const lastOfIndexSiswa = page * limit;
  const firstOfindexSiswa = lastOfIndexSiswa - limit;
  const [dataChecked, setDataChecked] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("berhasil menyalin data");
    });
  };

  const handleCheckboxChange = (checked, siswa) => {
    if (checked) {
      setDataChecked((prev) => [...prev, siswa._id]);
      dispatch(setDataDeleteMany([...dataChecked, siswa._id]));
    } else {
      setDataChecked((prev) => prev.filter((id) => id !== siswa._id));
      dispatch(setDataDeleteMany(dataChecked.filter((id) => id !== siswa._id)));
    }
  };

  const handleCheckboxAll = (checked) => {
    setAllCheck(!allCheck);

    if (checked) {
      setDataChecked(data.map((siswa) => siswa._id));
      dispatch(setDataDeleteMany(data.map((siswa) => siswa._id)));
    } else {
      setDataChecked([]);
      dispatch(setDataDeleteMany([]));
    }
  };

  const handleDeleteSiswa = (data) => {
    handleToggleDeleteOne();
    dispatch(setDataDelete(data));
  };

  const handleEditSiswa = (data) => {
    dispatch(setDataEdit(data));
    navigate("/admin/edit-siswa");
  };

  return (
    <>
      <div className="block w-full shadow-md pb-[3.5rem]">
        <div className="w-full min-h-[453px]  overflow-auto ">
          <table className="w-full    text-left  text-gray-500 ">
            <thead className="text-xs text-left  text-white uppercase bg-neutral">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-4 flex items-center justify-center"
                >
                  <Checkbox
                    type="checkbox"
                    checked={allCheck}
                    onCheckedChange={handleCheckboxAll}
                    className={
                      "min-h-4 min-w-3 border-white data-[state=checked]:bg-gray-800"
                    }
                  />
                </th>
                <th scope="col" className="px-3 py-4">
                  NIS
                </th>
                <th scope="col" className="px-4 py-4">
                  Nama
                </th>
                <th scope="col" className=" py-4 whitespace-nowrap">
                  Jenis Kelamin
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-center whitespace-nowrap"
                >
                  Tahun Masuk
                </th>
                <th scope="col" className="px-2 py-4">
                  Alamat
                </th>
                <th scope="col" className="py-4 text-center">
                  Kontak
                </th>
                <th
                  scope="Kelas"
                  className="text-center px-8 py-4 whitespace-nowrap"
                >
                  Kelas
                </th>
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && data.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="px-2 py-4 border-gray-300 text-xs font-medium text-gray-900 h-[350px] whitespace-nowrap"
                  >
                    <div className="flex justify-center w-full">
                      Tidak ada data
                    </div>
                  </td>
                </tr>
              )}
              {data &&
                data.length !== 0 &&
                data.map((siswa, i) => (
                  <tr
                    key={siswa.nis}
                    className={` hover:bg-gray-100 border-b  ${
                      limit === i + 1 && "border-none"
                    }`}
                  >
                    <td scope="row" className="px-3 py-3 relative">
                      <Checkbox
                        type="checkbox"
                        name=""
                        checked={dataChecked.includes(siswa._id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(checked, siswa)
                        }
                        id=""
                        className={
                          "w-4 h-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  data-[state=checked]:bg-gray-800"
                        }
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-3 py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {siswa.nis}
                    </td>

                    <td
                      scope="row"
                      className=" px-4 py-5  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                    >
                      {siswa.nama}
                    </td>
                    <td
                      scope="row"
                      className="py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {siswa.jenisKelamin}
                    </td>
                    <td
                      scope="row"
                      className=" py-4 px-3 text-xs text-center font-normal text-gray-900 whitespace-nowrap "
                    >
                      {siswa.tahunMasuk}
                    </td>
                    <td
                      scope="row"
                      className="px-2 py-4   overflow-hidden line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {siswa.alamat ? (
                        `${siswa.alamat}`
                      ) : (
                        <span className="text-gray-700 font-bold">
                          Data Kosong
                        </span>
                      )}
                    </td>
                    <td
                      scope="row"
                      className="py-4 text-center  text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex items-center justify-center gap-4 ">
                        <div
                          className="cursor-pointer flex-center  border shadow-md  text-indigo-700 w-[24px] h-[24px] rounded-full"
                          title={siswa.phone}
                          onClick={() => HandleCopyText(siswa.phone)}
                        >
                          <Phone strokeWidth={1} width={15} height={15} />
                        </div>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className=" py-4 px-8 max-w-full text-center text-xs font-normal whitespace-nowrap text-gray-900 "
                    >
                      {siswa.kelas ? (
                        `${siswa.kelas.kelas} ${siswa.kelas.nama}`
                      ) : (
                        <span className="text-gray-700 font-bold">
                          Data Kosong
                        </span>
                      )}
                    </td>
                    <td
                      scope="row"
                      className="px-3    border-gray-300  py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex-center gap-4">
                        <button
                          title="Edit"
                          onClick={() => handleEditSiswa(siswa)}
                          className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral1 flex-center transition-all duration-300"
                        >
                          <Edit
                            width={15}
                            absoluteStrokeWidth={true}
                            strokeWidth={1}
                            height={15}
                            className="text-gray-800  group-hover:text-neutral1 transition-all duration-300"
                          />
                        </button>
                        <button
                          title="Hapus"
                          className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral2 flex-center transition-all duration-300"
                          onClick={() => handleDeleteSiswa(siswa)}
                        >
                          <Trash
                            width={15}
                            height={15}
                            absoluteStrokeWidth={true}
                            strokeWidth={1}
                            className="text-gray-800  group-hover:text-neutral2 fill-gray-100 transition-all duration-300"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          lastOfIndex={lastOfIndexSiswa}
          firstOfindex={firstOfindexSiswa}
          limit={limit}
          page={page}
          totalPage={totalPage}
          data={data}
          totalData={totalSiswa}
          handlePagination={handlePagination}
          setPagination={setPagination}
        />
      </div>
    </>
  );
};

export default TableSiswa;
