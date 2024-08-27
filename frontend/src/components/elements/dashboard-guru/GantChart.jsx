import React from "react";

const totalDailyMinutes = 8 * 60;

const getClassColor = (classNumber) => {
  const colors = [
    "#bc7229",
    "#af57db",
    "#2eb88a",
    "#17C6C7",
    "#fd9a01",
    "#cc3433",
    "#e23670",
    "#2662d9",
    "#E74C3C",
    "#2ECC71",
    "#E67E22",
    "#3498DB",
  ];
  return colors[(classNumber - 1) % colors.length];
};

const GantChart = ({ schedules, durasi, loading }) => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  console.log(schedules);

  const calculatePercentage = (start, end) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const totalMinutes = endTime - startTime;
    return (totalMinutes / durasi.lama) * 100; // Convert to percentage
  };

  console.log(durasi);

  // Function to calculate the 'left' position in percentage
  const calculateLeft = (start) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const startTime = startHour * 60 + startMinute;
    return ((startTime - durasi.mulai) / durasi.lama) * 100; // 420 = 07:00 in minutes
  };

  return (
    <div className="overflow-x-auto">
      {days.map((day) => (
        <div
          key={day}
          className="grid grid-cols-1 sm:grid-cols-10  min-w-[300px]   sm:min-w-0 sm:h-10"
        >
          <div className="flex items-center justify-center font-medium  text-gray-700  border-gray-100 p-2">
            <p className="text-[0.625rem]">{day}</p>
          </div>
          <div className="relative   sm:col-span-9 border-b border-l  border-gray-100 h-16    sm:h-10">
            {!loading &&
              schedules
                .filter((schedule) => schedule.hari === day)
                .map((schedule, idx) => {
                  const width = calculatePercentage(
                    schedule.mulai,
                    schedule.selesai
                  );
                  const left = calculateLeft(schedule.mulai);
                  const color = getClassColor(schedule.kelas.kelas);

                  return (
                    <div
                      key={idx}
                      className="absolute top-1 bottom-1 text-center   rounded-sm flex flex-col items-center justify-center shadow-md"
                      style={{
                        width: `${width}%`,
                        left: `${left}%`,
                        backgroundColor: color,
                        color: "#FFFFFF",
                        fontSize: "0.5rem",
                        padding: "2px 5px",
                      }}
                    >
                      <p className="text-[0.5rem] truncate">{schedule.class}</p>
                      <p className="text-[0.5rem] flex flex-col sm:flex-row  ">
                        {schedule.mulai} <span> - </span> {schedule.selesai}
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GantChart;
