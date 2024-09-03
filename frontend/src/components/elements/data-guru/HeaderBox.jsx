import guru from "../../../assets/svg/Student.svg";
import male from "../../../assets/svg/male.svg";
import female from "../../../assets/svg/female.svg";

const HeaderBox = ({ dataDetail, loading }) => {
  return (
    <div className="flex-between flex-wrap xl:flex-nowrap gap-4 mb-6">
      <div className=" grid flex-1 sm:grid-cols-2  md:grid-cols-4 gap-4 lg:justify-center items-center  md:gap-2   ">
        <div className=" bg-white  flex items-center justify-between  p-4 sm:px-3 xl:p-5 h-[85px] shadow-lg w-full rounded-md border-t border-t-gray-100 border-l-gray-100 border-r-4 border-l   border-blue-500">
          <div className="flex items-center gap-2">
            <div
              style={{
                background: "linear-gradient(to right top,#537ec0, #5bbbea)",
              }}
              className="w-10 h-10 flex-center rounded-full"
            >
              <img
                src={guru}
                alt="guru"
                className="text-white fill-white stroke-white"
                width={20}
                height={20}
              />
            </div>
            <h1 className="text-sm font-medium text-blue-500">Total Guru</h1>
          </div>
          <div className="flex-center w-8 h-8">
            {loading ? (
              <div className="border-4  border-neutral rounded-full w-6 h-6 border-t-4 border-t-white  border-l-gray-100  animate-spin"></div>
            ) : (
              <h3 className="text-lg font-semibold text-blue-500">
                {dataDetail.jumlahGuru}
              </h3>
            )}
          </div>
        </div>
        <div className="order-3 lg:order-2 bg-white flex items-center justify-between  p-4 sm:px-3 xl:p-5 h-[85px] shadow-lg rounded-md border-t border-t-gray-100 border-l-gray-100 border-r-4 border-l   border-purple-600">
          <div className="flex items-center gap-2">
            <div
              style={{
                background: "linear-gradient(to right top, #ba75e3, #6f80dc)",
              }}
              className=" w-10 h-10 flex-center rounded-full"
            >
              <img
                src={male}
                alt="guru"
                className="fill-white stroke-2    "
                width={25}
                height={25}
              />
            </div>
            <h1 className="text-sm font-medium text-purple-600">Laki - Laki</h1>
          </div>
          <div className="flex-center w-8 h-8">
            {loading ? (
              <div className="border-4 border-neutral rounded-full w-6 h-6 border-t-4 border-t-white border-l-gray-100  animate-spin"></div>
            ) : (
              <h3 className="text-lg font-semibold  text-purple-600 ">
                {dataDetail.lk}
              </h3>
            )}
          </div>
        </div>
        <div className="order-4 lg:order-3 bg-white flex items-center justify-between  p-4 sm:px-3 xl:p-5 h-[85px] shadow-lg rounded-md  border-t border-t-gray-100 border-l-gray-100 border-r-4 border-l border-rose-400">
          <div className="flex items-center gap-2">
            <div
              style={{
                background: "linear-gradient(to right top,#c94f60,#fe967d)",
              }}
              className=" w-10 h-10 flex-center rounded-full"
            >
              <img
                src={female}
                alt="guru"
                className=""
                width={20}
                height={20}
              />
            </div>
            <h1 className="text-sm font-medium text-rose-400">Perempuan</h1>
          </div>
          <div className="flex-center w-8 h-8">
            {loading ? (
              <div className="border-4 border-neutral rounded-full w-6 h-6 border-t-4 border-t-white  animate-spin"></div>
            ) : (
              <h3 className="text-lg font-semibold ">{dataDetail.pr}</h3>
            )}
          </div>
        </div>

        <div className="order-2 lg:order-4 bg-white flex-col flex justify-between py-4  border-l  h-[85px] rounded-md  border-r-4  border-t border-t-gray-100 border-l-gray-100 shadow-lg border-green-500">
          <div className="flex-between px-4  h-8 border-green-500">
            <h1 className="text-xs font-medium text-green-500">Aktif</h1>
            <div className="flex-center w-6 h-6">
              {loading ? (
                <div className="border-4 border-gray-200 border-t-neutral rounded-full w-4 h-4 animate-spin"></div>
              ) : (
                <h3 className="text-sm font-semibold ">
                  {dataDetail.active || 0}
                </h3>
              )}
            </div>
          </div>

          <div className="flex-between px-4 h-8 ">
            <h1 className="text-xs font-medium  text-green-500">Non Aktif</h1>
            <div className="flex-center w-6 h-6">
              {loading ? (
                <div className="border-4 border-gray-200 border-t-neutral rounded-full w-4 h-4 animate-spin"></div>
              ) : (
                <h3 className="text-sm font-semibold ">
                  {dataDetail.nonActive || 0}{" "}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
