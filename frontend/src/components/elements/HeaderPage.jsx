import React from "react";

const HeaderPage = ({ title }) => {
  return (
    <div>
      <h1 className="text-xl capitalize text-neutral font-bold">{title}</h1>
    </div>
  );
};

export default HeaderPage;
