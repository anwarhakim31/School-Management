import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const CustomSelectOption = ({ onChange, wali }) => {
  const dropRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [guru, setGuru] = useState([]);
  const [waliKelas, setWaliKelas] = useState("Tidak memiliki Wali Kelas");

  const handleWaliKelasSelection = (nama, id) => {
    if (nama === "") {
      setWaliKelas("Tidak memiliki Wali Kelas");
    } else {
      setWaliKelas(nama);
    }

    onChange(id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (wali) {
      const value = guru.find((item) => item._id === wali);

      setWaliKelas(value?.nama || "");
    }
  }, [guru, wali]);

  useEffect(() => {
    const guru = async () => {
      try {
        const res = await axios.get(HOST + "/api/guru/get-guru", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setGuru(res.data.guru);
        }
      } catch (error) {
        responseError(error);
      }
    };
    guru();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropRef} className="w-full relative  text-xs  rounded-md ">
      <input
        type="text"
        id="waliKelas"
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
        value={waliKelas}
        readOnly
        className="px-2 py-1.5 w-full  border  rounded-md  outline-neutral select-none cursor-pointer border-gray-500"
      />
      <div className="absolute top-2 right-2 ">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>

      {isOpen && (
        <div
          role="dropdown"
          className="absolute left-0 top-8 w-full  overflow-y-scroll max-h-[125px] bg-white border  border-gray-500 rounded-md"
        >
          {
            <button
              type="button"
              onClick={() => handleWaliKelasSelection("", "")}
              className="cursor-pointer block w-full my-1 py-1 text-left hover:bg-background px-2"
            >
              {"Kosongkan"}
            </button>
          }
          {guru &&
            guru.map((gu) => (
              <button
                key={gu._id}
                value={gu.nama}
                type="button"
                onClick={() => handleWaliKelasSelection(gu.nama, gu._id)}
                className="cursor-pointer block w-full my-1 py-1 text-left hover:bg-background px-2"
              >
                {gu.nama}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectOption;
