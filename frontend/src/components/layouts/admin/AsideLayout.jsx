import { X } from "lucide-react";
import logo from "../../../assets/Schoolarcy (1).webp";
import ListSidebar from "@/components/fragments/admin/ListSidebar";

const AsideLayout = ({ setIsSidebar }) => {
  return (
    <>
      <div className="w-[150px] h-[50px]  mb-2 mx-auto block">
        <img src={logo} alt="logo" className="object-contain mt-1" />
      </div>
      <div className="">
        <ListSidebar />
      </div>
      <button
        aria-label="close sidebar"
        onClick={() => setIsSidebar(false)}
        className="flex md:hidden absolute items-center justify-center top-[25px] -right-[15px] w-8 h-8 border border-gray-300 bg-white rounded-full "
      >
        <X width={20} height={20} />
      </button>
    </>
  );
};

export default AsideLayout;
