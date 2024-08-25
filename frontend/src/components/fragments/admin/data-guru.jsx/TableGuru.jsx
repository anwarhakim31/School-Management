import { Checkbox } from "@/components/ui/checkbox";
import {
  selectedDataDeleteMany,
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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TableGuru = ({
  data,
  limit,
  page,
  totalPage,
  totalGuru,
  handlePagination,
  handleToggleDeleteOne,
  setAllCheck,
  allCheck,
  loading,
}) => {
  const lastOfIndexguru = page * limit;
  const firstOfindexguru = lastOfIndexguru - limit;
  const [dataChecked, setDataChecked] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("Succes mengambil data");
    });
  };

  const handleCheckboxChange = (checked, guru) => {
    if (checked) {
      setDataChecked((prev) => [...prev, guru._id]);
      dispatch(setDataDeleteMany([...dataChecked, guru._id]));
    } else {
      setDataChecked((prev) => prev.filter((id) => id !== guru._id));
      dispatch(setDataDeleteMany(dataChecked.filter((id) => id !== guru._id)));
    }
  };

  const handleCheckboxAll = (checked) => {
    setAllCheck(!allCheck);

    if (checked) {
      setDataChecked(data.map((guru) => guru._id));
      dispatch(setDataDeleteMany(data.map((guru) => guru._id)));
    } else {
      setDataChecked([]);
      dispatch(setDataDeleteMany([]));
    }
  };

  const handleDeleteguru = (data) => {
    handleToggleDeleteOne();
    dispatch(setDataDelete(data));
  };

  const handleEditguru = (data) => {
    dispatch(setDataEdit(data));
    navigate("/admin/edit-guru");
  };

  return (
    <>
      <div className="block w-full shadow-md pb-[3.5rem]">
        <div className="w-full min-h-[455px]  overflow-auto ">
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
                <th scope="col" className="px-4 py-4">
                  NIP
                </th>
                <th scope="col" className="px-4 py-4">
                  Nama
                </th>
                <th scope="col" className=" py-4 whitespace-nowrap">
                  Jenis Kelamin
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left whitespace-nowrap"
                >
                  Bidang Studi
                </th>
                {/* <th
                  scope="col"
                  className="px-4 py-4 text-left whitespace-nowrap"
                >
                  Alamat
                </th> */}
                <th scope="col" className="py-4 text-center">
                  Kontak
                </th>
                <th
                  scope="Kelas"
                  className="text-center px-4 py-4 whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  scope="Kelas"
                  className="text-center px-4 py-4 whitespace-nowrap"
                >
                  Wali Kelas
                </th>
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data && !loading && data.length === 0 && (
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
                data.map((guru, i) => (
                  <tr
                    key={guru.nip}
                    className={` hover:bg-gray-100 border-b  `}
                  >
                    <td scope="row" className="px-3 py-3 relative">
                      <Checkbox
                        type="checkbox"
                        name=""
                        checked={dataChecked.includes(guru._id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(checked, guru)
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
                      {guru.nip}
                    </td>

                    <td
                      scope="row"
                      className=" px-4 py-5  line-clamp-1 text-xs font-normal text-gray-900 whitespace-nowrap  "
                    >
                      {guru.nama}
                    </td>
                    <td
                      scope="row"
                      className="py-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {guru.jenisKelamin}
                    </td>
                    <td
                      scope="row"
                      className="py-4 px-4 text-xs font-normal text-gray-900 whitespace-nowrap "
                    >
                      {guru?.bidangStudi?.nama ? (
                        guru.bidangStudi.nama
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
                          title={guru.phone}
                          onClick={() => HandleCopyText(guru.phone)}
                        >
                          <Phone strokeWidth={1} width={15} height={15} />
                        </div>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className={`   py-4 px-8 max-w-full text-center text-xs font-normal whitespace-nowrap text-gray-900 `}
                    >
                      <span
                        className={`${
                          guru.status ? "bg-gray-700" : "bg-gray-600"
                        } px-4 py-1 text-white rounded-full`}
                      >
                        {" "}
                        {guru.status ? "Aktif" : "Non Aktif"}
                      </span>
                    </td>
                    <td
                      scope="row"
                      className=" py-4 px-8 max-w-full text-center text-xs font-normal whitespace-nowrap text-gray-900 "
                    >
                      {guru.waliKelas ? (
                        `${guru.waliKelas.kelas} ${guru.waliKelas.nama}`
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
                          onClick={() => handleEditguru(guru)}
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
                          onClick={() => handleDeleteguru(guru)}
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
        <Pagination
          lastOfIndexguru={lastOfIndexguru}
          firstOfindexguru={firstOfindexguru}
          limit={limit}
          page={page}
          totalPage={totalPage}
          data={data}
          totalGuru={totalGuru}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
};

const Pagination = ({
  lastOfIndexguru,
  firstOfindexguru,
  limit,
  data,
  page,
  totalGuru,
  handlePagination,
  totalPage,
}) => {
  const pageNumber = [];

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
          totalGuru === 0 ? 0 : firstOfindexguru + 1
        } - ${
          page === totalPage ? totalGuru : totalGuru === 0 ? 0 : lastOfIndexguru
        } dari ${totalGuru} data`}</p>
      </div>
      <div className="flex-center space-x-4">
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
      </div>
    </div>
  );
};

export default TableGuru;
