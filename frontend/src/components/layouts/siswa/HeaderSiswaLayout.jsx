import HeaderPage from "@/components/elements/HeaderPage";
import { selectedUserData, setUserData } from "@/store/slices/auth-slice";
import profile from "../../../assets/profile.png";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { LogOut, Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HeaderSiswaLayout = ({ handleToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonRef = useRef();
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

  return (
    <header className="w-full p-4 flex justify-between items-center">
      <div className="flex-center gap-4 ">
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
            <span className="text-xs hidden sm:block leading-2 text-right font-medium capitalize">
              {data.role}
            </span>
          </div>
          <Link
            to={"/guru/profile"}
            className="w-9 h-9 bg-backup flex items-center justify-center rounded-full overflow-hidden"
          >
            <img
              src={data.photo ? data.photo : profile}
              alt="foto"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="relative">
          <button
            ref={buttonRef}
            className="bg-white border hover:border-neutral transition-all duration-300 w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="menu"
            onClick={handleLogout}
          >
            <LogOut className=" stroke-[1.5]" width={20} height={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSiswaLayout;
