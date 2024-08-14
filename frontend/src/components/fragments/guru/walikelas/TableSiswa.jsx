import { Checkbox } from "@/components/ui/checkbox";
import {
  setDataDelete,
  setDataDeleteMany,
  setDataEdit,
} from "@/store/slices/admin-slice";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  Trash,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import profile from "../../../../assets/profile.png";

const TableSiswa = ({
  data,
  handleToggleDeleteOne,
  allCheck,
  setAllCheck,
  page,
  limit,
  setPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataChecked, setDataChecked] = useState([]);

  const lastOfIndexSiswa = page * limit;
  const firstOfindexSiswa = lastOfIndexSiswa - limit;

  const siswaSlice = data.slice(firstOfindexSiswa, lastOfIndexSiswa);
  const totalSiswa = data.length;

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
      setDataChecked(siswaSlice.map((siswa) => siswa._id));
      dispatch(setDataDeleteMany(siswaSlice.map((siswa) => siswa._id)));
    } else {
      setDataChecked([]);
      dispatch(setDataDeleteMany([]));
    }
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

  const handleCopytext = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(toast.info("Berhasil menyalin data"));
  };

  const handlePagination = (index) => {
    setPage(index);
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
              {data && data.length === 0 && (
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
                [...siswaSlice].reverse().map((siswa, i) => (
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
                      <img
                        src={siswa.photo ? siswa.photo : profile}
                        className="w-8 h-8 object-cover rounded-full  bg-backup"
                      />
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
        <Pagination
          lastOfIndexSiswa={lastOfIndexSiswa}
          firstOfindexSiswa={firstOfindexSiswa}
          limit={limit}
          page={page}
          data={data}
          totalSiswa={totalSiswa}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
};

const Pagination = ({
  lastOfIndexSiswa,
  firstOfindexSiswa,
  limit,
  page,
  totalSiswa,
  handlePagination,
}) => {
  const pageNumber = [];

  const totalPage = Math.ceil(totalSiswa / limit);

  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  const startPage =
    page === totalPage ? Math.max(1, page - 2) : Math.max(1, page - 1);

  const endPage =
    page === 1 ? Math.min(totalPage, page + 2) : Math.min(totalPage, page + 1);

  const visiblePage = pageNumber.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      <div className="flex">
        <p className="text-[10px] sm:text-xs">{`Menampilkan ${
          totalSiswa === 0 ? 0 : firstOfindexSiswa + 1
        } - ${
          page === totalPage
            ? totalSiswa
            : totalSiswa === 0
            ? 0
            : lastOfIndexSiswa
        } dari ${totalSiswa} data`}</p>
      </div>
      <div className="flex-center space-x-4">
        {totalSiswa === 0 ? (
          ""
        ) : (
          <div className="flex gap-2 ">
            <button
              onClick={() => handlePagination(page - 1)}
              className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
              disabled={page === 1}
            >
              <ChevronLeft width={20} height={20} />
            </button>

            {visiblePage.map((number) => (
              <div
                key={number}
                className={`page-item ${page === number ? "" : ""}`}
              >
                <button
                  onClick={() => handlePagination(number)}
                  className={`${
                    number === page &&
                    "rounded-full border-b shadow border-gray-500"
                  } w-5 text-sm h-5`}
                >
                  {number}
                </button>
              </div>
            ))}

            <button
              onClick={() => handlePagination(page + 1)}
              className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
              disabled={page === pageNumber.length}
            >
              <ChevronRight width={20} height={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSiswa;
