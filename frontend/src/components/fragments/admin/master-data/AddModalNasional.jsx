import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddModalNasional = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        HOST + "/api/libur/add-nasional",
        { data },
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
        className="w-full relative sm:max-w-[425px] max-h-[400px] rounded-lg shadow-md bg-white"
      >
        <div className="px-6 py-4 border-b">
          <HeaderModal
            titile={"Tambah Libur Nasional"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className=" mb-2 px-6">
            <div className="w-full mb-2">
              <label
                htmlFor="tanggal"
                className="text-xs mb-2 block font-semibold text-gray-700"
              >
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                min={1}
                {...register("tanggal", {
                  required: "Tanggal diperlukan.",
                })}
                className=" border w-full text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.tanggal && errors.tanggal.message}
              </span>
            </div>
            <div className="w-full mb-2">
              <label
                htmlFor="keterangan"
                className="text-xs mb-2 block font-semibold text-gray-700"
              >
                Keterangan Libur
              </label>
              <input
                type="text"
                name="keterangan"
                {...register("keterangan", {
                  required: "Keterangan diperlukan.",
                })}
                className=" border w-full text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.keterangan && errors.keterangan.message}
              </span>
            </div>
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

export default AddModalNasional;
