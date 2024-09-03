import student from "../../../assets/svg/Teacher.svg";
import male from "../../../assets/svg/male.svg";
import female from "../../../assets/svg/female.svg";

const HeaderBox = ({ dataDetail, loading }) => {
  return (
    <div className="grid mb-6 sm:grid-cols-3 md:grid-cols-3 gap-4  md:gap-2 lg:gap-8 ">
      <div className=" bg-white flex items-center justify-between p-4 sm:px-3 xl:p-5 h-[85px]  rounded-md shadow-md border-r-4 border-t border-l border-t-gray-100 border-l-gray-100  border-sky-500">
        <div className="flex items-center gap-2">
          <div
            style={{
              background: "linear-gradient(to right top,#1a57b3, #5bbbea)",
            }}
            className=" w-10 h-10 flex-center rounded-full border-b-2 border-gray-300"
          >
            <img
              src={student}
              alt="student"
              className=""
              width={20}
              height={20}
            />
          </div>
          <h1 className="text-sm font-medium  text-sky-500">Total Siswa</h1>
        </div>
        <div className="flex-center w-8 h-8">
          {loading ? (
            <div className="border-4 border-neutral rounded-full w-6 h-6 border-t-white animate-spin"></div>
          ) : (
            <h3 className="text-lg font-semibold text-sky-500">
              {dataDetail.jumlahSiswa}
            </h3>
          )}
        </div>
      </div>
      <div className=" bg-white flex items-center justify-between  p-4 sm:px-3 xl:p-5 h-[85px] rounded-md shadow-md border-r-4 border-t border-l border-t-gray-100 border-l-gray-100   border-purple-600">
        <div className="flex items-center gap-2">
          <div
            className=" w-10 h-10 flex-center rounded-full border-b-2 border-gray-300"
            style={{
              background: "linear-gradient(to right top, #ba75e3, #6f80dc)",
            }}
          >
            <img
              src={male}
              alt="student"
              className="fill-white stroke-2    "
              width={25}
              height={25}
            />
          </div>
          <h1 className="text-sm text-purple-700 font-medium">Laki - Laki</h1>
        </div>
        <div className="flex-center w-8 h-8">
          {loading ? (
            <div className="border-4 border-neutral rounded-full w-6 h-6 border-t-white animate-spin"></div>
          ) : (
            <h3 className="text-lg font-semibold text-purple-600">
              {dataDetail.lk}
            </h3>
          )}
        </div>
      </div>
      <div className=" bg-white flex items-center justify-between  p-4 sm:px-3 xl:p-5 h-[85px] rounded-md shadow-md border-r-4 border-t border-l border-t-gray-100 border-l-gray-100 border-rose-600">
        <div className="flex items-center gap-2">
          <div
            className=" w-10 h-10 flex-center rounded-full border-b-2 border-gray-300"
            style={{
              background: "linear-gradient(to right top,#c94f60,#fe967d)",
            }}
          >
            <img
              src={female}
              alt="student"
              className=""
              width={20}
              height={20}
            />
          </div>
          <h1 className="text-sm font-medium text-rose-600 ">Perempuan</h1>
        </div>
        <div className="flex-center w-8 h-8">
          {loading ? (
            <div className="border-4 border-neutral rounded-full w-6 h-6 border-t-white animate-spin"></div>
          ) : (
            <h3 className="text-lg font-semibold text-rose-600">
              {dataDetail.pr}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
