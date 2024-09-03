import { ChevronDown, ChevronUpIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const YearDropdown = ({ onSelectYear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const dropdownRef = useRef(null);
  const startYear = 2000;

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setSelectedYear(currentYear);
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onSelectYear(year);
    setIsOpen(false);
  };

  const handleInputClick = (e) => {
    setIsOpen(!isOpen);
  };

  const years = [];
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }

  return (
    <div ref={dropdownRef} className="relative w-24">
      <input
        className=" block w-full bg-white border text-xs select-none border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        id="tahun"
        value={selectedYear || "Tahun"}
        onClick={handleInputClick}
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUpIcon width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border z-10 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {[...years].reverse().map((year) => (
              <li
                key={year}
                onClick={() => handleChange({ target: { value: year } })}
                className="px-4 py-2 hover:bg-gray-200 text-xs cursor-pointer"
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
