import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import { selectedDataEdit, setDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const EditModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dataEdit = useSelector(selectedDataEdit);
  const dispatch = useDispatch();
  const [guru, setGuru] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        HOST + "/api/kelas/update-kelas/" + dataEdit._id,
        data,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        onClose();
        dispatch(setDataEdit(undefined));
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const guru = async () => {
      setLoading(true);
      try {
        const res = await axios.get(HOST + "/api/guru/get-guru", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setGuru(res.data.guru);
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };
    guru();
  }, []);

  useEffect(() => {
    if (dataEdit) {
      setValue("kelas", dataEdit.kelas || "");
      setValue("nama", dataEdit.nama || "");
      setValue("posisi", dataEdit.posisi || "");
      setValue("waliKelas", dataEdit.waliKelas._id || "");
    }
  }, [dataEdit, guru]);

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[425px] max-h-[400px] rounded-md shadow-md bg-white"
      >
        <div className="p-4 px-6 border-b">
          <HeaderModal
            titile={"Edit Kelas"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className="flex-between gap-2 mb-2 px-6">
            <div className="">
              <label
                htmlFor="kelas"
                className="text-xs mb-2 block font-semibold text-gray-700"
              >
                Kelas
              </label>
              <input
                type="number"
                id="kelas"
                min={1}
                {...register("kelas", {
                  required: "Kelas tidak boleh kosong.",
                  min: {
                    value: 1,
                    message: "Manimum kelas 1",
                  },
                  max: {
                    value: 12,
                    message: "Maksimal kelas 12",
                  },
                })}
                className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.kelas && errors.kelas.message}
              </span>
            </div>
            <div className="">
              <label
                htmlFor="nama"
                className="text-xs mb-2 block font-semibold text-gray-700"
              >
                Nama
              </label>
              <input
                id="nama"
                type="text"
                {...register("nama", {
                  required: "Nama tidak boleh kosong.",
                  maxLength: {
                    value: 20,
                    message: "Nama maksimal 20 karakter.",
                  },
                })}
                className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.nama && errors.nama.message}
              </span>
            </div>
          </div>
          <div className="px-6 mb-4">
            <label
              htmlFor="wali"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Wali Kelas
            </label>
            <select
              id="wali"
              type="text"
              {...register("waliKelas")}
              className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
            >
              <option value="">Tidak ada Wali Kelas</option>
              {guru &&
                guru.map((gu) => (
                  <option key={gu._id} value={gu._id}>
                    {gu.nama}
                  </option>
                ))}
            </select>
            <span className="text-xs font-medium h-4 mt-1 block">
              (opsional)
            </span>
          </div>
          <div className=" px-6">
            <label
              htmlFor="nama"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Posisi Kelas
            </label>
            <input
              id="posisi"
              type="text"
              {...register("posisi")}
              className="w-full border text-xs px-2 py-1.5 rounded-md  outline-neutral border-gray-500"
            />
            <span className="text-xs font-medium h-4 mt-1 block">
              (opsional)
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

export default EditModal;
