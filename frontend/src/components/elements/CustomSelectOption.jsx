import React, { useEffect, useRef } from "react";

const CustomSelectOption = ({ handleSelect, data, isOpen, onClose, def }) => {
  const dropRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={dropRef}
      role="dropdown"
      className="absolute left-0 top-8 w-full  overflow-y-scroll max-h-[125px] bg-white border  border-gray-500 rounded-md"
    >
      {
        <button
          type="button"
          onClick={() => handleSelect("", "")}
          className="cursor-pointer block w-full my-1 py-1 text-left hover:bg-background px-2"
        >
          {def || "Kosongkan"}
        </button>
      }
      {data &&
        data.map((gu) => (
          <button
            key={gu._id}
            value={gu.nama}
            type="button"
            onClick={() => handleSelect(gu.nama, gu._id)}
            className="cursor-pointer block w-full my-1 py-1 text-left hover:bg-background px-2"
          >
            {gu.nama}
          </button>
        ))}
    </div>
  );
};

export default CustomSelectOption;
