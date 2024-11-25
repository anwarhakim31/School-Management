import DashboardIcon from "../../../assets/svg/dashboard.svg?react";
import Schedule from "../../../assets/svg/studi.svg?react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookUser, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Navlist = [
  {
    id: 1,
    nama: "Dashboard",
    path: "/siswa/dashboard",
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
    id: 2,
    nama: "Jadwal",
    path: "/siswa/jadwal-pelajaran",
    icon: (
      <Schedule
        height={17}
        width={17}
        className={
          "text-white group-hover:text-neutral stroke-[2] duration-300 transition-all"
        }
      />
    ),
  },
  {
    id: 3,
    nama: "Rapor",
    path: "/siswa/hasil-rapor",
    icon: (
      <BookUser
        height={17}
        width={17}
        className={
          "text-white group-hover:text-neutral stroke-[2] duration-300 transition-all"
        }
      />
    ),
  },
];

const ListSidebarSiswa = () => {
  const navigate = useNavigate();
  const [activeDropDown, setActiveDropDown] = useState(null);

  const handleDropdown = (index) => {
    if (activeDropDown === index) {
      setActiveDropDown(null);
    } else {
      setActiveDropDown(index);
    }
  };

  return (
    <ul className="w-full py-1 h-[80vh] overflow-auto">
      {Navlist.map((list) => (
        <li
          onClick={() => handleDropdown(list.id)}
          key={list.id}
          className="relative outline-none ml-6 md:ml-4 lg:ml-6 "
        >
          <NavLink
            to={list.path}
            className="relative flex justify-start  outline-white z-10 pl-4 items-center py-3  gap-3 group hover:bg-background cursor-pointer rounded-tl-full rounded-bl-full "
          >
            {list.icon}
            <span className="text-white   mt-0.5 text-sm font-light group-hover:text-neutral group-hover:font-medium ">
              {list.nama}
            </span>
            {list.dropDown && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 ">
                {activeDropDown === list.id ? (
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

          {list.dropDown && (
            <div
              className={`${
                activeDropDown === list.id
                  ? "max-h-[90px] my-1 "
                  : "max-h-0 opacity-0"
              }   transition-all duration-300 ease-in-out overflow-hidden  rounded-xl w-fit `}
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

export default ListSidebarSiswa;
