import { selectedDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const DropdownMapel = ({ onChange, value, url }) => {
  const dataEdit = useSelector(selectedDataEdit);
  const mapelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dataMapel, setDataMapel] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState("");

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (dataEdit) {
  //     setSelectedMapel({
  //       kode: dataEdit.bidangStudi.kode,
  //       nama: dataEdit.bidangStudi.nama,
  //     });
  //   }
  // }, [dataEdit]);

  useEffect(() => {
    const getMapel = async () => {
      try {
        const res = await axios.get(HOST + url, {
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
  }, [url]);

  useEffect(() => {
    if (dataMapel) {
      let clone = [...dataMapel];

      if (search) {
        const split = search.trim().toLocaleLowerCase().split(" ");
        clone = clone.filter((data) =>
          split.every((key) => data.nama.toLocaleLowerCase().includes(key))
        );
      }

      setDataSearch(clone);
    }
  }, [dataMapel, search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mapelRef.current && !mapelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectMapel = (kode, nama, id) => {
    setSelectedMapel({ kode, nama });
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div ref={mapelRef} className="relative w-full">
      <input
        type="text"
        value={
          !selectedMapel
            ? "Pilih Mata Pelajaran"
            : `${selectedMapel.kode}      ${selectedMapel.nama}`
        }
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

      {isOpen && (
        <div className="absolute mt-1  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-28 overflow-y-auto">
            <li className="sticky top-0   text-xs hover:bg-gray-200 cursor-pointer">
              <input
                type="search"
                placeholder="Cari nama Mata Pelajaran..."
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
                <p>Data Mata Pelajaran tidak ditemukan.</p>
              </li>
            )}
            {dataMapel &&
              dataSearch.map((mp) => (
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
