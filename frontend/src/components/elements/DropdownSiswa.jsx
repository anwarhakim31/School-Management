import { selectedDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { data } from "autoprefixer";
import axios from "axios";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const DropdownSiswa = ({ onChange, value, url }) => {
  const dataEdit = useSelector(selectedDataEdit);
  const siswaRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dataSiswa, setdataSiswa] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dataEdit && dataEdit.siswa) {
      setSelectedSiswa({
        nama: dataEdit?.siswa?.nama,
        id: dataEdit?.siswa?._id,
      });
    }
  }, [dataEdit]);

  useEffect(() => {
    const getSiswa = async () => {
      try {
        const res = await axios.get(HOST + url, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setdataSiswa(
            res.data.siswa.sort((a, b) => a.nama.localeCompare(b.nama))
          );
        }
      } catch (error) {
        responseError(error);
      }
    };

    getSiswa();
  }, [url]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (siswaRef.current && !siswaRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    let clone = [...dataSiswa];

    if (search) {
      const split = search.trim().toLocaleLowerCase().split(" ");
      clone = clone.filter((data) =>
        split.every((key) => data.nama.toLocaleLowerCase().includes(key))
      );
    }

    setDataSearch(clone);
  }, [dataSiswa, search]);

  const handleSelectSiswa = (nama, id) => {
    setSelectedSiswa({ nama, id });
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div ref={siswaRef} className="relative w-full">
      <input
        type="text"
        id="siswa"
        value={!selectedSiswa ? "Pilih siswa" : selectedSiswa?.nama}
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

      {isOpen && dataSiswa?.length > 0 && (
        <div className="absolute mt-1  w-full bg-white border z-50 border-gray-400 rounded shadow">
          <div className=" sticky top-0   text-xs hover:bg-gray-200 cursor-pointer">
            <input
              type="search"
              id="search"
              onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
              placeholder="Cari nama siswa..."
              value={search}
              className="block mb-2 w-full text-xs bg-white border border-gray-400 hover:border-gray-500 px-8 py-2 pr-8 rounded shadow leading-tight focus:outline-none  "
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-2"
              width={15}
              height={15}
            />
          </div>
          <ul className="max-h-32 overflow-y-auto">
            {dataSearch.length === 0 && (
              <li
                tabIndex={0}
                className="   text-xs hover:bg-gray-200 text-center py-2"
              >
                <p>Data Siswa tidak ditemukan.</p>
              </li>
            )}
            {dataSiswa &&
              dataSearch.map((siswa) => (
                <li
                  key={siswa._id}
                  tabIndex={0}
                  onKeyDown={(e) => handleSelectSiswa(siswa.nama, siswa._id)}
                  onClick={() => handleSelectSiswa(siswa.nama, siswa._id)}
                  className={`px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer hover:text-neutral ${
                    selectedSiswa &&
                    selectedSiswa.id === siswa._id &&
                    "bg-blue-600 text-white"
                  }`}
                >
                  <p className="">{siswa.nama}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSiswa;
