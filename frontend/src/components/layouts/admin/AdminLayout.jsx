import { Outlet } from "react-router-dom";
import AsideLayout from "./AsideLayout";
import HeaderLayout from "./HeaderLayout";
import { useState } from "react";
import SideProfile from "@/components/fragments/admin/SideProfile";

const AdminLayout = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <main className="w-full flex">
      <AsideLayout />
      <div className="w-full">
        <HeaderLayout />
        <Outlet />
        <SideProfile />
      </div>
    </main>
  );
};

export default AdminLayout;
