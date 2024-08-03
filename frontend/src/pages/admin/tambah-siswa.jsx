import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import profile from "../../assets/profile.png";
import { Plus, Trash } from "lucide-react";
import responseError from "@/util/services";
import { ALLOWED_FILE_TYPES, HOST, MAX_FILE_SIZE } from "@/util/constant";
import axios from "axios";
import { toast } from "sonner";

const TambahSiswaPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState("");
  const [kelasDB, setKelasDB] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [kelasNama, setKelasName] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const nis = watch("nis", "");
  const phone = watch("phone", "");
  const selectedValue = watch("kelas");
  const tahunMasuk = watch("tahunMasuk", "");

  const PhotoRef = useRef();

  const handleNumberChange = (e, name) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");
    setValue(name, cleanedValue);
  };

  const handleClickInputImage = () => {
    PhotoRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage("");
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];

    if (!file.type.includes(ALLOWED_FILE_TYPES)) {
      return toast.error("Ektensi file tidak di dukung");
    } else if (file.size > MAX_FILE_SIZE) {
      return toast.error("Ukuran File Maksimal 1 MB.");
    } else {
      const formData = new FormData();

      formData.append("image", file);

      try {
        const res = await axios.post(
          HOST + "/api/siswa/upload-photo-siswa",
          formData,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setImage(res.data.foto);
          e.target.value = null;
        }
      } catch (error) {
        responseError(error);
      }
    }
  };

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas", {
          withCredentials: true,
        });

        setKelasDB(res.data.kelas);
      } catch (error) {
        responseError(error);
      }
    };

    getKelas();
  }, []);

  useEffect(() => {
    const seen = {};
    const uniqueKelas = [];

    for (const kel of kelasDB) {
      if (!seen[kel.kelas]) {
        seen[kel.kelas] = true;
        uniqueKelas.push(kel);
      }
    }

    setKelas(uniqueKelas);

    const nama = kelasDB
      .filter((kel) => {
        return kel.kelas === Number(selectedValue);
      })
      .sort((a, b) => a.nama.localeCompare(b.nama));

    setKelasName(nama);
  }, [kelasDB, selectedValue]);

  return (
    <div className="h-full mx-6 mb-16 bg-white  grid grid-cols-1 rounded-lg py-4 px-6 gap-8 lg:grid-cols-4">
      <div className=" flex justify-start  items-center flex-col">
        <div
          className="relative cursor-pointer w-[150px] overflow-hidden   h-[150px] rounded-full border  bg-white"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={image ? image : profile}
            alt="foto"
            className="w-full h-full object-cover bg-gray-300 border-gray-500 rounded-full"
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
          {!image && (
            <div className="absolute inset-0 bg-black/30 w-full h-full flex-center">
              <p></p>
            </div>
          )}
          {isHover && (
            <div
              className="absolute inset-0 bg-black/30 w-full h-full flex-center"
              onClick={image ? handleDeleteImage : handleClickInputImage}
            >
              {image ? (
                <Trash color="white" width={20} height={20} />
              ) : (
                <Plus color="white" width={20} height={20} />
              )}
            </div>
          )}
        </div>
        <p className="text-xs mt-8">Besar file maksimal 1 MB</p>
        <p className="text-xs mt-2">Ekstensi file: jpeg/jpg, png</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid mobile:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  md:gap-4 lg:gap-8 lg:col-span-3"
      >
        <div className="">
          <div className="mb-2">
            <label htmlFor="nama" className="text-xs mb-2 block">
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
              className="py-1.5 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.nama && errors.nama.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="nis" className="text-xs mb-2 block">
              NIS <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              id="nis"
              name="nis"
              value={nis}
              {...register("nis", {
                required: "NIS diperlukan.",
              })}
              onChange={(e) => handleNumberChange(e, "nis")}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />

            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.nis && errors.nis.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-xs mb-2 block">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              id="password"
              {...register("password", {
                required: "Password di perlukan.",
                maxLength: {
                  value: 50,
                  message: "Password maksimal 20 karakter.",
                },
                minLength: {
                  value: 5,
                  message: "Password minimal 5 karakter.",
                },
              })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="tempatLahir" className="text-xs mb-2 block">
              Tempat Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              id="tempatLahir"
              {...register("tempatLahir", {
                required: "Tempat Lahir di perlukan.",
                maxLength: {
                  value: 50,
                  message: "TempatLahir maksimal 20 karakter.",
                },
              })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.tempatLahir && errors.tempatLahir.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="TanggalLahir" className="text-xs mb-2 block">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              id="TanggalLahir"
              {...register("tanggalLahir", {
                required: "Tanggal Lahir di perlukan,",
              })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.tanggalLahir && errors.tanggalLahir.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="Jenis Kelamin" className="text-xs mb-2 block">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              id="Jenis Kelamin"
              {...register("jenisKelamin", {
                required: "Jenis Kelamin di perlukan.",
              })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="laki-laki">Laki-Laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.kelaminKelamin && errors.kelaminKelamin.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="Tahun Masuk" className="text-xs mb-2 block">
              Tahun Masuk <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              inputMode="numeric"
              id="Tahun Masuk"
              name="tahunMasuk"
              value={tahunMasuk}
              onChange={(e) => handleNumberChange(e, "tahunMasuk")}
              {...register("tahunMasuk", {
                required: "Tahun Masuk diperlukan..",
              })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.tahunMasuk && errors.tahunMasuk.message}
            </span>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <label htmlFor="Agama" className="text-xs mb-2 block">
              Agama <span className="text-red-500">*</span>
            </label>
            <select
              id="Agama"
              onChange={(e) => handleNumberChange(e, "agama")}
              {...register("agama", {
                required: "Agama diperlukan..",
              })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            >
              <option value="">Pilih Agama</option>
              <option value="islam">Islam</option>
              <option value="islam">Kristen Protestan</option>
              <option value="islam">Kristen Katolik</option>
              <option value="islam">Hindu</option>
              <option value="islam">Budha</option>
              <option value="islam">Kong Hu Chu</option>
              <option value="islam">Aliran Kepercayaan</option>
            </select>
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.agama && errors.agama.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="No. Telepon" className="text-xs mb-2 block">
              No. Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type={"tel"}
              id="No. Telepon"
              name="phone"
              value={phone}
              {...register("phone", {
                required: "No. Telepon diperlukan.",
              })}
              onChange={(e) => handleNumberChange(e, "phone")}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.phone && errors.phone.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="Email" className="text-xs mb-2 block">
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
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="kelas" className="text-xs mb-2 block">
              Kelas <span className="text-red-500">*</span>
            </label>
            <select
              id="kelas"
              {...register("kelas", { required: "Kelas diperlukan." })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            >
              {kelasNama.length === 0 && <option value="">Pilih Kelas</option>}
              {kelas &&
                kelas.map((kel, i) => (
                  <option key={i} className="rounded-md" value={kel.kelas}>
                    {kel.kelas}
                  </option>
                ))}
            </select>
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.kelas && errors.kelas.message}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="Nama Kelas" className="text-xs mb-2 block">
              Nama Kelas <span className="text-red-500">*</span>
            </label>
            <select
              id="Nama Kelas"
              {...register("namaKelas", { required: "Nama Kelas diperlukan." })}
              className="py-1.5  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            >
              {kelasNama.length === 0 && (
                <option value="">Pilih Kelas Terlibih dulu</option>
              )}

              {kelasNama.length !== 0 &&
                kelasNama.map((kel) => (
                  <option key={kel._id} value={kel.nama} className="rounded-md">
                    {kel.nama}
                  </option>
                ))}
            </select>
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.namaKelas && errors.namaKelas.message}
            </span>
          </div>
          <div className="mb-8">
            <label htmlFor="Alamat" className="text-xs mb-2 block">
              Alamat
            </label>
            <textarea
              id="Alamat"
              className="py-1.5 h-[115px] bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
          </div>
        </div>
        <button type="submit" className="btn ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TambahSiswaPage;
