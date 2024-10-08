import { selectedDataEdit, setDataEdit } from "@/store/slices/admin-slice";
import { ALLOWED_FILE_TYPES, HOST, MAX_FILE_SIZE } from "@/util/constant";
import { formatDate } from "@/util/formatDate";
import responseError from "@/util/services";
import profile from "../../assets/profile.png";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import DropdownBidangStudi from "@/components/elements/DropdownBidangStudi";

const EditGuruPage = () => {
  const PhotoRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editData = useSelector(selectedDataEdit);
  const [mapel, setMapel] = useState([]);
  const [kelasDB, setKelasDB] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [kelasNama, setKelasNama] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [photo, setPhoto] = useState("");

  const {
    control,
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
      kelas: "",
      alamat: "",
    },
  });
  const nip = watch("nip");
  const tanggalLahir = watch("tanggalLahir");
  const status = watch("status");
  const phone = watch("phone");
  const selectKelas = watch("kelas");

  useEffect(() => {
    setLoading(true);
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas", {
          withCredentials: true,
        });

        setKelasDB(res.data.kelas);
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    const getMapel = async () => {
      setLoading(true);
      try {
        const res = await axios.get(HOST + "/api/mapel/get-mapel", {
          withCredentials: true,
        });

        setMapel(res.data.mapel);
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    };

    getKelas();
    getMapel();
  }, [editData]);

  useEffect(() => {
    if (kelasDB) {
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
        .filter((kel) => kel.kelas === Number(selectKelas))
        .sort((a, b) => a.nama.localeCompare(b.nama));

      setKelasNama(nama);
    }
  }, [kelasDB, selectKelas]);

  useEffect(() => {
    if (editData) {
      Object.keys(editData).forEach((data) => {
        if (data === "tanggalLahir" && editData[data]) {
          setValue(data, formatDate(editData[data]));
        } else if (data === "waliKelas") {
          setValue("kelas", editData[data].kelas);
          setValue("namaKelas", editData[data].nama);
        } else if (data === "password") {
          setValue("password", undefined);
        } else if (data === "photo") {
          setPhoto(editData[data]);
        } else if (data === "bidangStudi") {
          setValue("bidangStudi", editData[data]._id);
        } else {
          setValue(data, editData[data]);
        }
      });
    }
  }, [editData, kelasDB]);

  useEffect(() => {
    setValue("namaKelas", "");
  }, [selectKelas]);

  useEffect(() => {
    if (!editData) {
      navigate("/admin/data-guru");
    }
  }, []);

  const changeBidangStudi = (value) => {
    const { id, name } = value;
    setValue("bidangStudi", id);
  };

  const handleNumberChange = (e, name) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");

    setValue(name, cleanedValue);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        HOST + "/api/guru/edit-guru/" + editData._id,
        { ...data, photo },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      dispatch(setDataEdit(undefined));
      navigate("/admin/data-guru  ");
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
    <>
      <div>
        <div className="bg-white mx-6 border-b rounded-md p-4">
          <h1 className="font-bold text-gray-700 text-sm">Ganti Data Guru</h1>
        </div>
      </div>
      <div className="  mx-6 mb-16  grid  bg-white grid-cols-1 rounded-lg py-6 px-6 gap-8 lg:grid-cols-4">
        <div className=" flex justify-start  items-center flex-col">
          <div
            className="relative cursor-pointer w-[150px] overflow-hidden   h-[150px] rounded-full border  bg-white"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img
              src={photo ? photo : profile}
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

            {isHover && (
              <div
                className="absolute inset-0 bg-black/30 w-full h-full flex-center"
                onClick={photo ? handleDeleteImage : handleClickInputImage}
              >
                {photo ? (
                  <Trash color="white" width={20} height={20} />
                ) : (
                  <Plus color="white" width={20} height={20} />
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
          <div className="flex flex-col justify-center  mt-8">
            <p className="text-xs mb-2">Status</p>
            <div className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                id="toggle"
                checked={status}
                onChange={handleChangeStatus}
                className="opacity-0 w-0 h-0 peer"
                {...register("status")}
              />
              <label
                htmlFor="toggle"
                className={`absolute cursor-pointer inset-0 bg-backup border border-gray-400 rounded-full transition-colors duration-300 ${
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
              <label htmlFor="nip" className="text-xs mb-2 block font-semibold">
                NIP <span className="text-red-500">*</span>
              </label>
              <input
                type={"text"}
                id="nip"
                name="nip"
                value={nip}
                {...register("nip", {
                  required: "NIP tidak boleh kosong.",
                })}
                onChange={(e) => handleNumberChange(e, "nip")}
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
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
                type={"text"}
                id="password"
                placeholder="Password tidak ditampilkan untuk keamanan"
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
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
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
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
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
                value={tanggalLahir}
                {...register("tanggalLahir", {
                  required: "Tanggal Lahir tidak boleh kosong.",
                })}
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
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
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
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

          <div className="">
            <div className="mb-2">
              <label
                htmlFor="bidangStudi"
                className="text-xs mb-2 block font-semibold w-fit"
              >
                Bidang Studi <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="bidangStudi"
                rules={{ required: "Bidang Studi tidak boleh kosong." }}
                render={({ field: { onChange, value } }) => (
                  <DropdownBidangStudi
                    onChange={changeBidangStudi}
                    value={value}
                  />
                )}
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.bidangStudi && errors.bidangStudi.message}
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
                autoComplete="off"
                id="No. Telepon"
                name="phone"
                value={phone}
                {...register("phone", {
                  required: "No. Telepon tidak boleh kosong.",
                })}
                onChange={(e) => handleNumberChange(e, "phone")}
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
              />
              <span className="text-xs h-4 block mt-1 text-neutral2">
                {errors.phone && errors.phone.message}
              </span>
            </div>

            <div className="mb-2">
              <label
                htmlFor="kelas"
                className="text-xs mb-2 block font-semibold"
              >
                Kelas
              </label>
              <select
                id="kelas"
                {...register("kelas")}
                className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
              >
                <option value="">
                  {selectKelas === "" ? "Pilih Kelas" : "Kosongkan"}
                </option>
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
                    htmlFor="namaKelas"
                    className="text-xs mb-2 block font-semibold"
                  >
                    Nama Kelas <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="namaKelas"
                    {...register("namaKelas", {
                      required: "Nama kelas tidak boleh kosong.",
                    })}
                    className="py-1.5 h-8  bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
                  >
                    <option value="">Pilih Nama Kelas</option>
                    {kelasNama.map((kel) => (
                      <option
                        key={kel._id}
                        value={kel.nama}
                        className="rounded-md"
                      >
                        {kel.nama}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs h-4 block mt-1 text-neutral2">
                    {errors.namaKelas && errors.namaKelas.message}
                  </span>
                </div>
              </>
            )}
            <div className="mb-8">
              <label
                htmlFor="Alamat"
                className="text-xs mb-2 block font-semibold"
              >
                Alamat
              </label>
              <textarea
                id="Alamat"
                {...register("alamat")}
                className="py-1.5  h-[114px] bg-white border text-gray-500 text-xs border-gray-400 w-full rounded-md outline-neutral  px-2"
              />
            </div>
            <div className="flex justify-end pt-8 gap-4 ">
              <Link to={"/admin/data-guru"}>
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
                className="btn disabled:cursor-not-allowed w-28 "
              >
                {loading ? "Loading" : "Simpan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditGuruPage;
