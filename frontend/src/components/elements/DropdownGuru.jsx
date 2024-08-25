import { selectedDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const DropdownGuru = ({ onChange, bidangStudi, value }) => {
  const dataEdit = useSelector(selectedDataEdit);
  const guruRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dataGuru, setDataGuru] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState("");

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dataEdit) {
      setTimeout(() => {
        setSelectedGuru({ nama: dataEdit.guru.nama, id: dataEdit.guru._id });
        onChange(dataEdit.guru._id);
      }, 100);
    }
  }, [dataEdit]);

  useEffect(() => {
    if (bidangStudi) {
      setSelectedGuru("");
      onChange("");
    }
  }, [bidangStudi]);

  useEffect(() => {
    const getGuru = async () => {
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
      getGuru();
    }
  }, [bidangStudi]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guruRef.current && !guruRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    let clone = [...dataGuru];

    if (search) {
      const split = search.trim().toLocaleLowerCase().split(" ");
      clone = clone.filter((data) =>
        split.every((key) => data.nama.toLocaleLowerCase().includes(key))
      );
    }

    setDataSearch(clone);
  }, [dataGuru, search]);

  const handleSelectMapel = (nama, id) => {
    setSelectedGuru({ nama, id });
    onChange(id);
    setIsOpen(false);
  };

  console.log(selectedGuru);

  return (
    <div ref={guruRef} className="relative w-full">
      <input
        type="text"
        value={!selectedGuru ? "Pilih Guru" : selectedGuru.nama}
        readOnly
        onClick={handleInputClick}
        className="block w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer"
      />
      <div className="absolute pointer-events-none right-2 top-2.5">
        {isOpen ? (
          <ChevronUp width={15} height={15} />
        ) : (
          <ChevronDown width={15} height={15} />
        )}
      </div>

      {isOpen && dataGuru?.length > 0 && (
        <div className="absolute mt-1  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-25 overflow-y-auto">
            <li className=" relative  text-xs hover:bg-gray-200 cursor-pointer">
              <input
                type="search"
                placeholder="Cari nama guru..."
                value={search}
                className="block mb-2 w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-8 py-2 pr-8 rounded shadow leading-tight focus:outline-none  "
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 left-2"
                width={15}
                height={15}
              />
            </li>
            {dataSearch.length === 0 && (
              <li className="   text-xs hover:bg-gray-200 text-center py-2">
                <p>Data Guru tidak ditemukan.</p>
              </li>
            )}
            {dataGuru &&
              dataSearch.map((guru) => (
                <li
                  key={guru._id}
                  onClick={() => handleSelectMapel(guru.nama, guru._id)}
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
