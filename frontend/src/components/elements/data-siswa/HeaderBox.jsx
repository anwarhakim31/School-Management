import student from "../../../assets/svg/Teacher.svg";
import male from "../../../assets/svg/male.svg";
import female from "../../../assets/svg/female.svg";

const HeaderBox = ({ dataDetail, loading }) => {
  return (
    <div className="grid mb-6 sm:grid-cols-3 md:grid-cols-3 gap-4  md:gap-2 lg:gap-8 ">
      <div className=" bg-white flex flex-col justify-between p-4 sm:px-3 xl:p-5 h-[110px]  rounded-md shadow-md border-r-4 border-t border-l border-t-gray-100 border-l-gray-100  border-blue-800">
        <div className="flex-between">
          <h1 className="text-sm font-medium  text-blue-700">Total Siswa</h1>
          <div className="bg-blue-700 w-10 h-10 flex-center rounded-full">
            <img
              src={student}
              alt="student"
              className=""
              width={20}
              height={20}
            />
          </div>
        </div>
        {loading ? (
          <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-gray-500 animate-spin"></div>
        ) : (
          <h3 className="text-lg font-semibold">{dataDetail.jumlahSiswa}</h3>
        )}
      </div>
      <div className=" bg-white flex flex-col justify-between  p-4 sm:px-3 xl:p-5 h-[110px] rounded-md shadow-md border-r-4 border-t border-l border-t-gray-100 border-l-gray-100   border-purple-800">
        <div className="flex-between">
          <h1 className="text-sm text-purple-700 font-medium">Laki - Laki</h1>
          <div className="bg-purple-700 w-10 h-10 flex-center rounded-full">
            <img
              src={male}
              alt="student"
              className="fill-white stroke-2    "
              width={25}
              height={25}
            />
          </div>
        </div>
        {loading ? (
          <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-gray-500 animate-spin"></div>
        ) : (
          <h3 className="text-lg font-semibold ">{dataDetail.lk}</h3>
        )}
      </div>
      <div className=" bg-white flex flex-col justify-between  p-4 sm:px-3 xl:p-5 h-[110px] rounded-md shadow-md border-r-4 border-t border-l border-t-gray-100 border-l-gray-100 border-pink-800">
        <div className="flex-between">
          <h1 className="text-sm font-medium text-rose-500 ">Perempuan</h1>
          <div className="bg-rose-500 w-10 h-10 flex-center rounded-full">
            <img
              src={female}
              alt="student"
              className=""
              width={20}
              height={20}
            />
          </div>
        </div>
        {loading ? (
          <div className="border-4 border-gray-300 rounded-full w-6 h-6 border-t-gray-500 animate-spin"></div>
        ) : (
          <h3 className="text-lg font-semibold ">{dataDetail.pr}</h3>
        )}
      </div>
    </div>
  );
};

export default HeaderBox;
