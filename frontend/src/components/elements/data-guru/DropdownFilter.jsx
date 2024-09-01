import { ListRestart, SlidersHorizontalIcon } from "lucide-react";
import React, { useRef, useState } from "react";

const DropdownFilter = ({ filters, setFilters }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          title="Menu Filter"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-dashed  hover:bg-neutral hover:border-gray-400  border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 focus:outline-none transition-all duration-300 hover:text-white"
          id="options-menu"
        >
          <SlidersHorizontalIcon width={15} height={15} />
        </button>
      </div>
      {isOpen && (
        <div
          role="menu"
          className=" absolute right-0 mt-1 w-[11rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div className="flex-between px-4 py-4 h-12 border-gray-200 border-b ">
            <h3 className=" font-bold  text-xs">Kategori Filter</h3>
            {Object.values(filters).some((value) => value !== "") && (
              <button
                className="text-xs font-medium rounded-xl bg-indigo-400 p-1"
                title="Clear Filter"
                onClick={() => {
                  setFilters({
                    kelas: "",
                    kelasNama: "",
                    jenisKelamin: "",
                    tahunMasuk: "",
                  });
                  setIsOpen(false);
                }}
              >
                <ListRestart
                  width={15}
                  height={15}
                  className="text-white shadow-md"
                />
              </button>
            )}
          </div>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="px-4 py-2">
              <label className="block text-xs font-medium text-gray-700">
                Kelas
              </label>
              Kelas
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
