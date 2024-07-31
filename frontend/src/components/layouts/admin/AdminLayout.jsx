import React from "react";
import { Outlet } from "react-router-dom";
import AsideLayout from "./AsideLayout";

const AdminLayout = () => {
  return (
    <main className="flex">
      <AsideLayout />
      <Outlet />
    </main>
  );
};

export default AdminLayout;
