import { selectedDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const DropdownCategoryNilai = ({ onChange }) => {
  const dataEdit = useSelector(selectedDataEdit);
  const siswaRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ujian");

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dataEdit) {
      setSelectedCategory(dataEdit.kategori);
    }
  }, [dataEdit]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (siswaRef.current && !siswaRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={siswaRef} className="relative w-full">
      <input
        type="text"
        value={selectedCategory}
        readOnly
        onClick={handleInputClick}
        className="block w-full text-xs capitalize bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
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
          <ul className="max-h-28 overflow-y-auto">
            <li
              onClick={() => handleSelectCategory("ujian")}
              tabIndex={0}
              className={`px-4 py-2 text-xs hover:bg-gray-200 hover:text-neutral cursor-pointer ${
                selectedCategory === "ujian" && "bg-blue-600 text-white"
              }`}
            >
              <p className="">Ujian</p>
            </li>
            <li
              onClick={() => handleSelectCategory("tugas")}
              tabIndex={0}
              className="px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer"
            >
              <p className="">Tugas</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCategoryNilai;
