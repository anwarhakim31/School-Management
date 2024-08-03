import { Outlet } from "react-router-dom";
import AsideLayout from "./AsideLayout";
import HeaderLayout from "./HeaderLayout";
import { useEffect, useRef, useState } from "react";
import SideProfile from "@/components/fragments/admin/SideProfile";

const AdminLayout = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const editProfileRef = useRef();
  const sidebarRef = useRef();
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const handleToggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        editProfileRef.current &&
        !editProfileRef.current.contains(e.target)
      ) {
        setIsEdit(false);
      }
    };

    if (isEdit) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [isEdit]);

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

  return (
    <main className="w-full h-full flex">
      <aside
        ref={sidebarRef}
        className={`${
          isSidebar ? "left-0 " : "-left-[300px] md:left-0"
        } md:block bg-neutral z-50 fixed md:static py-6 -hidden w-[230px] md:w-[260px] min-h-screen transition-all duration-300`}
      >
        <AsideLayout setIsSidebar={setIsSidebar} />
      </aside>

      <div className="w-full h-full  overflow-hidden">
        <div className="overflow-auto ">
          <HeaderLayout
            setIsEdit={setIsEdit}
            handleToggleSidebar={handleToggleSidebar}
          />
          <Outlet />
          {isEdit && (
            <SideProfile ref={editProfileRef} handleClose={handleCloseEdit} />
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
