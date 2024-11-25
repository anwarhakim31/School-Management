import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icon untuk dropdown
import { useSearchParams } from "react-router-dom";

const CustomDropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);
  const dropdownRef = useRef(null);
  const [searchParams] = useSearchParams();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

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

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex text-xs items-center px-2 py-1.5 truncate hover:bg-neutral hover:border-gray-400 hover:text-white border border-gray-300 bg-white transition-all duration-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral"
      >
        List baris{" "}
        <span className="font-semibold block ml-2">
          {searchParams.get("limit") || selectedOption}
        </span>
        {isOpen ? (
          <ChevronUp width={15} height={15} className="ml-2" />
        ) : (
          <ChevronDown width={15} height={15} className="ml-2" />
        )}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={
                  "block px-2 py-2 text-gray-700 w-full text-xs border-b border-gray-200 last:border-b-0 hover:bg-gray-100 focus:outline-none"
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
