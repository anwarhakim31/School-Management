import React from "react";
import AsideLayout from "../admin/AsideLayout";
import { Outlet } from "react-router-dom";

const GuruLayout = () => {
  return (
    <main className="w-screen h-screen flex overflow-hidden">
      <AsideLayout />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default GuruLayout;
