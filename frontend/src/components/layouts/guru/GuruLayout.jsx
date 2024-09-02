import React, { useEffect, useRef, useState } from "react";
import AsideLayout from "../guru/AsideLayout";
import { Outlet, useLocation } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import ButtonScrollTop from "@/components/elements/ButtonScrollTop";
import { useDispatch } from "react-redux";
import { setDataDeleteMany } from "@/store/slices/admin-slice";

const GuruLayout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isSidebar, setIsSidebar] = useState(false);
  const sidebarRef = useRef();
  const scrollContainerRef = useRef(null);

  const handleToggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebar(false);
      }
    };

    if (isSidebar) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [isSidebar]);

  useEffect(() => {
    if (pathname) {
      dispatch(setDataDeleteMany([]));
      setIsSidebar(false);
    }
  }, [pathname]);

  return (
    <main className="w-screen h-screen flex overflow-hidden">
      <aside
        ref={sidebarRef}
        className={`${
          isSidebar ? "left-0 " : "-left-[300px] lg:left-0"
        } lg:block bg-neutral z-50 fixed lg:static py-5 shadow-xl boder-r border-gray-500 -hidden w-[230px] lg:w-[220px] min-h-screen transition-all duration-300`}
      >
        <AsideLayout setIsSidebar={setIsSidebar} />
      </aside>
      <div className="flex flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex flex-col flex-1 overflow-auto"
        >
          <HeaderLayout handleToggleSidebar={handleToggleSidebar} />
          <Outlet />
        </div>
      </div>

      <ButtonScrollTop scrollContainerRef={scrollContainerRef} />
    </main>
  );
};

export default GuruLayout;
