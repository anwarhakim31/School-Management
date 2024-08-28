import { Filter, SlidersHorizontal } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const FilterCategory = ({ handleOptionChange, selectedFilter }) => {
  const filterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropDown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    handleOptionChange(e.target.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={filterRef} className="relative">
      <button
        type="button"
        title="Sort sorts"
        onClick={handleToggleDropDown}
        className="inline-flex justify-center w-full rounded-md border border-dashed hover:bg-neutral hover:border-gray-400 border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 focus:outline-none transition-all duration-300 hover:text-white"
        id="sorts-menu"
      >
        <SlidersHorizontal width={15} height={15} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="w-[200px] border left-0 top-8 rounded-lg absolute  bg-white shadow-md z-10 flex flex-col  flex-between py-3 items-stretch"
        >
          <h4 className="text-xs border-b mb-2 px-3 pb-3 font-medium text-gray-700">
            Kategori Filter :
          </h4>
          <div className="px-4 py-2">
            <label className="block text-xs font-medium text-gray-700">
              Kategori Ujian
            </label>
            <select
              name="kelas"
              value={selectedFilter}
              onChange={handleFilterChange}
              className="block w-full px-4 py-1.5 mt-1 text-xs text-gray-700 bg-white border-gray-300 rounded-md border focus:outline-none"
              role="menuitem"
            >
              <option value="">Semua</option>

              <option value={"ujian"} className="my-2">
                Ujian
              </option>
              <option value={"tugas"} className="my-2">
                Tugas
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCategory;
