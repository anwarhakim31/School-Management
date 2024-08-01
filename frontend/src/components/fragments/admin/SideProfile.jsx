import { selectedUserData, setUserData } from "@/store/slices/auth-slice";
import { Plus, Trash, User, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import responseError from "@/util/services";
import axios from "axios";
import { HOST } from "@/util/constant";
import { toast } from "sonner";
import LoaderButton from "@/components/elements/LoaderButton";

const SideProfile = forwardRef(({ handleClose }, ref) => {
  const uploadRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector(selectedUserData);
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      nama: "",
    },
    mode: onchange,
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
      setLoading(true);
      try {
        const res = await axios.post(
          HOST + "/api/auth/add-profile-image",
          formData,
          { withCredentials: true }
        );

        if (res.status === 200) {
          dispatch(setUserData({ ...data, foto: res.data.foto }));
        }
        e.target.value = null;
      } catch (error) {
        responseError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async (data) => {
    const newData = { ...data, foto: data.foto };
    setLoading(true);
    try {
      const res = await axios.put(HOST + "/api/auth/update-profile", newData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUserData(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("username", data.username || "");
      setValue("password", data.password || "");
      setValue("nama", data.nama || "");
    }
  }, [data, setValue]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 30);
  }, []);

  return (
    <div
      ref={ref}
      role="options"
      className={`${
        show ? "right-0" : "-right-[400px]"
      } fixed p-4 rounded-md shadow-xl top-1/2 -translate-y-1/2  w-[300px] flex-center  h-[60vh] max-h-[800px] bg-white duration-300 ease-in transition-all`}
    >
      <div className="">
        <div>
          <button
            aria-label="close edit profile sidebar"
            onClick={() => handleClose(false)}
            className="absolute h-6 w-6 rounded-full -top-2 -left-2  group bg-backup flex-center duration-300 transition-all"
          >
            <X
              height={15}
              width={15}
              className="text-neutral group-hover:text-white "
            />
          </button>
        </div>
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
              width={70}
              height={70}
              className="mt-5 fill-white"
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
              rules={{
                minLength: {
                  value: 8,
                  message: "Username harus lebih dari 8 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Username harus kurang dari 20 karakter",
                },
              }}
              render={({ field }) => (
                <input
                  placeholder="Scholarcy"
                  className="w-full border my-1 px-2.5 py-1.5 text-sm rounded-full border-gray-500 outline-neutral"
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
              rules={{
                minLength: {
                  value: 8,
                  message: "Password harus lebih dari 8 karakter",
                },
              }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="**************"
                  className="w-full border my-1 px-2.5 py-1.5  text-sm rounded-full border-gray-500 outline-neutral"
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
              rules={{
                minLength: {
                  value: 5,
                  message: "Nama harus lebih dari 5 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Nama harus kurang dari 20 karakter",
                },
              }}
              control={control}
              render={({ field }) => (
                <input
                  placeholder="Scholarcy"
                  className="w-full border my-1 px-2.5 py-1.5  text-sm rounded-full border-gray-500 outline-neutral"
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
            className="w-full py-2.5 mt-4 text-white bg-neutral hover:bg-indigo-600 text-sm rounded-full"
          >
            {loading ? <LoaderButton /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
});

SideProfile.displayName = "SideProfile";

export default SideProfile;
