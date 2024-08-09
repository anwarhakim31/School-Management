import DashboardIcon from "../../../assets/svg/dashboard.svg?react";
import SiswaIcon from "../../../assets/svg/siswa.svg?react";
import GuruIcon from "../../../assets/svg/guru.svg?react";
import KelasIcon from "../../../assets/svg/class.svg?react";
import MapelIcon from "../../../assets/svg/pelajaran.svg?react";
import JadwalIcon from "../../../assets/svg/jadwal.svg?react";
// import DataIcon from "../../../assets/svg/data.svg?react";
import AcaraIcon from "../../../assets/svg/acara.svg?react";
import { Link, NavLink } from "react-router-dom";
import { FileStack } from "lucide-react";
// import KelasSVG from "@/components/base/svg/KelasSVG

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
  {
    id: 1,
    nama: "Data Umum",
    path: "/admin/data-umum",
    icon: (
      <FileStack
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
    nama: "Siswa",
    path: "/admin/data-siswa",
    icon: (
      <SiswaIcon
        height={19}
        width={19}
        className={
          "text-white group-hover:stroke-neutral group-hover:fill-neutral stroke-[0.1] duration-300 transition-all"
        }
      />
    ),
  },
  {
    id: 3,
    nama: "Guru",
    path: "/admin/data-guru",
    icon: (
      <GuruIcon
        height={20}
        width={20}
        className="text-white group-hover:text-neutral duration-300 transition-all"
      />
    ),
  },
  {
    id: 4,
    nama: "Kelas",
    path: "/admin/data-kelas",
    icon: (
      <KelasIcon
        height={20}
        width={20}
        className={
          "text-white group-hover:text-neutral stroke-[0.1] duration-300 transition-all"
        }
      />
    ),
  },
  {
    id: 5,
    nama: "Mata Pelajaran",
    path: "/admin/data-pelajaran",
    icon: (
      <MapelIcon
        height={20}
        width={20}
        className={
          "text-white group-hover:text-neutral duration-300 transition-all"
        }
      />
    ),
  },
  {
    id: 6,
    nama: "Jadwal Belajar",
    path: "/admin/data-jadwal",
    icon: (
      <JadwalIcon
        height={20}
        width={20}
        className={
          "text-white group-hover:text-neutral duration-300 transition-all"
        }
      />
    ),
  },
  // {
  //   id: 7,
  //   nama: "Acara",
  //   path: "/admin/data-acara",
  //   icon: (
  //     <AcaraIcon
  //       height={20}
  //       width={20}
  //       className={
  //         "text-white group-hover:text-neutral duration-300 transition-all"
  //       }
  //     />
  //   ),
  // },
];

const ListSidebar = () => {
  return (
    <ul className="w-full py-2 h-[80vh] overflow-auto">
      {Navlist.map((list) => (
        <li key={list.id} className="outline-none ml-6 md:ml-4 lg:ml-6 ">
          <NavLink
            to={list.path}
            className="flex justify-start  outline-white z-10 pl-4 items-center py-3  gap-3 group hover:bg-background cursor-pointer rounded-tl-full rounded-bl-full "
          >
            {list.icon}
            <span className="text-white   mt-0.5 text-sm font-light group-hover:text-neutral group-hover:font-medium ">
              {list.nama}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ListSidebar;
