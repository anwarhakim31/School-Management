import { HOST } from "@/util/constant";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const KelasDropdown = ({ onSelectKelas }) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [dataKelas, setDataKelas] = useState();
  const [selectedKelas, setSelectedKelas] = useState(0);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataKelas(res.status.kelas);
        }
      } catch (error) {
        reportError(error);
      }
    };

    getKelas();
  });

  console.log(dataKelas);

  const handleInputClick = () => {};

  return (
    <div ref={dropdownRef} className="relative w-28">
      <input
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        value={selectedKelas ? selectedKelas : "Pilih Kelas"}
        onClick={handleInputClick}
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>
      {/* {isOpen && (
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
      )} */}
    </div>
  );
};

export default KelasDropdown;
