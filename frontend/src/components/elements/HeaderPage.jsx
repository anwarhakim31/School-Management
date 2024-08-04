import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HeaderPage = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (pathname !== "/admin") {
      const path = pathname.split("/")[2];
      const name = path.split("-").join(" ");
      setTitle(name);
    } else {
      setTitle("Dashboard");
    }
  }, [pathname]);

  return (
    <div>
      <h1 className="text-xl capitalize text-neutral font-bold">{title}</h1>
    </div>
  );
};

export default HeaderPage;
