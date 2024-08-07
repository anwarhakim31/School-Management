import guru from "../../../assets/svg/Student.svg";
import male from "../../../assets/svg/male.svg";
import female from "../../../assets/svg/female.svg";

const HeaderBox = ({ dataDetail, loading }) => {
  return (
    <div className="flex-between flex-wrap xl:flex-nowrap gap-4 mb-6">
      <div className=" grid flex-1 md:grid-cols-3 gap-4 md:justify-center items-center  md:gap-2  px-4 py-8 border border-gray-300 rounded-md  bg-white ">
        <div className=" bg-white  flex flex-col justify-between  p-4 sm:px-3 xl:p-5 h-[110px] shadow-xl w-full rounded-md border-t border-t-gray-100 border-l-gray-100 border-r-4 border-l border-b-4  border-blue-800">
          <div className="flex-between">
            <h1 className="text-sm font-medium ">Total Guru</h1>
            <div className="bg-blue-700 w-10 h-10 flex-center rounded-full">
              <img
                src={guru}
                alt="guru"
                className="text-white fill-white stroke-white"
                width={20}
                height={20}
              />
            </div>
          </div>
          {loading ? (
            <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t border-t-gray-100 border-l-gray-100 blue-700 animate-spin"></div>
          ) : (
            <h3 className="text-lg font-semibold text-blue-700">
              {dataDetail.jumlahSiswa}
            </h3>
          )}
        </div>
        <div className=" bg-white flex flex-col justify-between  p-4 sm:px-3 xl:p-5 h-[110px] shadow-xl rounded-md border-t border-t-gray-100 border-l-gray-100 border-r-4 border-l border-b-4  border-purple-800">
          <div className="flex-between">
            <h1 className="text-sm font-medium">Laki - Laki</h1>
            <div className="bg-purple-700 w-10 h-10 flex-center rounded-full">
              <img
                src={male}
                alt="guru"
                className="fill-white stroke-2    "
                width={25}
                height={25}
              />
            </div>
          </div>
          {loading ? (
            <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t border-t-gray-100 border-l-gray-100 purple-700 animate-spin"></div>
          ) : (
            <h3 className="text-lg font-semibold text-purple-700">
              {dataDetail.lk}
            </h3>
          )}
        </div>
        <div className=" bg-white flex flex-col justify-between  p-4 sm:px-3 xl:p-5 h-[110px] shadow-xl rounded-md border-b-4 border-t border-t-gray-100 border-l-gray-100 border-r-4 border-l border-pink-800">
          <div className="flex-between">
            <h1 className="text-sm font-medium ">Perempuan</h1>
            <div className="bg-pink-600 w-10 h-10 flex-center rounded-full">
              <img
                src={female}
                alt="guru"
                className=""
                width={20}
                height={20}
              />
            </div>
          </div>
          {loading ? (
            <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t border-t-pink-600  animate-spin"></div>
          ) : (
            <h3 className="text-lg font-semibold text-pink-600">
              {dataDetail.pr}
            </h3>
          )}
        </div>
      </div>
      <div className=" w-[250px]  bg-white px-4 py-8 boder rounded-md border border-gray-300">
        <div className=" bg-white flex flex-col justify-between  py-4 border-l  h-[110px] rounded-md  border-r-4 border-b-4 border-t border-t-gray-100 border-l-gray-100 shadow-xl border-green-700">
          <div className="flex-between px-4 pb-3 border-green-500">
            <h1 className="text-xs font-medium ">Aktif</h1>
            {loading ? (
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              <h3 className="text-lg font-semibold text-pink-600">
                {dataDetail.pr}
              </h3>
            )}
          </div>
          <div className="w-full h-2 bg-green-100"></div>
          <div className="flex-between px-4 pt-3">
            <h1 className="text-xs font-medium ">Non Aktif</h1>
            {loading ? (
              <div className="border-4 border-gray-300 rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              <h3 className="text-lg font-semibold text-pink-600">
                {dataDetail.pr}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
