import { selectedDataEdit } from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const KelasDropdown = ({ onChange, value }) => {
  const dataEdit = useSelector(selectedDataEdit);
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(HOST + "/api/kelas/get-kelas-mengajar", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setDataKelas(res.data.kelas.sort((a, b) => a.kelas - b.kelas));
        }
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    };

    getKelas();
  }, []);

  useEffect(() => {
    if (dataKelas.length > 0) {
      setSelectedKelas({ grade: dataKelas[0].kelas, nama: dataKelas[0].nama });
      onChange({
        id: dataKelas[0]._id,
        grade: dataKelas[0].kelas,
        nama: dataKelas[0].nama,
      });
    }
  }, [dataKelas]);

  const handleInputClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectKelas = (id, grade, nama) => {
    setSelectedKelas({ grade, nama });
    onChange({ id, grade, nama });
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
    <div ref={dropdownRef} className="relative w-40">
      <input
        id="kelas"
        className={`${
          loading ? "text-white" : "text-inherit"
        } block w-full text-xs bg-white border disabled:pointer-events-none border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-neutral focus:shadow-outline cursor-pointer`}
        readOnly
        disabled={dataKelas.length === 0}
        value={
          selectedKelas
            ? `${selectedKelas.grade} ${selectedKelas.nama}`
            : dataKelas.length === 0
            ? "Jadwal Kosong"
            : "Pilih Kelas"
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
      {isOpen && dataKelas.length > 0 && (
        <div className="absolute mt-1   w-full bg-white border z-50 border-gray-400 rounded shadow">
          <ul className="max-h-40 overflow-y-auto">
            {dataKelas &&
              dataKelas.map((kel) => (
                <li
                  key={kel._id}
                  onClick={() =>
                    handleSelectKelas(kel._id, kel.kelas, kel.nama)
                  }
                  className="px-4 py-2 text-left text-xs hover:bg-gray-200 cursor-pointer truncate"
                >
                  {kel.kelas} {kel.nama}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KelasDropdown;
