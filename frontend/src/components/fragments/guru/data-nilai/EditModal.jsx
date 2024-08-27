import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import responseError from "@/util/services";
import axios, { all } from "axios";
import { HOST } from "@/util/constant";
import { toast } from "sonner";
import DropdownMapel from "@/components/elements/DropdownMapel";
import DropdownGuru from "@/components/elements/DropdownGuru";
import DayDropdown from "@/components/elements/DayDropdown";
import KelasDropdown from "@/components/elements/KelasDropdown";
import NamaKelasDropdown from "@/components/elements/NamaKelasDropdown";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";
import DropdownSiswa from "@/components/elements/DropdownSiswa";
import DropdownCategoryNilai from "@/components/elements/DropdownCategoryNilai";
import { selectedDataEdit, setDataEdit } from "@/store/slices/admin-slice";

const EditModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectedUserData);
  const editData = useSelector(selectedDataEdit);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mataPelajaran: "",
      siswa: "",
      kategori: "Ujian",
      nilai: "",
      semester: "",
      tahunAjaran: "",
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setValue("mataPelajaran", editData.mataPelajaran._id);
      setValue("siswa", editData.siswa._id);
      setValue("kategori", editData.kategori);
      setValue("nilai", editData.nilai);
      setValue("semester", editData.semester);
      setValue("tahunAjaran", editData.tahunAjaran);
    }
  }, [editData]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        HOST + "/api/nilai/update-nilai/" + editData._id,
        {
          siswa: data.siswa,
          mataPelajaran: data.mataPelajaran,
          kategori: data.kategori,
          nilai: data.nilai,
          semester: data.semester,
          tahunAjaran: data.tahunAjaran,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        onClose();
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(setDataEdit(undefined));
    onClose();
  };

  return (
    <Modal onClose={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[400px] max-h-screen sm:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 sm:static border-b">
          <HeaderModal
            titile={"Edit Nilai"}
            onClose={handleClose}
            className={"font-semibold"}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className="px-4 mb-2 ">
            <label
              htmlFor="mataPelajaran"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Mata Pelajaran
            </label>
            <Controller
              name="mataPelajaran"
              control={control}
              rules={{ required: "Mata Pelajaran diperlukan." }}
              render={({ field: { onChange, value } }) => (
                <DropdownMapel
                  value={value}
                  onChange={onChange}
                  url={`/api/kelas/get-mapel-kelas/${userData.waliKelas._id}`}
                />
              )}
            />
            <span className="text-xs h-4 text-neutral2 block">
              {errors.mataPelajaran && errors.mataPelajaran.message}
            </span>
          </div>
          <div className="px-4 mb-2">
            <label
              htmlFor="siswa"
              className="text-xs w-fit mb-2 block font-semibold text-gray-700"
            >
              Siswa
            </label>
            <Controller
              name="siswa"
              control={control}
              rules={{ required: "Siswa diperlukan." }}
              render={({ field: { onChange, value } }) => (
                <DropdownSiswa
                  onChange={onChange}
                  value={value}
                  url={`/api/siswa/get-siswa/kelas/${userData.waliKelas._id}`}
                />
              )}
            />

            <span className="text-xs h-4 text-neutral2 block">
              {errors.siswa && errors.siswa.message}
            </span>
          </div>
          <div className="flex w-full ">
            <div className="px-4 mb-2 w-full">
              <label
                htmlFor="kategori"
                className="text-xs w-fit mb-2 block font-semibold text-gray-700"
              >
                Kategori Nilai
              </label>
              <Controller
                name="kategori"
                control={control}
                rules={{ required: "Kategori Nilai Diperlukan." }}
                render={({ field: { onChange } }) => (
                  <DropdownCategoryNilai onChange={onChange} />
                )}
              />

              <span className="text-xs h-4 text-neutral2 block">
                {errors.kategori && errors.kategori.message}
              </span>
            </div>
            <div className="px-4 mb-2 w-full">
              <label
                htmlFor="nilai"
                className="text-xs w-fit mb-2 block font-semibold text-gray-700"
              >
                Nilai
              </label>
              <input
                type="number"
                name=""
                className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline "
                id="nilai"
                {...register("nilai", {
                  required: "Nilai diperlukan.",
                  min: {
                    value: 0,
                    message: "Nilai tidak kurang dari 0",
                  },
                  max: {
                    value: 100,
                    message: "Nilai tidak lebih dari 100",
                  },
                })}
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.nilai && errors.nilai.message}
              </span>
            </div>
          </div>
          <div className="flex w-full ">
            <div className="px-4 mb-2 w-full">
              <label
                htmlFor="tahunAjaran"
                className="text-xs w-fit mb-2 block font-semibold text-gray-700"
              >
                Tahun Ajaran
              </label>

              <input
                type="text"
                name="tahunAjaran"
                {...register("tahunAjaran", {
                  required: "Tahun Ajaran di perlukan.",
                })}
                readOnly
                disabled
                className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline "
                id="tahunAjaran"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.tahunAjaran && errors.tahunAjaran.message}
              </span>
            </div>
            <div className="px-4 mb-2 w-full">
              <label
                htmlFor="semester"
                className="text-xs w-fit mb-2 block font-semibold text-gray-700"
              >
                Semester
              </label>
              <input
                type="text"
                name="semester"
                readOnly
                disabled
                {...register("semester")}
                className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline "
                id="nilai"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.semester && errors.semester.message}
              </span>
            </div>
          </div>
          <div className="text-end border-t mt-4 p-4 space-x-4">
            <button
              aria-label="simpan nilai"
              type="submit"
              disabled={loading}
              className="btn w-24 h-8.5"
            >
              {loading ? "Loading" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
