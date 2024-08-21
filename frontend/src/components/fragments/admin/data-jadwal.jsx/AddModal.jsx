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
import DropdownMapel from "@/components/elements/DropdownMapel";
import DropdownGuru from "@/components/elements/DropdownGuru";

const AddModal = ({ onClose, kelas }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bidangStudi: "",
      guru: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [foto, setFoto] = useState("");
  const submitRef = useRef();
  const fotoRef = useRef();
  const nis = watch("nis");
  const bidangStudi = watch("bidangStudi");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        HOST + "/api/siswa/add-siswa",
        {
          ...data,
          photo: foto,
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

  const onSelectMapel = (value) => {
    setValue("bidangStudi", value);
  };

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-[450px] max-h-screen sm:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 sm:static border-b">
          <HeaderModal
            titile={"Tambah Jadwal"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
          <div className="px-4">
            <label
              htmlFor="mapel"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Mata Pelajaran
            </label>
            <DropdownMapel
              htmlFor={"mapel"}
              onSelectMapel={onSelectMapel}
              register={register}
              name={"bidangStudi"}
              errors={errors}
            />
            <span className="text-xs h-4 text-neutral2 block">
              {errors.bidangStudi && errors.bidangStudi.message}
            </span>
          </div>
          <div className="px-4">
            <label
              htmlFor="guru"
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Guru
            </label>
            <DropdownGuru
              htmlFor={"guru"}
              bidangStudi={bidangStudi}
              //   onSelectMapel={onSelectMapel}
              //   register={register}
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
