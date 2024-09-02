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
import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";
import DropdownSiswa from "@/components/elements/DropdownSiswa";
import DropdownCategoryNilai from "@/components/elements/DropdownCategoryNilai";
import { selectedDataEdit } from "@/store/slices/admin-slice";

const EditModal = ({ onClose, pertemuan }) => {
  const userData = useSelector(selectedUserData);
  const dataEdit = useSelector(selectedDataEdit);
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
      kelas: "",
      pertemuan: "",
      nilai: "",
      semester: "",
      tahunAjaran: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        HOST + "/api/nilaiPertemuan/update-nilai/" + dataEdit._id,
        {
          siswa: data.siswa,
          mataPelajaran: data.mataPelajaran,
          pertemuan: data.pertemuan,
          nilai: data.nilai,
          semester: data.semester,
          tahunAjaran: data.tahunAjaran,
          kelas: data.kelas,
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

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const [resAjaran, resSemester] = await Promise.all([
          axios.get(HOST + "/api/ajaran/get-ajaran-aktif", {
            withCredentials: true,
          }),
          axios.get(HOST + "/api/master/get-semester", {
            withCredentials: true,
          }),
        ]);

        if (resAjaran.status === 200) {
          setValue("tahunAjaran", resAjaran.data.ajaran.ajaran);
        }

        if (resSemester.status === 200) {
          setValue("semester", resSemester.data.semester.keterangan);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue("mataPelajaran", dataEdit.mataPelajaran._id);
      setValue("nilai", dataEdit.nilai);
      setValue("pertemuan", dataEdit.pertemuan);
      setValue("siswa", dataEdit.siswa);
      setValue("kelas", dataEdit.kelas._id);
      setValue("semester", dataEdit.semester);
      setValue("tahunAjaran", dataEdit.tahunAjaran);
    }
  }, [userData, pertemuan]);

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[400px] max-h-screen sm:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 sm:static border-b">
          <HeaderModal
            titile={`Tambah Nilai Pertemuan Kelas ${dataEdit?.kelas?.kelas} ${dataEdit?.kelas?.nama}`}
            onClose={onClose}
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
              render={({ field: { onChange } }) => (
                <DropdownMapel
                  value={userData.bidangStudi}
                  onChange={onChange}
                  url={`/api/guru/get-bidangStudi`}
                  disabled={true}
                  readOnly={true}
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
                Pertemuan
              </label>
              <input
                type="text"
                {...register("pertemuan")}
                className="block w-full disabled:pointer-events-none disabled:bg-gray-100 text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline "
                readOnly
                disabled
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
                className="block w-full text-xs disabled:pointer-events-none disabled:bg-gray-100 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline "
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
                className="block w-full text-xs bg-white border disabled:pointer-events-none disabled:bg-gray-100 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline "
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
