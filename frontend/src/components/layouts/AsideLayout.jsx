import { ChevronsLeft, X } from "lucide-react";
import logo from "../../assets/Schoolarcy (1).webp";
import ListSidebarAdmin from "../fragments/admin/ListSidebarAdmin";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slice";
import ListSidebarGuru from "../fragments/guru/ListSidebarGuru";

const AsideLayout = ({ setIsSidebar }) => {
  const userData = useSelector(selectedUserData);

  return (
    <>
      <div className="w-[150px] h-[50px]  mb-2 mx-auto block">
        <img
          src={logo}
          alt="logo"
          height={150}
          width={140}
          className="object-contain mt-1"
        />
      </div>
      <div className="">
        {userData && userData.role === "admin" && <ListSidebarAdmin />}
        {userData && userData.role === "guru" && <ListSidebarGuru />}
      </div>
      <button
        aria-label="close sidebar"
        onClick={() => setIsSidebar(false)}
        className="flex lg:hidden absolute items-center justify-center left-1/2 -translate-x-1/2 bottom-16  w-8 h-8 border border-gray-300 bg-white rounded-full "
      >
        <ChevronsLeft width={20} height={20} />
      </button>
      <div className="flex justify-center align-center">
        <small className="text-[0.625rem] text-white text-center">
          Copyright <span className="text-[#fdc148]">&copy;</span> 2024.
          <br /> Created By{" "}
          <Link
            target="_blank"
            className=" underline text-[#fdc148]"
            to={"https://github.com/anwarhakim31"}
          >
            Anwar Hakim
          </Link>
        </small>
      </div>
    </>
  );
};

export default AsideLayout;
