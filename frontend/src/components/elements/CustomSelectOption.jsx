import { selectedDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CustomSelectOption = ({ onChange }) => {
  const dataEdit = useSelector(selectedDataEdit);
  const dropRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [guru, setGuru] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [waliKelas, setWaliKelas] = useState({
    nama: "Tidak memiliki Wali Kelas",
  });

  const handleWaliKelasSelection = (nama, id) => {
    if (nama === "") {
      setWaliKelas({ nama: "Tidak memiliki Wali Kelas" });
    } else {
      setWaliKelas({ nama, id });
    }

    onChange(id);
    setIsOpen(false);
  };
  useEffect(() => {
    if (dataEdit && dataEdit.waliKelas) {
      const dataE = guru.find((item) => item._id === dataEdit.waliKelas._id);

      if (dataE) {
        setWaliKelas({ nama: dataE.nama, id: dataE._id });
      }
    }
  }, [dataEdit, guru]);

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
    let clone = [...guru];

    if (search) {
      const splitKey = search.trim().toLocaleLowerCase().split(" ");

      clone = clone.filter((teacher) => {
        return splitKey.every((key) =>
          teacher.nama.toLocaleLowerCase().includes(key)
        );
      });
    }

    setDataSearch(clone);
  }, [search, guru]);

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
        value={waliKelas.nama}
        readOnly
        className={`$ px-2 py-1.5 w-full  border  rounded-md  outline-neutral select-none cursor-pointer border-gray-500`}
      />
      <div className="absolute top-2 right-2 ">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>

      {isOpen && (
        <ul
          role="dropdown"
          className="absolute left-0 top-8 w-full  overflow-y-scroll max-h-[125px] bg-white border  border-gray-500 rounded-md"
        >
          <li>
            <div className="sticky top-0   text-xs hover:bg-gray-200 cursor-pointer">
              <input
                type="search"
                placeholder="Cari nama guru..."
                value={search}
                className=" block mb-2 w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-8 py-2 pr-8 rounded shadow leading-tight focus:outline-none  "
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 left-2"
                width={15}
                height={15}
              />
            </div>
          </li>
          {
            <li
              tabIndex={0}
              type="button"
              onClick={() => handleWaliKelasSelection("", "")}
              className="cursor-pointer block w-full my-1 py-1 text-left hover:bg-background px-2"
            >
              {"Kosongkan"}
            </li>
          }
          {guru &&
            dataSearch.map((gu) => (
              <li
                key={gu._id}
                value={gu.nama}
                type="button"
                tabIndex={0}
                onClick={() => handleWaliKelasSelection(gu.nama, gu._id)}
                className={`${
                  waliKelas.id &&
                  waliKelas.id === gu._id &&
                  "bg-blue-600 text-white"
                } cursor-pointer block w-full my-1 py-1 text-left hover:bg-gray-300 hover:text-neutral px-2`}
              >
                {gu.nama}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectOption;
