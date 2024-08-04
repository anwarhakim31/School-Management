import React, { forwardRef, useEffect, useRef } from "react";

const FilterKelas = forwardRef(
  ({ handleOptionChange, option, handleToggleFilter }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[200px] border left-0 top-8 rounded-lg absolute h-[135px] bg-white shadow-md z-10 flex flex-col flex-between py-3 items-stretch"
      >
        <h4 className="text-xs border-b px-3 pb-3 font-medium text-gray-700">
          Urut Bedasarkan :
        </h4>
        <div className="px-3 space-y-2">
          <div className="flex-between ">
            <label className="text-xs font-medium">Kelas</label>
            <div>
              <div className="flex-between gap-2">
                <input
                  type="radio"
                  name="kelas"
                  value={"asc"}
                  id="kelas-asc"
                  onChange={handleOptionChange}
                  checked={option[0] === "kelas" && option[1] === "asc"}
                  className="w-3 h-3"
                />
                <label className="text-xs font-medium" htmlFor="kelas-asc">
                  Ascending
                </label>
              </div>
              <div className="flex-between gap-2">
                <input
                  type="radio"
                  name="kelas"
                  value={"desc"}
                  onChange={handleOptionChange}
                  checked={option[0] === "kelas" && option[1] === "desc"}
                  id="kelas-desc"
                  className="w-3 h-3"
                />
                <label className="text-xs font-medium" htmlFor="kelas-desc">
                  Decending
                </label>
              </div>
            </div>
          </div>
          <div className="flex-between gap-2 ">
            <label className="text-xs font-medium">Nama </label>
            <div>
              <div className="flex-between gap-2">
                <input
                  type="radio"
                  name="nama"
                  onChange={handleOptionChange}
                  value={"asc"}
                  checked={option[0] === "nama" && option[1] === "asc"}
                  id="nama-asc"
                  className="w-3 h-3"
                />
                <label className="text-xs font-medium" htmlFor="nama-asc">
                  Ascending
                </label>
              </div>
              <div className="flex-between gap-2">
                <input
                  type="radio"
                  name="nama"
                  onChange={handleOptionChange}
                  value={"desc"}
                  checked={option[0] === "nama" && option[1] === "desc"}
                  id="nama-desc"
                  className="w-3 h-3"
                />
                <label className="text-xs" htmlFor="nama-desc">
                  Decending
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FilterKelas.displayName = "filter";

export default FilterKelas;
