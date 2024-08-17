import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import profile from "../../assets/profile.png";
import { Plus, Trash, X } from "lucide-react";
import responseError from "@/util/services";
import { ALLOWED_FILE_TYPES, HOST, MAX_FILE_SIZE } from "@/util/constant";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const TambahSiswaPage = () => {
  const navigate = useNavigate();
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        HOST + "/api/siswa/add-siswa",
        {
          ...data,
          photo: image,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/admin/data-siswa");
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
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
          setImage(res.data.foto);
          e.target.value = null;
        }
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" mx-6 mb-16 bg-white  grid grid-cols-1 rounded-lg py-6 px-6 gap-8 lg:grid-cols-4">
      <div className=" flex justify-start  items-center flex-col">
        <div
          className="relative cursor-pointer w-[150px] overflow-hidden   h-[150px] rounded-full border-2  bg-white"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={image ? image : profile}
            alt="foto"
            className="w-full h-full object-cover bg-backup border-gray-500 rounded-full"
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
              className="absolute inset-0 bg-black/30 w-full h-full flex-center"
              onClick={image ? handleDeleteImage : handleClickInputImage}
            >
              {image ? (
                <X color="white" width={25} height={25} />
              ) : (
                <Plus color="white" width={25} height={25} />
              )}
            </div>
          )}
        </div>
        <p className="text-[0.625rem] text-neutral mt-8">
          Besar file maksimal 1 MB
        </p>
        <p className="text-[0.625rem] text-neutral mt-2">
          Ekstensi file: jpeg/jpg, png
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid mobile:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  md:gap-4 lg:gap-8 lg:col-span-3"
      >
        <div className="">
          <div className="mb-2">
            <label htmlFor="nama" className="text-xs mb-2 block font-semibold">
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
            <label htmlFor="nis" className="text-xs mb-2 block font-semibold">
              NIS <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              id="nis"
              name="nis"
              value={nis}
              {...register("nis", {
                required: "NIS tidak boleh kosong.",
              })}
              onChange={(e) => handleNumberChange(e, "nis")}
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
          <div className="mb-2">
            <label
              htmlFor="Tahun Masuk"
              className="text-xs mb-2 block font-semibold"
            >
              Tahun Masuk <span className="text-red-500">*</span>
            </label>
            <input
              type={"text"}
              id="Tahun Masuk"
              readOnly
              disabled
              name="tahunMasuk"
              value={tahunMasuk}
              {...register("tahunMasuk", {
                required:
                  "Tahun Masuk tidak boleh kosong. Silahkan atur tahun ajaran di Data Umum terlebih dulu",
              })}
              onChange={(e) => handleNumberChange(e, "tahunMasuk")}
              className="py-1.5 h-8 bg-gray-100 border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />

            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.tahunMasuk && errors.tahunMasuk.message}
            </span>
          </div>
        </div>
        <div className="">
          <div className="mb-2">
            <label htmlFor="Agama" className="text-xs mb-2 block font-semibold">
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
              type={"tel"}
              id="No. Telepon"
              name="phone"
              value={phone}
              {...register("phone", {
                required: "No. Telepon tidak boleh kosong.",
              })}
              onChange={(e) => handleNumberChange(e, "phone")}
              className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
            <span className="text-xs h-4 block mt-1 text-neutral2">
              {errors.phone && errors.phone.message}
            </span>
          </div>

          <div className="mb-2">
            <label htmlFor="kelas" className="text-xs mb-2 block font-semibold">
              Kelas
            </label>
            <select
              id="kelas"
              {...register("kelas")}
              className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
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
          {kelasNama.length !== 0 && (
            <>
              <div className="mb-2">
                <label
                  htmlFor="Nama Kelas"
                  className="text-xs mb-2 block font-semibold"
                >
                  Nama Kelas <span className="text-red-500">*</span>
                </label>
                <select
                  id="Nama Kelas"
                  {...register("namaKelas")}
                  className="py-1.5 h-8 bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                >
                  {kelasNama &&
                    kelasNama.map((kel) => {
                      return (
                        <>
                          <option
                            key={kel._id}
                            value={kel.nama}
                            className="rounded-md"
                          >
                            {kel.nama}
                          </option>
                          ;
                        </>
                      );
                    })}
                </select>
                <span className="text-xs h-4 block mt-1 text-neutral2">
                  {errors.namaKelas && errors.namaKelas.message}
                </span>
              </div>
            </>
          )}
          <div className="mb-3">
            <label
              htmlFor="Alamat"
              className="text-xs mb-2 block font-semibold"
            >
              Alamat
            </label>
            <textarea
              id="Alamat"
              {...register("alamat")}
              className="py-1.5 h-[116px] bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
            />
          </div>
          <div className="flex justify-end pt-8 gap-4 ">
            <Link to={"/admin/data-siswa"}>
              <button
                disabled={loading}
                type="button"
                className="btn  w-28 bg-gray-300 text-gray-800 hover:text-white disabled:cursor-not-allowed   border border-gray-500"
              >
                {loading ? "Loading" : "Batal"}
              </button>
            </Link>

            <button
              disabled={loading}
              type="submit"
              className="btn  disabled:cursor-not-allowed w-28 "
            >
              {loading ? "Loading" : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahSiswaPage;
