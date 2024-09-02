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
  const [loading, setLoading] = useState(true);
  const [dataPer, setDataPer] = useState(0);
  const [selectedPer, setSelectedPer] = useState(0);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/jadwal/get-pertemuan", {
          params: {
            kelas,
            bidangStudi: dataUser.bidangStudi,
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataPer(res.data.pertemuan);
        }
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    };

    if (kelas && dataUser) {
      getKelas();
    }
  }, [kelas, dataUser]);

  useEffect(() => {
    if (dataPer === 0) {
      onChange(0);
    }

    if (kelas) {
      setSelectedPer(1);
      onChange(1);
    }
  }, [dataPer, kelas]);

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectKelas = (value) => {
    setSelectedPer(value);
    onChange(value);
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
    <div ref={dropdownRef} className="relative w-24">
      <input
        className={`${
          loading ? "text-white" : "text-inherit"
        } block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer`}
        readOnly
        disabled={dataPer === 0}
        value={selectedPer ? selectedPer : dataPer === 0 ? "kosong" : "Pilih"}
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
        <div className="absolute mt-1   w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {Array(dataPer)
              .fill()
              .map((_, i) => (
                <li
                  key={i + 1}
                  onClick={() => handleSelectKelas(i + 1)}
                  className="px-4 py-2 text-left text-xs hover:bg-gray-200 cursor-pointer truncate"
                >
                  {i + 1}
                </li>
              ))}
            <li
              className="px-4 py-2 text-left text-xs hover:bg-gray-200 cursor-pointer truncate"
              onClick={() => handleSelectKelas("ujian")}
            >
              Ujian
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PertemuanDropdown;
