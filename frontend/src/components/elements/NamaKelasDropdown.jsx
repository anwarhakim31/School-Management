import { HOST } from "@/util/constant";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const NamaKelasDropdown = ({ onSelectIdKelas, kelas }) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [dataKelas, setDataKelas] = useState([]);
  const [namaKelas, setNamaKelas] = useState([]);
  const [selectedNamaKelas, setSelectedNamaKelas] = useState("");

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
    if (kelas) {
      const filter = dataKelas.filter((kel) => kel.kelas === kelas);

      setNamaKelas(filter);
    }
  }, [kelas]);

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectKelas = (value, id) => {
    setSelectedNamaKelas(value);
    onSelectIdKelas(id);
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

  console.log(kelas);

  return (
    <div ref={dropdownRef} className="relative w-28">
      <input
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        disabled={kelas === 0 || !kelas}
        value={
          kelas === 0
            ? "Pilih Kelas terlebih Dulu"
            : !selectedNamaKelas ||
              namaKelas.some((kel) => kel.nama !== selectedNamaKelas)
            ? "Pilih Nama Kelas"
            : selectedNamaKelas
        }
        onClick={handleInputClick}
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>
      {isOpen && kelas !== 0 && (
        <div className="absolute mt-1 max-w-28 overflow-hidden  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {namaKelas.map((kel) => (
              <li
                key={kel._id}
                onClick={() => handleSelectKelas(kel.nama, kel._id)}
                className="px-4 py-2 truncate text-center text-xs hover:bg-gray-200 cursor-pointer"
              >
                {kel.nama}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NamaKelasDropdown;
