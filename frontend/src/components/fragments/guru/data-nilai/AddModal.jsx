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

const AddModal = ({ onClose }) => {
  const userData = useSelector(selectedUserData);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bidangStudi: "",
      guru: "",
      kelas: "",
      namaKelas: "",
      hari: "",
      start: undefined,
      end: undefined,
      jumlahPertemuan: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const bidangStudi = watch("bidangStudi");
  const kelas = watch("kelas");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        HOST + "/api/jadwal/add-jadwal",
        {
          guru: data.guru,
          kelas: data.namaKelas,
          bidangStudi: data.bidangStudi.id,
          mulai: data.start,
          selesai: data.end,
          hari: data.hari,
          jumlahPertemuan: data.jumlahPertemuan,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        onClose();
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(userData.waliKelas);

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[470px] max-h-screen sm:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 sm:static border-b">
          <HeaderModal
            titile={"Tambah Nilai"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className="px-4 mb-2 ">
            <label
              htmlFor="mapel"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Bidang Studi
            </label>
            <Controller
              name="bidangStudi"
              control={control}
              rules={{ required: "Bidang studi diperlukan." }}
              render={({ field: { onChange, value } }) => (
                <DropdownMapel
                  value={value}
                  onChange={onChange}
                  url={`/api/kelas/get-mapel-kelas/${userData.waliKelas._id}`}
                />
              )}
            />
            <span className="text-xs h-4 text-neutral2 block">
              {errors.bidangStudi && errors.bidangStudi.message}
            </span>
          </div>
          <div className="px-4 mb-2">
            <label
              htmlFor="guru"
              className="text-xs w-fit mb-2 block font-semibold text-gray-700"
            >
              Guru
            </label>
            <Controller
              name="guru"
              control={control}
              rules={{ required: "Guru diperlukan." }}
              render={({ field: { onChange, value } }) => (
                <DropdownGuru
                  bidangStudi={bidangStudi.id}
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <span className="text-xs h-4 text-neutral2 block">
              {errors.guru && errors.guru.message}
            </span>
          </div>

          <div className="text-end border-t mt-4 p-4 space-x-4">
            <button
              aria-label="simpan kelas"
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

export default AddModal;
