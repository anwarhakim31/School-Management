import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import user from "../../../../assets/profile.png";
import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import responseError from "@/util/services";
import axios, { all } from "axios";
import { HOST } from "@/util/constant";
import { toast } from "sonner";

const EditKelasModal = ({ onClose, datas }) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      kelas: "",
      nama: "",
      posisi: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const submitRef = useRef();

  useEffect(() => {
    if (datas) {
      setValue("kelas", datas.kelas);
      setValue("nama", datas.nama);
      setValue("posisi", datas.posisi);
      setValue("waliKelas", datas.waliKelas);
    }
  }, [datas]);

  const onSubmit = async (data) => {
    console.log(datas);
    setLoading(true);
    try {
      const res = await axios.put(
        HOST + "/api/kelas/update-kelas/" + datas._id,
        {
          data,
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

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-[450px] max-h-screen sm:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 sm:static border-b">
          <HeaderModal
            titile={"Edit Kelas"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="mb-2">
            <label htmlFor="kelas" className="text-xs mb-2 block font-semibold">
              Kelas <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="kelas"
              name="kelas"
              {...register("kelas", {
                required: "Kelas diperlukan.",
                max: {
                  value: 12,
                  message: "Maksimal kelas adalah 12",
                },
              })}
              className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.kelas && errors.kelas.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="nama" className="text-xs mb-2 block font-semibold">
              Nama Kelas <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              {...register("nama", {
                required: "Nama Kelas diperlukan.",
                maxLength: {
                  value: 50,
                  message: "Nama Kelas maksimal 50 karakter.",
                },
              })}
              className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.nama && errors.nama.message}
            </span>
          </div>
          <div className="mb-2 col-span-2">
            <label
              htmlFor="posisi"
              className="text-xs mb-2 block font-semibold"
            >
              Posisi
            </label>
            <input
              type="text"
              id="posisi"
              name="posisi"
              {...register("posisi")}
              className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.posisi && errors.posisi.message}
            </span>
          </div>
        </div>

        <div className="text-end border-t  p-4 space-x-4">
          <button
            aria-label="batal"
            type="button"
            disabled={loading}
            className="btn w-24 h-8.5 bg-gray-100 disabled:bg-gray-200  text-gray-800 border-gray-200 border hover:text-white"
            onClick={() => onClose()}
          >
            {loading ? "Loading" : "Batal"}
          </button>
          <button
            aria-label="ya"
            type="submit"
            ref={submitRef}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="btn w-24 h-8.5 disabled:bg-gray-800"
          >
            {loading ? "Loading" : "Simpan"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditKelasModal;
