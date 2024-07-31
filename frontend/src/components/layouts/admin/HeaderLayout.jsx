import HeaderPage from "@/components/elements/HeaderPage";
import { selectedUserData } from "@/store/slices/auth-slice";
import { Edit2Icon, LogOut, Settings, User, User2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const HeaderLayout = () => {
  const [isSetting, setIsSetting] = useState(false);
  const data = useSelector(selectedUserData);

  return (
    <header className="w-full p-6 flex justify-between items-center">
      <HeaderPage title={"Data Siswa"} />
      <div className="flex justify-center items-center gap-4">
        <div className=""></div>

        <div className="flex items-center space-x-4">
          <div className="block">
            <h5 className="text-sm text-text font-semibold">
              {data.nama ? data.nama : data.username}
            </h5>
            <span className="text-xs leading-2 text-right font-medium block">
              {data.role}
            </span>
          </div>
          <div className="w-10 h-10 bg-backup flex items-center justify-center rounded-full overflow-hidden">
            {data.photo ? (
              <img src={data.photo} alt="foto" />
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
            className="bg-white w-10 h-10 p-2 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="menu"
            onClick={() => setIsSetting(!isSetting)}
          >
            <Settings className=" stroke-[1.5]" width={25} height={25} />
          </button>
          {isSetting && (
            <div
              role="menu"
              className="absolute rounded-md top-14 right-2.5 w-[170px] rounded-tr-none  before:absolute before:w-2.5 before:h-2.5 before:-top-1.5 before:right-0.5  bg-white shadow-lg border border-gray-300 before:bg-backup  before:bg-white before:border-gray-300  before:border-t  before:border-r before:-rotate-45 "
            >
              <ul>
                <li className="flex gap-2 justify-between items-center cursor-pointer p-3 group rounded-lg hover:bg-gray-100">
                  <Edit2Icon className="bg-neutral1 text-white w-7 h-7  rounded-sm p-2" />
                  <p className="text-sm font-medium group-hover:text-neutral">
                    Edit profile
                  </p>
                </li>
                <li className="w-full h-[0.25px] bg-backup "></li>
                <li className="flex gap-2 justify-between items-center cursor-pointer p-3 group hover:bg-gray-100">
                  <LogOut className="bg-neutral2 text-white w-7 h-7  rounded-sm p-2" />
                  <p className="text-sm font-medium group-hover:text-neutral">
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
