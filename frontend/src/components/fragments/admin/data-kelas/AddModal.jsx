import CustomSelectOption from "@/components/elements/CustomSelectOption";
import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { waliKelas: "", kelas: "", nama: "", posisi: "" },
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [guru, setGuru] = useState([]);
  const [waliKelas, setWaliKelas] = useState("Tidak memiliki Wali Kelas");

  const handleChangeKelas = (e, name) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");

    setValue(name, cleanedValue);
  };

  const handleToggleSelect = () => {
    setIsOpen(false);
  };

  const handleWaliKelasSelection = (nama, id) => {
    if (nama === "") {
      setWaliKelas("Tidak memiliki Wali Kelas");
    } else {
      setWaliKelas(nama);
    }

    setValue("waliKelas", id);
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
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

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full relative sm:max-w-[425px] max-h-[400px] rounded-lg shadow-md bg-white"
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
          <div className="px-6  mb-4">
            <label
              htmlFor=""
              className="text-xs mb-2 block font-semibold text-gray-700"
            >
              Wali Kelas
            </label>
            <div
              className="w-full relative  text-xs  rounded-md "
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                type="text"
                id="wali"
                onClick={(e) => {
                  setIsOpen(true);
                }}
                value={waliKelas}
                readOnly
                className="px-2 py-1.5 w-full  border  rounded-md  outline-neutral select-none cursor-pointer border-gray-500"
              />
              <div className="absolute top-2 right-2 ">
                {isOpen ? (
                  <ChevronUp width={15} height={15} />
                ) : (
                  <ChevronDown width={15} height={15} />
                )}
              </div>
              {isOpen && (
                <CustomSelectOption
                  handleSelect={handleWaliKelasSelection}
                  onClose={handleToggleSelect}
                  data={guru}
                  def={"Tidak memiliki Wali Kelas"}
                  isOpen={isOpen}
                />
              )}
            </div>

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

export default AddModal;
