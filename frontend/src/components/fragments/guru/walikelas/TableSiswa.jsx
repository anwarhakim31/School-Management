import { Checkbox } from "@/components/ui/checkbox";
import { setDataDelete, setDataEdit } from "@/store/slices/admin-slice";
import { Edit, Mail, Phone, Trash, User } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TableSiswa = ({ data, handleToggleDeleteOne }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(false);
  const [dataChecked, setDataChecked] = useState([]);

  const handleDeleteSiswa = (data) => {
    handleToggleDeleteOne();
    dispatch(setDataDelete(data));
  };

  const handleEditSiswa = (data) => {
    dispatch(setDataEdit(data));
    navigate("/admin/edit-siswa");
  };

  const handleCheckboxAll = (checked) => {
    setAllCheck(!allCheck);

    if (checked) {
      setDataChecked(data.siswa.map((siswa) => siswa._id));
      dispatch(set);
    } else {
      setDataChecked([]);
    }
  };

  const handleCheckboxChange = (checked, siswa) => {
    if (checked) {
      setDataChecked((prev) => [...prev, siswa._id]);
    } else {
      setDataChecked((prev) => prev.filter((id) => id !== siswa._id));
    }
  };

  const handleCopytext = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(toast.info("Berhasil menyalin data"));
  };

  return (
    <>
      <div className="block w-full shadow-md pb-[3.5rem]">
        <div className="w-full min-h-[430px]  overflow-auto ">
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
                <th scope="col" className="sr-only"></th>
                <th scope="col" className="pl-1 pr-4  py-4">
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

                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.siswa && data.siswa.length === 0 && (
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
              {data.siswa &&
                data.siswa.length !== 0 &&
                data.siswa.map((siswa, i) => (
                  <tr
                    key={siswa.nis}
                    className={` hover:bg-gray-100 border-b  `}
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
                    <td scope="row" className="overflow-hidden">
                      {siswa.photo === "" ? (
                        <div className="w-8 h-8  rounded-full flex-center bg-purple-200">
                          <User className="text-gray-500" strokeWidth={1} />
                        </div>
                      ) : (
                        <img
                          src={siswa.photo}
                          className="w-8 h-8 object-cover rounded-full bg-purple-200"
                        />
                      )}
                    </td>
                    <td
                      scope="row"
                      className="pl-1 pr-4 py-5  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                    >
                      {siswa.nama}
                    </td>
                    <td
                      scope="row"
                      className="py-2 text-xs font-normal text-gray-900 whitespace-nowrap "
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
                          onClick={() => handleCopytext(siswa.phone)}
                        >
                          <Phone strokeWidth={1} width={15} height={15} />
                        </div>
                        {siswa.email && (
                          <div
                            className="cursor-pointer flex-center border shadow-md  text-indigo-700 w-[24px] h-[24px] rounded-full"
                            title={siswa.email}
                            onClick={() => handleCopytext(siswa.email)}
                          >
                            <Mail strokeWidth={1} width={15} height={15} />
                          </div>
                        )}
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="px-3    border-gray-300  py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex-center gap-4">
                        <button
                          title="Edit"
                          onClick={() => handleEditSiswa(siswa)}
                          className="w-[20px] h-[20px]  flex-center"
                        >
                          <Edit
                            width={18}
                            absoluteStrokeWidth={true}
                            strokeWidth={1}
                            height={18}
                            className="text-gray-800  hover:text-neutral1 transition-all duration-300"
                          />
                        </button>
                        <button
                          title="Hapus"
                          className="w-[20px] h-[20px] border-b border-gray-500 flex-center"
                          onClick={() => handleDeleteSiswa(siswa)}
                        >
                          <Trash
                            width={18}
                            height={18}
                            absoluteStrokeWidth={true}
                            strokeWidth={1}
                            className="text-gray-800  hover:text-neutral2 fill-gray-100 transition-all duration-300"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <Pagination
          lastOfIndexSiswa={lastOfIndexSiswa}
          firstOfindexSiswa={firstOfindexSiswa}
          limit={limit}
          page={page}
          totalPage={totalPage}
          data={data}
          totalSiswa={totalSiswa}
          handlePagination={handlePagination}
        /> */}
      </div>
    </>
  );
};

export default TableSiswa;
