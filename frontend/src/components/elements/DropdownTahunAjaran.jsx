import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import { ChevronDown, ChevronUpIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DropdownTahunAjaran = ({ onSelectAjaran }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAjaran, setSelectedAjaran] = useState(null);
  const [dataAjaran, setDataAjaran] = useState([]);
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

  const handleChange = (e) => {
    const Ajaran = e.target.value;
    setSelectedAjaran(Ajaran);
    onSelectAjaran(Ajaran);
    setIsOpen(false);
  };

  const handleInputClick = (e) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getAjaran = async () => {
      try {
        const res = await axios.get(HOST + "/api/ajaran/get-ajaran", {
          withCredentials: true,
        });

        if (res.status == 200) {
          const data = res.data.ajaran.sort((a, b) => b.status - a.status);

          setDataAjaran(data);
          setSelectedAjaran(data[0]?.ajaran);
          onSelectAjaran(data[0]?.ajaran);
        }
      } catch (error) {
        responseError(error);
      }
    };

    getAjaran();
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-32">
      <input
        className=" block w-full bg-white border text-xs select-none border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
        readOnly
        id="ajaran"
        value={selectedAjaran || ""}
        onClick={handleInputClick}
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUpIcon width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>

      {isOpen && dataAjaran.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border z-10 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {dataAjaran &&
              dataAjaran.map((data) => (
                <li
                  key={data.ajaran}
                  onClick={() =>
                    handleChange({ target: { value: data.ajaran } })
                  }
                  className="px-4 py-2 hover:bg-gray-200 text-xs cursor-pointer"
                >
                  {data.ajaran}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownTahunAjaran;
