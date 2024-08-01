import { Outlet } from "react-router-dom";
import AsideLayout from "./AsideLayout";
import HeaderLayout from "./HeaderLayout";
import { useEffect, useRef, useState } from "react";
import SideProfile from "@/components/fragments/admin/SideProfile";

const AdminLayout = () => {
  const [isEdit, setIsEdit] = useState(false);
  const editProfileRef = useRef();
  const handleCloseEdit = () => {
    setIsEdit(false);
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

  return (
    <main className="w-full flex">
      <AsideLayout />
      <div className="w-full">
        <HeaderLayout setIsEdit={setIsEdit} />
        <Outlet />
        {isEdit && (
          <SideProfile ref={editProfileRef} handleClose={handleCloseEdit} />
        )}
      </div>
    </main>
  );
};

export default AdminLayout;
