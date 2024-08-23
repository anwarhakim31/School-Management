import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DayDropdown = ({ onSelectDay }) => {
  const dayRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHari, setSelectedHari] = useState("");

  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dayRef.current && !dayRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectMapel = (nama, index) => {
    setSelectedHari(nama);
    onSelectDay(index);
    setIsOpen(false);
  };

  return (
    <div ref={dayRef} className="relative  ">
      <input
        type="text"
        value={!selectedHari ? "Pilih Hari" : selectedHari}
        readOnly
        onClick={handleInputClick}
        className="block w-28 text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-1  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-24 overflow-y-auto">
            {daysOfWeek.map((day, i) => (
              <li
                key={i}
                onClick={() => handleSelectMapel(day, i)}
                className="px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer"
              >
                <p className="">{day}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DayDropdown;
