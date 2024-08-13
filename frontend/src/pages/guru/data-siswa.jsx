import HeaderBox from "@/components/elements/data-guru/HeaderBox";
import TableSiswa from "@/components/fragments/guru/data-guru/TableSiswa";
import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DataKelasguruPage = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector(selectedUserData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/kelas/get-wali-kelas/" + userData._id,
          { withCredentials: true }
        );

        setData(res.data.kelas);
      } catch (error) {
        responseError(error);
      }
    };

    getKelas();
  }, []);

  return (
    <section className="px-6 py-4 mb-4 ">
      {/* <HeaderBox dataDetail={dataDetail} loading={loading} /> */}
      <div className="w-full flex-between gap-6">
        <div className="relative flex w-full  md:max-w-[300px]">
          {/* <input
            type="search"
            placeholder="Cari..."
            value={search}
            disabled={loading}
            onChange={handleSearch}
            className="w-full rounded-full disabled:cursor-not-allowed py-1.5 pr-2 pl-10 text-sm border border-gray-400 outline-offset-0 outline-1 outline-neutral"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search height={20} width={20} className="text-gray-400" />
          </div> */}
        </div>

        {/* <Link
          to={"/admin/tambah-siswa"}
          className="flex-between gap-3 min-w-fit bg-neutral hover:bg-indigo-800 transition-all duration-300 text-white py-2.5 text-xs px-4 rounded-md "
        >
          <img src={Student} alt="student" width={15} height={15} />
          Tambah Siswa
        </Link> */}
      </div>

      <div className="relative bg-white w-full  mt-6 border  overflow-hidden  rounded-lg">
        <div className="flex-between px-4 h-14 ">
          <div className="flex items-center gap-4  ">
            {/* <button
              title="Hapus siswa terpilih"
              onClick={handleToggleDeleteMany}
              className={`${
                dataChecked.length > 0 ? "opacity-100" : "opacity-0"
              } border block border-gray-300 bg-white text-gray-500 group rounded-md  hover:border-gray-400    py-1.5 px-2 transition-all duration-300 font-medium hover:text-white  text-xs   flex-between gap-3`}
            >
              <Trash2 width={15} height={15} className=" text-neutral2 " />
            </button> */}

            {/* <CustomDropdown
              options={selectRow}
              onSelect={handleSelectBaris}
              selected={limit}
            />
            <DropdownFilter
              handleFilterChange={handleFilterChange}
              setFilters={setFilters}
            /> */}
          </div>
          <div>
            {/* <ExportExcel
              columns={columns}
              data={dataSiswa}
              namaFile={"Data-Siswa"}
              loading={loading}
            /> */}
          </div>
        </div>
        {loading ? (
          <div className="block w-full shadow-md pb-[3.5rem]">
            <div className="w-full min-h-[430px] flex-center bg-gray-200 animate-pulse overflow-auto ">
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-neutral animate-spin"></div>
            </div>
          </div>
        ) : (
          <TableSiswa data={data} />
        )}
      </div>
      {/* {isDeleteSiswa && <DeleteModal onClose={handleToggleDeleteOne} />}
      {isDeleteManySiswa && (
        <DeleteManyModal
          onClose={handleToggleDeleteMany}
          setAllCheck={setAllCheck}
        />
      )} */}
    </section>
  );
};

export default DataKelasguruPage;
