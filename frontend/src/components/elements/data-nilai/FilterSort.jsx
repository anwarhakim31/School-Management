import { Filter } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const FilterSort = ({ handleSortChange, selectedSort }) => {
  const filterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropDown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    handleSortChange(e.target.value);
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
        <Filter width={15} height={15} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="w-[200px] border left-0 top-8 rounded-lg absolute  bg-white shadow-md z-10 flex flex-col gap-2 flex-between py-3 items-stretch"
        >
          <h4 className="text-xs border-b mb-2 px-3 pb-3 font-medium text-gray-700">
            Urut Bedasarkan :
          </h4>

          {["terbaru", "terlama", "a-z", "z-a", "100-0", "0-100"].map(
            (sort) => (
              <div key={sort} className="px-3 space-y-2">
                <div className="flex-between">
                  <label
                    htmlFor={sort}
                    className="text-xs capitalize cursor-pointer font-medium w-full"
                  >
                    {sort}
                  </label>
                  <input
                    type="radio"
                    value={sort}
                    id={sort}
                    onChange={handleFilterChange}
                    checked={selectedSort === sort}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSort;
