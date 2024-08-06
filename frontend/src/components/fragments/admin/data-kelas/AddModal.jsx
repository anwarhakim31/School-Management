import HeaderModal from "@/components/elements/HeaderModal";
import LoaderButton from "@/components/elements/LoaderButton";
import Modal from "@/components/elements/Modal";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const nis = watch("kelas");

  const handleChangeKelas = (e, name) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");

    setValue(name, cleanedValue);
  };

  console.log(nis);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(HOST + "/api/kelas/add-kelas", data, {
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
        className="w-full sm:max-w-[425px] max-h-[400px] rounded-md shadow-md bg-white"
      >
        <div className="px-6 py-4 border-b">
          <HeaderModal
            titile={"Tambah Kelas"}
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
                type="text"
                name="kelas"
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
                onChange={(e) => handleChangeKelas(e, "kelas")}
                className="w-full border text-xs px-2 py-1.5 rounded-lg  outline-neutral border-gray-500"
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
                className="w-full border text-xs px-2 py-1.5 rounded-lg  outline-neutral border-gray-500"
              />
              <span className="text-xs h-4 text-neutral2 block">
                {errors.nama && errors.nama.message}
              </span>
            </div>
          </div>
          <div className="mb-4 px-6">
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
              className="w-full border text-xs px-2 py-1.5 rounded-lg  outline-neutral border-gray-500"
            />
            <span className="text-xs font-medium h-4 mt-1 block">
              (opsional)
            </span>
          </div>
          {/* <div className="px-6">
            <label
              htmlFor="wali"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Wali Kelas
            </label>
            <input
              id="wali"
              type="text"
              {...register("waliKelas")}
              className="w-full border text-xs px-2 py-1.5 rounded-lg  outline-neutral border-gray-500"
            />
            <span className="text-xs font-medium h-4 mt-1 block">
              (opsional)
            </span>
          </div> */}

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
