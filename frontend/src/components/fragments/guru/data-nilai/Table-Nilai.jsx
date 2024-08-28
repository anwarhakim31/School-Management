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

const TableNilai = ({
  data,
  handleToggleDeleteOne,
  handleEditNilai,
  allCheck,
  setAllCheck,
  page,
  limit,
  setPage,
  isPrint,
  pagination,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataChecked, setDataChecked] = useState([]);

  const lastOfIndexnilai = pagination?.page * pagination?.limit;
  const firstOfindexnilai = lastOfIndexnilai - pagination?.limit;

  const handleDeletenilai = (data) => {
    handleToggleDeleteOne();
    dispatch(setDataDelete(data));
  };

  const handleToggleEdit = (data) => {
    handleEditNilai();
    dispatch(setDataEdit(data));
  };

  const handleCheckboxAll = (checked) => {
    setAllCheck(!allCheck);

    if (checked) {
      setDataChecked(data.map((nilai) => nilai._id));
      dispatch(setDataDeleteMany(data.map((nilai) => nilai._id)));
    } else {
      setDataChecked([]);
      dispatch(setDataDeleteMany([]));
    }
  };

  const handleCheckboxChange = (checked, nilai) => {
    if (checked) {
      setDataChecked((prev) => [...prev, nilai._id]);
      dispatch(setDataDeleteMany([...dataChecked, nilai._id]));
    } else {
      setDataChecked((prev) => prev.filter((id) => id !== nilai._id));
      dispatch(setDataDeleteMany(dataChecked.filter((id) => id !== nilai._id)));
    }
  };

  const handlePagination = (index) => {
    setPage(index);
  };

  return (
    <>
      <div className="block w-full shadow-md pb-[3.5rem]">
        <div className="w-full min-h-[450px]  overflow-auto ">
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

                <th scope="col" className="px-10 py-4  whitespace-nowrap">
                  Mata Pelajaran
                </th>

                <th scope="col" className="px-10 pr-4  py-4  whitespace-nowrap">
                  Nama Siswa
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-center whitespace-nowrap"
                >
                  Kategori
                </th>
                <th scope="col" className="px-3 py-4 text-center ">
                  Nilai
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-center  whitespace-nowrap"
                >
                  Tahun Ajaran
                </th>
                <th scope="col" className="py-4 text-center ">
                  Semester
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
                data.map((nilai, i) => (
                  <tr
                    key={nilai._id}
                    className={` hover:bg-gray-100 border-b  `}
                  >
                    <td scope="row" className="px-3 py-3 relative">
                      <Checkbox
                        type="checkbox"
                        name=""
                        checked={dataChecked.includes(nilai._id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(checked, nilai)
                        }
                        id=""
                        className={
                          "w-4 h-4 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  data-[state=checked]:bg-gray-800"
                        }
                      />
                    </td>

                    <td
                      scope="row"
                      className="px-10 py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {nilai.mataPelajaran.kode} {nilai.mataPelajaran.nama}
                    </td>

                    <td
                      scope="row"
                      className="px-10 pr-4 py-5  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                    >
                      {nilai.siswa.nama}
                    </td>
                    <td
                      scope="row"
                      className="py-2 px-5 text-xs font-normal text-center text-gray-900 whitespace-nowrap "
                    >
                      {nilai.kategori}
                    </td>
                    <td
                      scope="row"
                      className=" py-4 px-3 text-xs text-center font-normal text-gray-900 whitespace-nowrap "
                    >
                      {nilai.nilai}
                    </td>
                    <td
                      scope="row"
                      className="px-5 py-5 text-center  overflow-hidden line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {nilai.tahunAjaran}
                    </td>
                    <td
                      scope="row"
                      className="py-4 text-center  text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {nilai.semester}
                    </td>

                    <td
                      scope="row"
                      className="px-3    border-gray-300  py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex-center gap-4">
                        <button
                          title="Edit"
                          onClick={() => handleToggleEdit(nilai)}
                          className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral1 flex-center transition-all duration-300"
                        >
                          <Edit
                            width={18}
                            absoluteStrokeWidth={true}
                            strokeWidth={1}
                            height={18}
                            className="text-gray-800  group-hover:text-neutral1 transition-all duration-300"
                          />
                        </button>
                        <button
                          title="Hapus"
                          className="w-[25px] h-[25px] border-2 rounded-md  border-gray-300 group hover:border-neutral2 flex-center transition-all duration-300"
                          onClick={() => handleDeletenilai(nilai)}
                        >
                          <Trash
                            width={18}
                            height={18}
                            absoluteStrokeWidth={true}
                            strokeWidth={1}
                            className="text-gray-800  group-hover:text-neutral2 transition-all duration-300"
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
          lastOfIndexnilai={lastOfIndexnilai}
          firstOfindexnilai={firstOfindexnilai}
          limit={limit}
          page={page}
          data={data}
          handlePagination={handlePagination}
          pagination={pagination}
        />
      </div>

      {isPrint && (
        <div className="fixed inset-0 bg-white z-[999999] flex  justify-center p-8">
          <div className="w-full   overflow-auto ">
            <table className="w-full    text-left  text-gray-500 border">
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
                  data.map((nilai, i) => (
                    <tr
                      key={nilai.nis}
                      className={` hover:bg-gray-100 border-b  `}
                    >
                      <td scope="row" className="px-3 py-3 relative">
                        <Checkbox
                          type="checkbox"
                          name=""
                          checked={dataChecked.includes(nilai._id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(checked, nilai)
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
                        {nilai.nis}
                      </td>
                      <td
                        scope="row"
                        className="pl-1 pr-4 py-5  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                      >
                        {nilai.nama}
                      </td>
                      <td
                        scope="row"
                        className="py-2 text-xs font-normal text-gray-900 whitespace-nowrap "
                      >
                        {nilai.jenisKelamin}
                      </td>
                      <td
                        scope="row"
                        className=" py-4 px-3 text-xs text-center font-normal text-gray-900 whitespace-nowrap "
                      >
                        {nilai.tahunMasuk}
                      </td>
                      <td
                        scope="row"
                        className="px-2 py-4   overflow-hidden line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap "
                      >
                        {nilai.alamat ? (
                          `${nilai.alamat}`
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
                        {nilai.phone}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

const Pagination = ({
  lastOfIndexnilai,
  firstOfindexnilai,
  pagination,
  handlePagination,
}) => {
  const pageNumber = [];

  const totalPage = pagination?.totalPage;
  const page = pagination?.page;

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
          pagination?.total === 0 ? 0 : firstOfindexnilai + 1 || 0
        } - ${
          page === totalPage
            ? pagination?.total
            : pagination?.total === 0
            ? 0
            : lastOfIndexnilai || 0
        } dari ${pagination?.total || 0} data`}</p>
      </div>
      <div className="flex-center space-x-4">
        {pagination?.total === 0 ? (
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

export default TableNilai;
