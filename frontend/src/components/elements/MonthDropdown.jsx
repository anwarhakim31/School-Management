import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MonthDropdown = ({ onSelectMonth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const dropdownRef = useRef(null);

  const currentMonth = new Date().getMonth();

  const getMonthName = (monthIndex) => {
    const date = new Date(0, monthIndex);
    return date.toLocaleString("default", { month: "long" });
  };

  useEffect(() => {
    setSelectedMonth({
      name: getMonthName(currentMonth),
      value: currentMonth + 1,
    });
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

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleMonthSelect = (monthIndex) => {
    const monthName = getMonthName(monthIndex);
    setSelectedMonth({ name: monthName, value: monthIndex });
    onSelectMonth(monthIndex);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-28">
      <input
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        id="bulan"
        value={selectedMonth ? selectedMonth.name : "Select a month"}
        onClick={handleInputClick}
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {Array.from({ length: 12 }, (_, index) => (
              <li
                key={index}
                onClick={() => handleMonthSelect(index)}
                className="px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer"
              >
                {getMonthName(index)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthDropdown;
