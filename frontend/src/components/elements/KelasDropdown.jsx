import { HOST } from "@/util/constant";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const KelasDropdown = ({ onSelectKelas }) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [dataKelas, setDataKelas] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(0);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataKelas(res.data.kelas);
        }
      } catch (error) {
        reportError(error);
      }
    };

    getKelas();
  }, []);

  useEffect(() => {
    if (dataKelas) {
      const seen = {};
      const uniqueKleas = [];

      for (const kelass of dataKelas) {
        if (!seen[kelass.kelas]) {
          seen[kelass.kelas] = true;
          uniqueKleas.push(kelass.kelas);
        }
      }
      setKelas(uniqueKleas);
    }
  }, [dataKelas]);

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectKelas = (value) => {
    setSelectedKelas(value);
    onSelectKelas(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleclickOutSide = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleclickOutSide);

    return () => document.removeEventListener("mousedown", handleclickOutSide);
  }, [isOpen]);

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
      {isOpen && dataKelas.length > 0 && (
        <div className="absolute mt-1   w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {kelas &&
              kelas.map((kel) => (
                <li
                  key={kel}
                  onClick={() => handleSelectKelas(kel)}
                  className="px-4 py-2 text-center text-xs hover:bg-gray-200 cursor-pointer"
                >
                  {kel}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KelasDropdown;
