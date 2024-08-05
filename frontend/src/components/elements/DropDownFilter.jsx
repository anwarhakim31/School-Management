import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import { ListRestart, SlidersHorizontal } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { object } from "zod";

const FilterDropdown = ({ handleFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    kelas: "",
    jenisKelamin: "",
    tahunMasuk: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilter((prev) => ({ ...prev, [name]: value }));
    handleFilterChange(name, value);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(HOST + "/api/auth/get-data-umum");
      } catch (error) {
        responseError(error);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          title="Menu Filter"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-dashed  hover:bg-neutral hover:border-gray-400  border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 focus:outline-none transition-all duration-300 hover:text-white"
          id="options-menu"
        >
          <SlidersHorizontal width={15} height={15} />
        </button>
      </div>

      {isOpen && (
        <div
          role="menu"
          className=" absolute right-0 mt-1 w-[11.5rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div className="flex-between px-4 py-4 h-12 border-gray-200 border-b ">
            <h3 className=" font-bold  text-xs">Kategori Filter</h3>
            {Object.values(selectedFilter).some((value) => value !== "") && (
              <button
                className="text-xs font-medium rounded-xl bg-indigo-400 p-1"
                title="Clear Filter"
                onClick={() =>
                  setSelectedFilter({
                    kelas: "",
                    jenisKelamin: "",
                    tahunMasuk: "",
                  })
                }
              >
                <ListRestart
                  width={15}
                  height={15}
                  className="text-white shadow-md"
                />
              </button>
            )}
          </div>

          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="px-4 py-2">
              <label className="block text-xs font-medium text-gray-700">
                Kelas
              </label>
              <select
                name="kelas"
                value={selectedFilter.kelas}
                onChange={handleDropdownChange}
                className="block w-full px-4 py-1.5 mt-1 text-xs text-gray-700 bg-white border-gray-300 rounded-md border focus:outline-none"
                role="menuitem"
              >
                <option value="">Semua</option>
                <option value="Kelas 1">Kelas 1</option>
                <option value="Kelas 2">Kelas 2</option>
                <option value="Kelas 3">Kelas 3</option>
                {/* Tambahkan opsi kelas lainnya sesuai kebutuhan */}
              </select>
            </div>

            <div className="px-4 py-2">
              <label className="block text-xs font-medium text-gray-700">
                Jenis Kelamin
              </label>
              <select
                name="jenisKelamin"
                value={selectedFilter.jenisKelamin}
                onChange={handleDropdownChange}
                className="block w-full px-4 py-1.5 mt-1 text-xs text-gray-700 bg-white border-gray-300 rounded-md border  focus:outline-none"
                role="menuitem"
              >
                <option value="">Semua</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="px-4 py-2">
              <label className="block text-xs font-medium text-gray-700">
                Tahun Masuk
              </label>
              <select
                name="tahunMasuk"
                value={selectedFilter.tahunMasuk}
                onChange={handleDropdownChange}
                className="block w-full px-4 py-1.5 mt-1 text-xs text-gray-700 bg-white border-gray-300 rounded-md  border focus:outline-none"
                role="menuitem"
              >
                <option value="">Semua</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                {/* Tambahkan opsi tahun masuk lainnya sesuai kebutuhan */}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
