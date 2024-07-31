import logo from "../../../assets/Schoolarcy (1).webp";
import ListSidebar from "@/components/fragments/admin/ListSidebar";

const AsideLayout = () => {
  return (
    <aside className="bg-neutral  py-6 overflow-hidden w-[225px] h-screen">
      <div className="w-[150px] h-[50px]  mb-4 mx-auto block">
        <img src={logo} alt="logo" className="object-contain" />
      </div>
      <div>
        <ListSidebar />
      </div>
    </aside>
  );
};

export default AsideLayout;
