import { Fragment } from "react";

const JadwalFragment = ({ libur, liburNasional, dataJadwal, loading }) => {
  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
  }).format(new Date());

  function matchingTanggal(tanggal) {
    return tanggal.split("T")[0];
  }

  console.log(dataJadwal.filter((jadwal) => jadwal.hari === today));

  return (
    <Fragment>
      <h1 className="text-sm font-medium text-neutral  border-b border-neutral text-center py-2">
        Jadwal Sekarang
      </h1>
      {loading ? (
        <div className="min-h-16 py-2.5">
          <div className="">
            <div className="relative my-2 h-4 w-1/2 mx-auto block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
            <div className="relative my-2 h-4 w-1/2  block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
            <div className="relative my-2 h-3 w-1/2  block bg-backup transition-all duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent flex-center opacity-50 animate-shimmer"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative min-h-24 grid grid-cols-1  xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-1 py-2  gap-2">
          {!liburNasional.some(
            (holiday) =>
              matchingTanggal(holiday.tanggal) ===
              matchingTanggal(new Date().toISOString())
          ) &&
          !libur.some(
            (holiday) => holiday.hari === today && holiday.status === true
          ) &&
          dataJadwal.filter((jadwal) => jadwal.hari === today).length === 0 ? (
            <div className="py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-xs justify-center items-center gap-1 ">
              <p className="font-medium capitalize text-center text-[#fb7d5b]">
                {loading ? "" : "Tidak ada jadwal"}
              </p>
            </div>
          ) : (
            dataJadwal
              .filter((jadwal) => jadwal.hari === today)
              .map((jadwal) => (
                <div key={jadwal._id} className=" py-2 ">
                  <div className="flex text-xs justify-center items-center gap-1 ">
                    <h5>⫷ {jadwal.mulai}</h5>
                    <span> : </span>
                    <h5>{jadwal.selesai} ⫸</h5>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-medium">
                      {jadwal.bidangStudi.nama}
                    </p>
                    <p className="text-xs mt-1">{jadwal.guru.nama}</p>
                  </div>
                </div>
              ))
          )}
          {liburNasional.length > 0 &&
            !libur.some(
              (holiday) => holiday.hari === today && holiday.status === true
            ) &&
            liburNasional
              .filter(
                (holiday) =>
                  matchingTanggal(holiday.tanggal) ===
                  matchingTanggal(new Date().toISOString())
              )
              .map((holiday) => (
                <div
                  key={holiday._id}
                  className="py-4 absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-xs justify-center items-center gap-1 "
                >
                  <p className="font-medium capitalize text-center text-[#fb7d5b]">
                    {loading
                      ? ""
                      : `Tidak ada jadwal. Hari ${
                          holiday.keterangan.toLowerCase().includes("libur")
                            ? holiday.keterangan
                            : `Libur ${holiday.keterangan}`
                        }`}
                  </p>
                </div>
              ))}
          {libur.length > 0 &&
            libur
              .filter(
                (holiday) => holiday.hari === today && holiday.status === true
              )
              .map((holiday) => (
                <div
                  key={holiday._id}
                  className="py-4 absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-xs justify-center items-center gap-1 "
                >
                  <p className="font-medium capitalize text-center text-[#fb7d5b]">
                    {loading
                      ? ""
                      : `Tidak ada jadwal. Hari ${
                          holiday.keterangan.toLowerCase().includes("libur")
                            ? holiday.keterangan
                            : `Libur ${holiday.keterangan}`
                        }`}
                  </p>
                </div>
              ))}
        </div>
      )}
    </Fragment>
  );
};

export default JadwalFragment;
