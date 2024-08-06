import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    // setLoading(true);
    // try {
    //   const res = await axios.post(HOST + "/api/kelas/add-kelas", data, {
    //     withCredentials: true,
    //   });
    //   if (res.status === 200) {
    //     toast.success(res.data.message);
    //     onClose();
    //   }
    // } catch (error) {
    //   responseError(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[375px] max-h-[400px] rounded-md shadow-md bg-white"
      >
        <div className="p-4 border-b">
          <HeaderModal
            titile={"Tambah Pelajaran"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className="mb-4 px-4">
            <label
              htmlFor="kode"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Kode Mata Pelajaran
            </label>
            <input
              type="text"
              name="kode"
              {...register("kode", {
                required: "Kode tidak boleh kosong.",
              })}
              className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
            />
            <span className="text-xs h-4 text-neutral2 block">
              {errors.kode && errors.kode.message}
            </span>
          </div>

          <div className="mb-4 px-4">
            <label
              htmlFor="nama"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Nama Mata Pelajaran
            </label>
            <input
              id="posisi"
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
