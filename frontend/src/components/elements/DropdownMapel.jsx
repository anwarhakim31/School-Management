import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const DropdownMapel = ({ htmlFor, onSelectMapel, register }) => {
  const mapelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dataMapel, setDataMapel] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState(undefined);

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getMapel = async () => {
      try {
        const res = await axios.get(HOST + "/api/mapel/get-mapel", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataMapel(res.data.mapel);
        }
      } catch (error) {
        responseError(error);
      }
    };
    getMapel();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (mapelRef.current && !mapelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectMapel = (kode, nama, id) => {
    setSelectedMapel({ kode, nama });
    onSelectMapel(id);
    setIsOpen(false);
  };

  return (
    <div ref={mapelRef} className="relative w-full">
      <input
        type="text"
        id={htmlFor}
        value={
          !selectedMapel
            ? "Pilih bidang studi"
            : `${selectedMapel.kode}      ${selectedMapel.nama}`
        }
        readOnly
        onClick={handleInputClick}
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
      />

      {isOpen && (
        <div className="absolute mt-1  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-25 overflow-y-auto">
            {dataMapel &&
              dataMapel.map((mp) => (
                <li
                  key={mp._id}
                  onClick={() => handleSelectMapel(mp.kode, mp.nama, mp._id)}
                  className="px-4 py-2 grid grid-cols-6 text-xs hover:bg-gray-200 cursor-pointer"
                >
                  <p className="">{mp.kode}</p>
                  <p className="col-span-5">{mp.nama}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMapel;
