import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(HOST + "/api/mapel/add-mapel", data, {
        withCredentials: true,
      });
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
        className="w-full sm:max-w-[400px] max-h-[400px] rounded-lg shadow-md bg-white"
      >
        <div className="py-4 px-6 border-b">
          <HeaderModal
            titile={"Tambah Mata Pelajaran"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className="mb-4 px-6">
            <label
              htmlFor="kode"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Kode Mata Pelajaran
            </label>
            <input
              type="text"
              id="kode"
              name="kode"
              autoFocus
              {...register("kode", {
                required: "Kode tidak boleh kosong.",
              })}
              className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
            />
            <span className="text-xs h-4 text-neutral2 block">
              {errors.kode && errors.kode.message}
            </span>
          </div>

          <div className="mb-4 px-6">
            <label
              htmlFor="nama"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Nama Mata Pelajaran
            </label>
            <input
              id="nama"
              type="text"
              {...register("nama", {
                required: "Nama Mata Pelajaran tidak boleh kosong.",
              })}
              className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
            />
            <span className="text-xs h-4 text-neutral2 block">
              {errors.nama && errors.nama.message}
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
