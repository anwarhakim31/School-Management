import student from "../../../assets/svg/Student.svg";
import male from "../../../assets/svg/male.svg";
import female from "../../../assets/svg/female.svg";

const HeaderBox = ({ dataDetail }) => {
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-3 gap-4  md:gap-2 lg:gap-10 mb-6">
      <div className=" bg-white  p-4 sm:p-2 xl:p-5 min-h-[110px]  rounded-md shadow-md border-r-4 border-b-4  border-blue-800">
        <div className="flex-between">
          <h1 className="text-sm font-medium ">Total Siswa</h1>
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
        <h3 className="text-lg font-semibold text-blue-700">
          {dataDetail.jumlahSiswa}
        </h3>
      </div>
      <div className=" bg-white   p-4 sm:p-2 xl:p-5 min-h-[110px] rounded-md shadow-md border-r-4 border-b-4  border-purple-800">
        <div className="flex-between">
          <h1 className="text-sm font-medium">Laki - Laki</h1>
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
        <h3 className="text-lg font-semibold  text-purple-700">
          {dataDetail.lk}
        </h3>
      </div>
      <div className=" bg-white   p-4 sm:p-2 xl:p-5 min-h-[110px] rounded-md border-b-4 border-r-4 border-pink-800">
        <div className="flex-between">
          <h1 className="text-sm font-medium ">Perempuan</h1>
          <div className="bg-pink-600 w-10 h-10 flex-center rounded-full">
            <img
              src={female}
              alt="student"
              className=""
              width={20}
              height={20}
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-pink-600">{dataDetail.pr}</h3>
      </div>
    </div>
  );
};

export default HeaderBox;
