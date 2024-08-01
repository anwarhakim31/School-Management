import { selectedUserData, setUserData } from "@/store/slices/auth-slice";
import { Edit2, Plus, Trash, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import responseError from "@/util/services";
import axios from "axios";
import { HOST } from "@/util/constant";

// Definisikan schema validasi dengan Zod
const schema = z.object({
  username: z
    .string()
    .min(8, "Username harus lebih dari 8 karakter")
    .max(20, "Username harus kurang dari 20 karakter")
    .optional()
    .nullable(),
  password: z
    .string()
    .min(8, "Password harus lebih dari 8 karakter")
    .optional()
    .nullable(),
  nama: z
    .string()
    .min(8, "Nama harus lebih dari 8 karakter")
    .max(20, "Nama harus kurang dari 20 karakter")
    .optional()
    .nullable(),
});

const SideProfile = () => {
  const uploadRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector(selectedUserData);
  const [isHover, setIsHover] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      nama: "",
    },
  });

  const handleClickImage = () => {
    uploadRef.current.click();
  };

  const handleDeleteImage = () => {
    dispatch(setUserData({ ...data, foto: "" }));
  };

  const hangleChangeImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("image", file);

      try {
        const res = await axios.post(
          HOST + "/api/auth/add-profile-image",
          formData,
          { withCredentials: true }
        );

        if (res.status === 200) {
          dispatch(setUserData({ ...data, foto: res.data.foto }));
        }
      } catch (error) {
        responseError(error);
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      setValue("username", data.username || "");
      setValue("password", data.password || "");
      setValue("nama", data.nama || "");
    }
  }, [data, setValue]);

  return (
    <div className="fixed p-4 rounded-md shadow-xl top-1/2 -translate-y-1/2 right-0 w-[300px] flex-center  h-[60vh] max-h-[800px] bg-white">
      <div className="">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative cursor-pointer w-16 h-16 mx-auto bg-backup flex items-center justify-center rounded-full overflow-hidden"
        >
          {data.foto ? (
            <img
              src={data.foto}
              alt="foto"
              loading="lazy"
              width={64}
              height={64}
            />
          ) : (
            <User
              color="white"
              width={50}
              height={50}
              className="mt-7 fill-white"
            />
          )}
          {isHover && (
            <div
              className="absolute inset-0 bg-black/30 w-full h-full flex-center"
              onClick={data.foto ? handleDeleteImage : handleClickImage}
            >
              {data.foto ? (
                <Trash color="white" width={20} height={20} />
              ) : (
                <Plus color="white" width={20} height={20} />
              )}
            </div>
          )}
          <input
            type="file"
            name="image"
            ref={uploadRef}
            accept=".png, .jpg, .svg, .jpeg, .webp"
            onChange={hangleChangeImage}
            className="hidden"
          />
        </div>
        <p className="font-medium text-sm text-center mt-2">Foto</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label htmlFor="username" className="text-sm ">
              Username :
            </label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  className="w-full border my-1 px-2.5 py-1 text-sm rounded-full border-gray-500 outline-neutral"
                  {...field}
                />
              )}
            />
            {errors.username ? (
              <span className="text-neutral2 text-xs">
                {errors.username.message}
              </span>
            ) : (
              <div className="w-full h-6"></div>
            )}
          </div>
          <div className="">
            <label htmlFor="password" className="text-sm ">
              Password :
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  className="w-full border my-1 px-2.5 py-1 text-sm rounded-full border-gray-500 outline-neutral"
                  {...field}
                />
              )}
            />
            {errors.password ? (
              <span className="text-neutral2 text-xs">
                {errors.password.message}
              </span>
            ) : (
              <div className="w-full h-6"></div>
            )}
          </div>
          <div className="">
            <label htmlFor="nama" className="text-sm ">
              Nama :
            </label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <input
                  className="w-full border my-1 px-2.5 py-1 text-sm rounded-full border-gray-500 outline-neutral"
                  {...field}
                />
              )}
            />
            {errors.nama ? (
              <span className="text-neutral2 text-xs">
                {errors.nama.message}
              </span>
            ) : (
              <div className="w-full h-6"></div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-neutral hover:bg-indigo-600 text-sm rounded-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideProfile;
