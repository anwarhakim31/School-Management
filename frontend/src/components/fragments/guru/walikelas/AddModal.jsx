import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import user from "../../../../assets/profile.png";
import React, { useRef, useState } from "react";
import { LucideTrash2, Plus } from "lucide-react";
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
  const [hover, setHover] = useState(false);
  const [foto, setFoto] = useState("");
  const fotoRef = useRef();

  const handleFotoChange = async (e) => {};

  const handleFotoClick = () => {
    if (foto) {
      setFoto("");
    } else {
      fotoRef.current.click();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[700px] max-h-screen xs:max-h-none overflow-auto rounded-lg shadow-md bg-white"
      >
        <div className="p-4 sticky top-0 bg-white z-20 xs:static border-b">
          <HeaderModal
            titile={"Tambah Siswa"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <div className="grid grid-cols-1 w-full md:grid-cols-3  gap-4 p-4 ">
          <div className="">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="relative w-[80px] cursor-pointer h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-backup mx-auto overflow-hidden"
            >
              <img
                src={foto ? foto : user}
                alt="foto"
                className="w-full h-full  object-cover object-bottom"
              />

              {hover && (
                <div
                  className="absolute inset-0 bg-black/30 flex-center"
                  onClick={handleFotoClick}
                >
                  {foto ? (
                    <LucideTrash2
                      width={50}
                      height={50}
                      className="text-white"
                    />
                  ) : (
                    <Plus width={50} height={50} className="text-white" />
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
            <p className="text-[0.625rem] text-center mt-4 text-neutral2">
              Besar file maksimal 1 MB
            </p>
            <p className="text-[0.625rem] text-center mt-2 text-neutral2">
              Ekstensi file: jpeg/jpg, png
            </p>
          </div>
          <div className=" col-span-2 w-full   grid grid-cols-2 gap-4">
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
                    required: "Nama tidak boleh kosong.",
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
                  type={"text"}
                  id="nis"
                  name="nis"
                  // value={nis}
                  {...register("nis", {
                    required: "NIS tidak boleh kosong.",
                  })}
                  // onChange={(e) => handleNumberChange(e, "nis")}
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
                    required: "Password tidak boleh kosong.",
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
                    required: "Jenis Kelamin tidak boleh kosong.",
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
                    required: "Tempat Lahir tidak boleh kosong.",
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
                    required: "Tanggal Lahir tidak boleh kosong.",
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.tanggalLahir && errors.tanggalLahir.message}
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
                  type={"tel"}
                  id="No. Telepon"
                  name="phone"
                  //   value={phone}
                  {...register("phone", {
                    required: "No. Telepon tidak boleh kosong.",
                  })}
                  //   onChange={(e) => handleNumberChange(e, "phone")}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.phone && errors.phone.message}
                </span>
              </div>
              <div className="">
                <label
                  htmlFor="Email"
                  className="text-xs mb-2 block font-semibold"
                >
                  Email
                </label>
                <input
                  type={"email"}
                  id="Email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format email tidak valid",
                    },
                  })}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                />
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.email && errors.email.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end border-t  p-4 space-x-4">
          <button
            aria-label="batal"
            type="submit"
            disabled={loading}
            className="btn w-24 h-8.5 bg-gray-100 disabled:bg-gray-200  text-gray-800 border-gray-200 border hover:text-white"
            onClick={() => onClose()}
          >
            {loading ? "Loading" : "Batal"}
          </button>
          <button
            aria-label="ya"
            type="submit"
            disabled={loading}
            // onClick={handleDelete}
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
