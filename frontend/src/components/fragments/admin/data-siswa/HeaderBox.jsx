import student from "../../../../assets/svg/Student.svg";

const HeaderBox = ({ dataDetail }) => {
  console.log(dataDetail);

  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-3 gap-4  md:gap-2 lg:gap-12 mb-6">
      <div className="h-[100px] bg-white border border-gray-200 p-4 sm:p-2 xl:p-4 rounded-md shadow-md">
        <div className="flex-between">
          <h1 className="text-md font-medium text-blue-700">Total Siswa</h1>
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
        <h3 className="text-lg font-bold text-gray-800">
          {dataDetail.jumlahSiswa}
        </h3>
      </div>
      <div className="h-[100px] bg-white border border-gray-200 rounded-md"></div>
      <div className="h-[100px] bg-white border border-gray-200 rounded-md"></div>
    </div>
  );
};

export default HeaderBox;
