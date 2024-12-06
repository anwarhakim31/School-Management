import { useEffect, useState } from "react";
import logo from "../assets/Schoolarcy (2).webp";
import { Eye, EyeOff, KeyRound, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Slider from "@/components/views/Login/Slider";
import axios from "axios";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/slices/auth-slice";
import LoaderButton from "@/components/elements/LoaderButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ ni: "", password: "" });

  const [isText, setIsText] = useState(false);
  const [remember, setIsRemember] = useState(false);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const rememberLS = JSON.parse(localStorage.getItem("remember"));
    if (rememberLS && rememberLS.active) {
      setIsRemember(true);
      setFormData(rememberLS.formData);
    }
  }, []);

  useEffect(() => {
    if (remember) {
      localStorage.setItem(
        "remember",
        JSON.stringify({ active: true, formData })
      );
    } else {
      localStorage.removeItem("remember");
    }
  }, [remember, formData]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await axios.post(HOST + "/api/auth/login", formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUserData(res.data.data));
        res.data.data.role === "admin" && navigate("/admin/dasboard");
        res.data.data.role === "guru" && navigate("/guru/dashboard");
        res.data.data.role === "siswa" && navigate("/siswa/dashboard");
      }
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="w-screen bg-white h-screen overflow-x-hidden">
      <div className="w-full  h-full grid sm:grid-cols-2 max-w-[1280px] mx-auto">
        <div className="w-full h-full my-10 sm:my-0  flex justify-center order-2 sm:order-1 items-center lg:px-24 ">
          <Slider />
        </div>
        <div className="bg-background py-24 sm:py-0 w-full h-screen sm:order-2 flex justify-center flex-col px-14 sm:px-8 md:px-14 lg:px-28 xl:px-32 bg items-center">
          <figure className="w-[150px] h-[35px]">
            <img src={logo} alt="logo" className="mx-auto w-full h-full" />
          </figure>

          <h1 className="text-center text-sm font-medium text-md text-gray-800 mt-10 mb-8  leading-relaxed">
            Masukkan NIP / NIS & password <br />
            <span>pada form di bawah ini dengan benar.</span>
          </h1>
          <label
            htmlFor="nip/nik"
            className="mr-auto mb-2 text-xs text-gray-500 font-medium"
          >
            NIP / NIS
          </label>
          <div className="w-full relative mb-5">
            <input
              type="text"
              id="nip/nis"
              value={formData.ni}
              name="ni"
              onKeyDown={handleInputClick}
              onChange={handleInputChange}
              placeholder="Masukkan NIP / NIS"
              className="py-1.5 h-10 bg-white text-xs border text-gray-500 border-gray-700 w-full rounded-lg outline-neutral outline-offset-1 pl-10"
            />
            <User className="absolute w-4 h-4 stroke-slate-400 bottom-1/2 left-3 translate-y-1/2" />
          </div>
          <label
            htmlFor="password"
            className="mr-auto mb-2 text-xs text-gray-500 font-medium"
          >
            Password
          </label>
          <div className="w-full relative mb-5">
            <input
              type={isText ? "password" : "text"}
              id="password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              onKeyDown={handleInputClick}
              placeholder="Masukkan Password"
              className="py-1.5 h-10 bg-white border text-gray-500 text-xs border-gray-700 w-full rounded-lg outline-neutral outline-offset-1 pl-10"
            />
            <KeyRound className="absolute w-4 h-4 stroke-gray-400 bottom-1/2 left-3 translate-y-1/2" />
            <button
              onClick={() => setIsText(!isText)}
              className={`${
                !isText ? "bg-background" : "bg-white"
              } absolute p-2.5 hover:slate-400 stroke-gray-800 bottom-1/2 translate-y-1/2 right-0.5 rounded-lg hover:bg-background group`}
            >
              {!isText ? (
                <EyeOff
                  className={`${
                    !isText ? "stroke-neutral" : "stroke-gray-400"
                  } w-4 h-4 group-hover:stroke-neutral`}
                />
              ) : (
                <Eye
                  className={`${
                    !isText ? "stroke-neutral" : "stroke-gray-400"
                  } w-4 h-4 group-hover:stroke-neutral`}
                />
              )}
            </button>
          </div>
          <div className="flex space-x-2 mr-auto mb-4">
            <Checkbox
              checked={remember}
              onCheckedChange={() => setIsRemember(!remember)}
              className="w-4 h-4 border-gray-400"
              id="remember"
              aria-label="remember me"
            />
            <label
              htmlFor="remember"
              className="text-xs text-gray-500 font-medium"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            aria-label="submit"
            onClick={handleLogin}
            className="rounded-lg bg-neutral w-full  font-medium text-white text-sm h-10 mt-4 hover:bg-indigo-800"
          >
            {loading ? <LoaderButton /> : "Masuk"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
