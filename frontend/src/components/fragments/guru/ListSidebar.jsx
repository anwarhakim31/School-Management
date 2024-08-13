import DashboardIcon from "../../../assets/svg/dashboard.svg?react";
import SiswaIcon from "../../../assets/svg/siswa.svg?react";
import GuruIcon from "../../../assets/svg/guru.svg?react";
import KelasIcon from "../../../assets/svg/class.svg?react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, FileStack, NotebookPen } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";
// import KelasSVG from "@/components/base/svg/KelasSVG

const ListSidebar = () => {
  const navigate = useNavigate();
  const [activeDropDown, setActiveDropDown] = useState(null);
  const userData = useSelector(selectedUserData);

  const handleActiveDropDown = (id) => {
    setActiveDropDown(activeDropDown === id ? null : id);
  };

  const Navlist = [
    {
      id: 1,
      nama: "Dashboard",
      path: "/admin/dashboard",
      icon: (
        <DashboardIcon
          height={17}
          width={17}
          className={
            "text-white group-hover:text-neutral stroke-[2] duration-300 transition-all"
          }
        />
      ),
    },

    userData.waliKelas && {
      id: 2,
      nama: "Wali Kelas",
      icon: (
        <KelasIcon
          height={20}
          width={20}
          className={
            "text-white group-hover:text-neutral stroke-[0.1] duration-300 transition-all"
          }
        />
      ),
      dropDown: [
        {
          id: 1,
          nama: "Absen Harian",
          path: "/guru/absen-harian",
          icon: (
            <NotebookPen
              height={20}
              width={20}
              className={
                "text-white group-hover:text-neutral  duration-300 transition-all"
              }
            />
          ),
        },
        {
          id: 2,
          nama: "Data kelas",
          path: "/guru/data-kelas",
          icon: (
            <SiswaIcon
              height={20}
              width={20}
              className={
                "text-white group-hover:text-neutral stroke-[0.1] group-hover:fill-neutral duration-300 transition-all"
              }
            />
          ),
        },
      ],
    },
    {
      id: 3,
      nama: "Jadwal Mengajar",
      path: "/admin/jadwal-mengajar",
      icon: (
        <DashboardIcon
          height={17}
          width={17}
          className={
            "text-white group-hover:text-neutral stroke-[2] duration-300 transition-all"
          }
        />
      ),
    },

    {
      id: 4,
      nama: "Rekap",
      path: "/admin/Rekap-Absen",
      icon: (
        <DashboardIcon
          height={17}
          width={17}
          className={
            "text-white group-hover:text-neutral stroke-[2] duration-300 transition-all"
          }
        />
      ),
    },
  ].filter(Boolean);

  return (
    <ul className="w-full py-2 h-[80vh] overflow-auto">
      {Navlist.map((list) => (
        <li
          onClick={() => handleActiveDropDown(list._id)}
          key={list.id}
          className="outline-none ml-6 md:ml-4 lg:ml-6 "
        >
          <NavLink
            to={list.path}
            className="relative flex  justify-start  outline-white z-10 pl-4 items-center py-3  gap-3 group hover:bg-background cursor-pointer rounded-tl-full rounded-bl-full "
          >
            {list.icon}
            <span className="text-white   mt-0.5 text-sm font-light group-hover:text-neutral group-hover:font-medium ">
              {list.nama}
            </span>
            {list.dropDown && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                {activeDropDown === list._id ? (
                  <ChevronUp
                    className=" group-hover:text-neutral text-white "
                    strokeWidth={2}
                    width={20}
                    height={20}
                  />
                ) : (
                  <ChevronDown
                    className=" group-hover:text-neutral text-white "
                    strokeWidth={2}
                    width={20}
                    height={20}
                  />
                )}
              </div>
            )}
          </NavLink>

          {list.dropDown && activeDropDown === list._id && (
            <div
              className="h-[75px] my-2 "
              onClick={(e) => e.stopPropagation()}
            >
              {list.dropDown.map((drop) => (
                <button
                  onClick={() => {
                    navigate(drop.path);
                    setActiveDropDown(null);
                  }}
                  key={drop.id}
                  className="flex items-center gap-2 px-2 group hover:bg-white h-8 my-2 mx-3 w-36 rounded-md"
                >
                  {drop.icon}
                  <span className="text-white    text-sm font-light group-hover:text-neutral group-hover:font-medium ">
                    {drop.nama}
                  </span>
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListSidebar;