import { ListRestart, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DayDropdown from "./DayDropdown";
import KelasDropdown from "./KelasDropdown";
import { object } from "zod";
import NamaKelasDropdown from "./NamaKelasDropdown";

const DropDownFilter2 = ({ handleFilterChange, setFilter }) => {
  const filterRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    kelas: "",
    namaKelas: "",
    hari: "",
  });

  const handleToggleDropDown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleChangeDay = (value) => {
    setSelectedFilter({ ...selectedFilter, hari: value });
    handleFilterChange("hari", value);
  };
  const handleChangeKelas = (value) => {
    setSelectedFilter({ ...selectedFilter, kelas: value });
    handleFilterChange("kelas", value);
  };

  const handleChangeNamakelas = (value) => {
    setSelectedFilter({ ...selectedFilter, namaKelas: value });
    handleFilterChange("namaKelas", value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={filterRef} className="relative">
      <button
        type="button"
        title="Menu Filter"
        onClick={handleToggleDropDown}
        className="inline-flex justify-center w-full rounded-md border border-dashed  hover:bg-neutral hover:border-gray-400  border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 focus:outline-none transition-all duration-300 hover:text-white"
        id="options-menu"
      >
        <SlidersHorizontal width={15} height={15} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute mt-1 w-[9.25rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div className="flex-between px-4 py-4 h-12 border-gray-200 border-b ">
            <h3 className=" font-bold  text-xs">Kategori Filter</h3>
            {Object.values(selectedFilter).some((value) => value !== "") && (
              <button
                className="text-xs font-medium rounded-xl bg-indigo-400 hover:bg-neutral p-1"
                title="Clear Filter"
                onClick={() => {
                  setSelectedFilter({ hari: "", kelas: "", namaKelas: "" });
                  setFilter({ hari: "", kelas: "", namaKelas: "" });
                  setReset(!reset);
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
            <div className="px-4 py-2 ">
              <DayDropdown
                onChange={handleChangeDay}
                value={selectedFilter.hari}
                reset={reset}
              />
            </div>
            <div className="px-4 py-2 w-full">
              <KelasDropdown
                onChange={handleChangeKelas}
                value={selectedFilter.kelas}
                reset={reset}
              />
            </div>
            {selectedFilter.kelas && (
              <div className="px-4 py-2 w-full">
                <NamaKelasDropdown
                  onChange2={handleChangeNamakelas}
                  kelas={selectedFilter.kelas}
                  value={selectedFilter.namaKelas}
                  reset={reset}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownFilter2;
