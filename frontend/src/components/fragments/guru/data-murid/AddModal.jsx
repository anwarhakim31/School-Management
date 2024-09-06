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

const AddModal = ({ onClose, kelas }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nis: "",
      nama: "",
      tempatLahir: "",
      jenisKelamin: "",
      tanggalLahir: "",
      tahunMasuk: "",
      agama: "",
      phone: "",
      kelas: "",
      alamat: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [foto, setFoto] = useState("");
  const submitRef = useRef();
  const fotoRef = useRef();
  const nis = watch("nis");
  const phone = watch("phone");

  useEffect(() => {
    if (kelas) {
      setValue("kelas", kelas.kelas);
      setValue("namaKelas", kelas.nama);
    }
  }, [kelas]);

  useEffect(() => {
    const getAjaran = async () => {
      try {
        const res = await axios.get(HOST + "/api/ajaran/get-ajaran-aktif", {
          withCredentials: true,
        });

        if (res.data.ajaran) {
          setValue("tahunMasuk", res.data.ajaran.ajaran);
        }
      } catch (error) {
        responseError(error);
      }
    };

    getAjaran();
  }, []);

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("image", file);
      setLoading(true);
      try {
        const res = await axios.post(
          HOST + "/api/siswa/upload-photo-siswa",
          formData,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setFoto(res.data.foto);
          e.target.value = null;
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNumberChange = (e, name) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");
    setValue(name, cleanedValue);
  };

  const handleFotoClick = () => {
    if (foto) {
      setFoto("");
    } else {
      fotoRef.current.click();
    }
  };

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

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-[700px] max-h-screen sm:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 sm:static border-b">
          <HeaderModal
            titile={"Tambah Siswa"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <div className="grid grid-cols-1 w-full sm:grid-cols-3  gap-4 p-4 ">
          <div className="">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="relative cursor-pointer w-[100px] border-2 h-[100px] rounded-full bg-backup mx-auto overflow-hidden"
            >
              <img
                src={foto ? foto : user}
                alt="foto"
                className="w-full h-full  object-cover object-center"
              />

              {hover && (
                <div
                  className="absolute inset-0 bg-black/30 flex-center"
                  onClick={handleFotoClick}
                >
                  {foto ? (
                    <X width={25} height={50} className="text-white" />
                  ) : (
                    <Plus width={25} height={25} className="text-white" />
                  )}
                </div>
              )}
              <input
                ref={fotoRef}
                type="file"
                disabled={loading}
                id="image"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={handleFotoChange}
                className="hidden"
              />
            </div>
            <p className="text-[0.625rem] text-center mt-4 text-neutral">
              Besar file maksimal 1 MB
            </p>
            <p className="text-[0.625rem] text-center mt-2 text-neutral">
              Ekstensi file: jpeg/jpg, png
            </p>
          </div>
          <form className=" col-span-2 w-full   grid grid-cols-2 gap-x-4">
            <div>
              <div className="mb-2">
                <label
                  htmlFor="nama"
                  className="text-xs mb-2 block font-semibold"
                >
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  {...register("nama", {
                    required: "Nama diperlukan.",
                    maxLength: {
                      value: 50,
                      message: "Nama maksimal 50 karakter.",
                    },
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.nama && errors.nama.message}
                </span>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="nis"
                  className="text-xs mb-2 block font-semibold"
                >
                  NIS <span className="text-red-500">*</span>
                </label>
                <input
                  type={"number"}
                  id="nis"
                  name="nis"
                  value={nis}
                  {...register("nis", {
                    required: "NIS diperlukan.",
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />

                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.nis && errors.nis.message}
                </span>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="text-xs mb-2 block font-semibold"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={"text"}
                  id="password"
                  {...register("password", {
                    required: "Password diperlukan.",
                    maxLength: {
                      value: 50,
                      message: "Password maksimal 20 karakter.",
                    },
                    minLength: {
                      value: 5,
                      message: "Password minimal 5 karakter.",
                    },
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.password && errors.password.message}
                </span>
              </div>
              <div className="">
                <label
                  htmlFor="Jenis Kelamin"
                  className="text-xs mb-2 block font-semibold"
                >
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  id="Jenis Kelamin"
                  {...register("jenisKelamin", {
                    required: "Jenis Kelamin diperlukan.",
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.jenisKelamin && errors.jenisKelamin.message}
                </span>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label
                  htmlFor="tempatLahir"
                  className="text-xs mb-2 block font-semibold"
                >
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type={"text"}
                  id="tempatLahir"
                  {...register("tempatLahir", {
                    required: "Tempat Lahir diperlukan.",
                    maxLength: {
                      value: 50,
                      message: "Tempat Lahir maksimal 20 karakter.",
                    },
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.tempatLahir && errors.tempatLahir.message}
                </span>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="TanggalLahir"
                  className="text-xs mb-2 block font-semibold"
                >
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  id="TanggalLahir"
                  {...register("tanggalLahir", {
                    required: "Tanggal Lahir diperlukan.",
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.tanggalLahir && errors.tanggalLahir.message}
                </span>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Agama"
                  className="text-xs mb-2 block font-semibold"
                >
                  Agama <span className="text-red-500">*</span>
                </label>
                <select
                  id="Agama"
                  onChange={(e) => handleNumberChange(e, "agama")}
                  {...register("agama", {
                    required: "Agama tidak boleh kosong..",
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500   text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                >
                  <option value="" className="">
                    Pilih agama
                  </option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen Protestan">Kristen Protestan</option>
                  <option value="Kristen Katolik">Kristen Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Budha">Budha</option>
                  <option value="Kong Hu Chu">Kong Hu Chu</option>
                  <option value="Aliran Kepercayaan">Aliran Kepercayaan</option>
                </select>
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.agama && errors.agama.message}
                </span>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="No. Telepon"
                  className="text-xs mb-2 block font-semibold"
                >
                  No. Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type={"number"}
                  id="No. Telepon"
                  autoComplete="off"
                  name="phone"
                  value={phone}
                  {...register("phone", {
                    required: "No. Telepon diperlukan.",
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.phone && errors.phone.message}
                </span>
              </div>
            </div>
            <div className="mb-2 col-span-2">
              <label
                htmlFor="alamat"
                className="text-xs mb-2 block font-semibold"
              >
                Alamat
              </label>
              <textarea
                type={"text"}
                id="alamat"
                name="alamat"
                {...register("alamat")}
                className="py-1.5 h-14 bg-white border  text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
              />
            </div>
          </form>
        </div>
        <div className="text-end border-t  p-4 space-x-4">
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

export default AddModal;
