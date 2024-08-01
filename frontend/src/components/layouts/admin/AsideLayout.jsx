import logo from "../../../assets/Schoolarcy (1).webp";
import ListSidebar from "@/components/fragments/admin/ListSidebar";

const AsideLayout = () => {
  return (
    <>
      <div className="max-w-[150px] h-[50px]  mb-2 mx-auto block">
        <img src={logo} alt="logo" className="object-contain mt-1" />
      </div>
      <div className="">
        <ListSidebar />
      </div>
    </>
  );
};

export default AsideLayout;
