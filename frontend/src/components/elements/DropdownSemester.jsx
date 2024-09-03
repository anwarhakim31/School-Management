import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import { ChevronDown, ChevronUpIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DropdownSemester = ({ onSelectedSemester }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(HOST + "/api/master/get-semester", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setSelectedSemester(res.data.semester.keterangan);
          onSelectedSemester(res.data.semester.keterangan);
        }
      } catch (error) {
        responseError(error);
      }
    };

    getData();
  }, []);

  const handleChange = (e) => {
    const Ajaran = e.target.value;
    setSelectedSemester(Ajaran);
    onSelectedSemester(Ajaran);
    setIsOpen(false);
  };

  const handleInputClick = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative w-32">
      <input
        className=" block w-full bg-white border capitalize text-xs select-none border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        id="semester"
        value={selectedSemester || ""}
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
            <li
              key={data.ajaran}
              onClick={() => handleChange({ target: { value: "semester 1" } })}
              className="px-4 py-2 hover:bg-gray-200 text-xs cursor-pointer"
            >
              Semester 1
            </li>
            <li
              key={data.ajaran}
              onClick={() => handleChange({ target: { value: "semester 2" } })}
              className="px-4 py-2 hover:bg-gray-200 text-xs cursor-pointer"
            >
              Semester 2
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSemester;
