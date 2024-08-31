import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const PertemuanDropdown = ({ onChange, value, kelas }) => {
  const dataUser = useSelector(selectedUserData);
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [dataPer, setDataPer] = useState([]);
  const [selectedPer, setSelectedPer] = useState(1);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas-mengajar", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataPer(res.data.kelas.sort((a, b) => a.kelas - b.kelas));
        }
      } catch (error) {
        reportError(error);
      }
    };

    getKelas();
  }, []);

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectKelas = (value) => {
    setSelectedPer(value);
    // onChange(dataKelas[0]._id);
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
    <div ref={dropdownRef} className="relative w-40">
      <input
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        value={selectedPer ? selectedPer : "Pilih Kelas"}
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
            {/* {dataKelas &&
              dataKelas.map((kel) => (
                <li
                  key={kel._id}
                  onClick={() => handleSelectKelas(kel.kelas, kel.nama)}
                  className="px-4 py-2 text-left text-xs hover:bg-gray-200 cursor-pointer truncate"
                >
                  {kel.kelas} {kel.nama}
                </li>
              ))} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PertemuanDropdown;
