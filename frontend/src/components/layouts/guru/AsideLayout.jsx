import { ChevronsLeft, X } from "lucide-react";
import logo from "../../../assets/Schoolarcy (1).webp";
import ListSidebar from "@/components/fragments/guru/ListSidebar";

const AsideLayout = ({ setIsSidebar }) => {
  return (
    <>
      <div className="w-[150px] h-[50px]   mx-auto block">
        <img
          src={logo}
          alt="logo"
          className="object-contain "
          height={150}
          width={140}
        />
      </div>
      <div className="">
        <ListSidebar />
      </div>
      <button
        aria-label="close sidebar"
        onClick={() => setIsSidebar(false)}
        className="flex lg:hidden absolute items-center justify-center left-1/2 -translate-x-1/2 bottom-16  w-8 h-8 border border-gray-300 bg-white rounded-full "
      >
        <ChevronsLeft width={20} height={20} />
      </button>
    </>
  );
};

export default AsideLayout;
