import HeaderPage from "@/components/elements/HeaderPage";
import { selectedUserData, setUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { Edit2Icon, Flag, LogOut, Menu, Settings, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderLayout = ({ handleOpenEdit, setIsEdit, handleToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settingRef = useRef();
  const buttonRef = useRef();
  const [isSetting, setIsSetting] = useState(false);
  const data = useSelector(selectedUserData);

  const handleLogout = async () => {
    try {
      const res = await axios.delete(HOST + "/api/auth/logout", {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUserData(undefined));
        navigate("/login");
      }
    } catch (error) {
      responseError(error);
    }
  };

  const handleEdit = () => {
    setIsSetting(false);
    setIsEdit(true);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        settingRef.current &&
        !settingRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsSetting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <header className="w-full p-4 flex justify-between items-center">
      <div className="flex-center gap-4">
        <button
          aria-label="toggle sidebar"
          onClick={handleToggleSidebar}
          className=" lg:hidden w-9 h-9  p-2 border bg-white hover:border-neutral transition-all duration-300 flex-center rounded-full"
        >
          <Menu width={25} height={25} />
        </button>
        <HeaderPage />
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="block">
            <h5 className="hidden sm:block text-sm text-text font-semibold">
              {data.nama ? data.nama : data.username}
            </h5>
            <span className="text-xs hidden sm:block leading-2 text-right font-medium ">
              {data.role}
            </span>
          </div>
          <div className="w-9 h-9 bg-backup flex items-center justify-center rounded-full overflow-hidden">
            {data.foto ? (
              <img src={data.foto} alt="foto" />
            ) : (
              <User
                color="white"
                width={35}
                height={35}
                className="mt-4 fill-white"
              />
            )}
          </div>
        </div>
        <div className="relative">
          <button
            ref={buttonRef}
            className="bg-white border hover:border-neutral transition-all duration-300 w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="menu"
            onClick={() => {
              setIsSetting((prev) => !prev);
            }}
          >
            <Settings className=" stroke-[1.5]" width={25} height={25} />
          </button>
          {isSetting && (
            <div
              ref={settingRef}
              role="menu"
              className="absolute rounded-md z-20 top-14 right-2.5 w-[170px] rounded-tr-none  before:absolute before:w-2.5 before:h-2.5 before:-top-1.5 before:right-0.5  bg-white shadow-lg border border-gray-300 before:bg-backup   before:border-gray-300  before:border-t  before:border-r before:-rotate-45 "
            >
              <ul>
                <li
                  className="flex gap-2 justify-between items-center cursor-pointer p-2 group rounded-md hover:bg-gray-100"
                  onClick={handleEdit}
                >
                  <Edit2Icon className="bg-neutral1 text-white w-7 h-7  rounded-sm p-2" />
                  <p className="text-xs font-medium group-hover:text-neutral">
                    Edit profile
                  </p>
                </li>
                <li className="w-full h-[0.25px] bg-backup relative"></li>
                <li
                  className="flex gap-2 justify-between items-center cursor-pointer rounded-md p-2 group hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="bg-neutral2 text-white w-7 h-7  rounded-sm p-2" />
                  <p className="text-xs font-medium group-hover:text-neutral">
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
