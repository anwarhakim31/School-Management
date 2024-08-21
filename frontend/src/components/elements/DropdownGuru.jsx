import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const DropdownGuru = ({ onSelectGuru, bidangStudi }) => {
  const guruRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dataGuru, setDataGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState("");

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getMapel = async () => {
      try {
        const res = await axios.get(HOST + "/api/guru/get-all-guru", {
          withCredentials: true,
          params: { bidangStudi },
        });

        if (res.status === 200) {
          setDataGuru(res.data.data);
        }
      } catch (error) {
        responseError(error);
      }
    };

    if (bidangStudi) {
      getMapel();
    }
  }, [bidangStudi]);

  useEffect(() => {
    !dataGuru.some((data) => data.nama === selectedGuru) && setSelectedGuru("");
  }, [dataGuru]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guruRef.current && !guruRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectMapel = (nama) => {
    setSelectedGuru(nama);
    onSelectGuru(nama);
    setIsOpen(false);
  };

  return (
    <div ref={guruRef} className="relative w-full">
      <input
        type="text"
        value={!selectedGuru ? "Pilih Guru" : selectedGuru}
        readOnly
        onClick={handleInputClick}
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
      />

      {isOpen && dataGuru?.length > 0 && (
        <div className="absolute mt-1  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-25 overflow-y-auto">
            {dataGuru &&
              dataGuru.map((guru) => (
                <li
                  key={guru._id}
                  onClick={() => handleSelectMapel(guru.nama)}
                  className="px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer"
                >
                  <p className="">{guru.nama}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownGuru;
