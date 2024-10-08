import { selectedDataEdit, setDataEdit } from "@/store/slices/admin-slice";
import { ALLOWED_FILE_TYPES, HOST, MAX_FILE_SIZE } from "@/util/constant";
import { formatDate } from "@/util/formatDate";
import responseError from "@/util/services";
import profile from "../../assets/profile.png";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Edit, Edit2, Plus, Trash, X } from "lucide-react";
import { selectedUserData, setUserData } from "@/store/slices/auth-slice";
import DropdownBidangStudi from "@/components/elements/DropdownBidangStudi";

const ProfileGuruPage = () => {
  const userData = useSelector(selectedUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PhotoRef = useRef();

  const [isNoEdit, setIsNoEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [photo, setPhoto] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nip: "",
      nama: "",
      tempatLahir: "",
      jenisKelamin: "",
      tanggalLahir: "",
      bidangStudi: "",
      status: "",
      phone: "",
      waliKelas: "",
      alamat: "",
    },
  });
  const nip = watch("nip");
  const tanggalLahir = watch("tanggalLahir");
  const bidangStudi = watch("bidangStudi");
  const status = watch("status");
  const waliKelas = watch("waliKelas");
  const phone = watch("phone");

  useEffect(() => {
    if (userData) {
      setValue("nip", userData.nip);
      setValue("nama", userData.nama);
      setValue("tempatLahir", userData.tempatLahir);
      setValue("tanggalLahir", formatDate(userData.tanggalLahir));
      setValue("status", userData.status);
      setValue("phone", userData.phone);
      setValue("jenisKelamin", userData.jenisKelamin);
      setValue("bidangStudi", userData.bidangStudi);
      setValue("alamat", userData.alamat);
      setValue("waliKelas", {
        kelas: userData?.waliKelas?.kelas,
        nama: userData?.waliKelas?.nama,
      });
      setPhoto(userData.photo);
    } else {
      navigate("guru/dashboard");
    }
  }, [userData]);

  const handleNumberChange = (e, name) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");

    setValue(name, cleanedValue);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        HOST + "/api/auth/update-profile",
        { ...data, photo },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        console.log(res.data.user);
        dispatch(setUserData(res.data.user));
        setIsNoEdit(true);
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return toast.error("Ektensi file tidak di dukung");
    } else if (file.size > MAX_FILE_SIZE) {
      return toast.error("Ukuran File Maksimal 1 MB.");
    } else {
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
          setPhoto(res.data.foto);
          e.target.value = null;
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeStatus = (e) => {
    if (e.target.checked) {
      setValue("status", false);
    } else {
      setValue("status", true);
    }
  };

  const handleDeleteImage = () => {
    setPhoto("");
  };
  const handleClickInputImage = () => {
    PhotoRef.current.click();
  };

  return (
    <section className="mx-6 mb-10">
      <div className="flex-between mt-4 border-b  bg-white  p-4 rounded-tl-lg rounded-tr-lg">
        <div>
          <h1 className="text-neutral mb-1 font-semibold">Data Pribadi Anda</h1>
          <p className="text-xs font-medium text-gray-500">
            Lihat dan Kelola Data Pribadi Anda.
          </p>
        </div>
        <div>
          {isNoEdit ? (
            <button
              disabled={loading}
              onClick={() => setIsNoEdit(false)}
              type="button"
              className="btn disabled:cursor-not-allowed  w-28 "
            >
              {loading ? (
                "Loading"
              ) : (
                <span className="flex-center gap-2">
                  <Edit2 width={12} height={12} />
                  Edit
                </span>
              )}
            </button>
          ) : (
            <div className="flex justify-end gap-4 ">
              <button
                disabled={loading}
                type="button"
                onClick={() => setIsNoEdit(true)}
                className="btn  w-28 bg-white border border-neutral text-gray-800  hover:text-white disabled:cursor-not-allowed    -gray-500"
              >
                {loading ? "Loading" : "Batal"}
              </button>

              <button
                disabled={loading}
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn disabled:cursor-not-allowed w-28 "
              >
                {loading ? "Loading" : "Simpan"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="    grid  bg-white grid-cols-1 rounded-bl-lg rounded-br-lg  py-12 px-6 gap-8 lg:grid-cols-4">
        <div className=" flex justify-start  items-center flex-col">
          <h3 className="mb-2 text-xs font-semibold">Foto Profile </h3>
          <div
            className="relative  w-[125px] border-2 h-[125px] rounded-full bg-backup mx-auto overflow-hidden"
            onMouseEnter={() => setIsHover(isNoEdit ? false : true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img
              src={photo ? photo : profile}
              alt="foto"
              className="w-full h-full object-cover  rounded-full"
            />
            <input
              type="file"
              name="image"
              ref={PhotoRef}
              className="hidden"
              id="image"
              accept=".jpg, .png, .jpeg"
              onChange={handleChangeImage}
            />

            {isHover && (
              <div
                className="absolute inset-0 cursor-pointer bg-black/30 w-full h-full flex-center"
                onClick={photo ? handleDeleteImage : handleClickInputImage}
              >
                {photo ? (
                  <X color="white" width={25} height={50} />
                ) : (
                  <Plus color="white" width={25} height={50} />
                )}
              </div>
            )}
          </div>
          <p className="text-[0.625rem] text-center mt-4 text-neutral">
            Besar file maksimal 1 MB
          </p>
          <p className="text-[0.625rem] text-center mt-2 text-neutral">
            Ekstensi file: jpeg/jpg, png
          </p>

          <div className="flex flex-col justify-center  mt-8">
            <p className="text-xs mb-2">Status</p>
            <div className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                id="toggle"
                disabled={isNoEdit}
                checked={status}
                onChange={handleChangeStatus}
                className="opacity-0 w-0 h-0 peer"
                {...register("status")}
              />
              <label
                htmlFor="toggle"
                className={`absolute cursor-pointer inset-0 bg-backup   rounded-full transition-colors duration-300 ${
                  status ? "bg-gray-700" : ""
                }`}
              ></label>
              <span
                className={`absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${
                  status ? "translate-x-6" : ""
                }`}
              ></span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid mobile:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  md:gap-4 lg:gap-8 lg:col-span-3"
        >
          <div className="">
            <div className="mb-2">
              <label
                htmlFor="nama"
                className="text-xs mb-2 block font-semibold"
              >
                Nama
              </label>
              <input
                readOnly={isNoEdit}
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
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600"
                } py-1.5 h-8 bg-white border-gray-300   text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.nama && errors.nama.message}
              </span>
            </div>
            <div className="mb-2">
              <label htmlFor="nis" className="text-xs mb-2 block font-semibold">
                NIP
              </label>
              <input
                readOnly={isNoEdit}
                type={"text"}
                id="nip"
                name="nip"
                value={nip}
                {...register("nip", {
                  required: "NIP tidak boleh kosong.",
                })}
                onChange={(e) => handleNumberChange(e, "nip")}
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600"
                } py-1.5 h-8  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />

              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.nip && errors.nip.message}
              </span>
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="text-xs mb-2 block font-semibold"
              >
                Password
              </label>
              <input
                readOnly={isNoEdit}
                type={"text"}
                id="password"
                placeholder="Password tidak ditampilkan demi keamanan"
                {...register("password", {
                  maxLength: {
                    value: 50,
                    message: "Password maksimal 20 karakter.",
                  },
                  minLength: {
                    value: 5,
                    message: "Password minimal 5 karakter.",
                  },
                })}
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600"
                } py-1.5 h-8  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="mb-2">
              <label
                htmlFor="tempatLahir"
                className="text-xs mb-2 block font-semibold"
              >
                Tempat Lahir
              </label>
              <input
                readOnly={isNoEdit}
                type={"text"}
                id="tempatLahir"
                {...register("tempatLahir", {
                  required: "Tempat Lahir tidak boleh kosong.",
                  maxLength: {
                    value: 50,
                    message: "Tempat Lahir maksimal 20 karakter.",
                  },
                })}
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600"
                } py-1.5 h-8  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.tempatLahir && errors.tempatLahir.message}
              </span>
            </div>
            <div className="mb-2 sm:mb-0 ">
              <label
                htmlFor="TanggalLahir"
                className="text-xs mb-2 block font-semibold"
              >
                Tanggal Lahir
              </label>

              <input
                readOnly={isNoEdit}
                type={`${isNoEdit ? "text" : "date"}`}
                id="TanggalLahir"
                value={tanggalLahir}
                {...register("tanggalLahir", {
                  required: "Tanggal Lahir tidak boleh kosong.",
                })}
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600"
                } py-1.5 h-8  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.tanggalLahir && errors.tanggalLahir.message}
              </span>
            </div>
          </div>

          <div className="">
            <div className="mb-2">
              <label
                htmlFor="No. Telepon"
                className="text-xs mb-2 block font-semibold"
              >
                No. Telepon
              </label>
              <input
                readOnly={isNoEdit}
                type={"tel"}
                id="No. Telepon"
                name="phone"
                value={phone}
                {...register("phone", {
                  required: "No. Telepon tidak boleh kosong.",
                })}
                onChange={(e) => handleNumberChange(e, "phone")}
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600"
                } py-1.5 h-8  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.phone && errors.phone.message}
              </span>
            </div>
            <div className="mb-2">
              <label
                htmlFor="Jenis Kelamin"
                className="text-xs mb-2 block font-semibold"
              >
                Jenis Kelamin
              </label>
              {isNoEdit ? (
                <input
                  readOnly={isNoEdit}
                  type="text"
                  {...register("jenisKelamin", {
                    required: "Jenis Kelamin tidak boleh kosong.",
                  })}
                  className="py-1.5 h-8  bg-white  text-gray-500 text-xs  w-full rounded-md focus-within:outline-none "
                />
              ) : (
                <select
                  id="Jenis Kelamin"
                  {...register("jenisKelamin", {
                    required: "Jenis Kelamin tidak boleh kosong.",
                  })}
                  className={`${
                    isNoEdit
                      ? "focus-within:border-white border-white border-b-2"
                      : "border-b-2 focus-within:border-blue-600"
                  } py-1.5 h-8  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              )}
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.jenisKelamin && errors.jenisKelamin.message}
              </span>
            </div>

            <div className="mb-8">
              <label
                htmlFor="Alamat"
                className="text-xs mb-2 block font-semibold"
              >
                Alamat
              </label>

              <input
                readOnly={isNoEdit}
                type="text"
                {...register("alamat")}
                className={`${
                  isNoEdit
                    ? "focus-within:border-white border-white border-b-2"
                    : "border-b-2 focus-within:border-blue-600 "
                } py-1.5 h-[12]  bg-white border-gray-300    text-gray-500 text-xs  w-full  focus-within:outline-none`}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="bidangStudi"
                className="text-xs mb-2 block font-semibold"
              >
                Bidang Studi
              </label>
              <DropdownBidangStudi disabled={true} />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.bidangStudi && errors.bidangStudi.message}
              </span>
            </div>
            <div className="">
              <label
                htmlFor="waliKelas"
                className="text-xs mb-2 block font-semibold"
              >
                Wali Kelas
              </label>
              <input
                type={"text"}
                id="waliKelas"
                name="waliKelas"
                value={
                  `${waliKelas?.kelas} ${waliKelas?.nama}` ||
                  "Tidak sebagai wali kelas."
                }
                readOnly
                className="py-1.5 h-8  bg-white  text-gray-500 text-xs  w-full rounded-md focus-within:outline-none "
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.waliKelas && errors.waliKelas.message}
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileGuruPage;
