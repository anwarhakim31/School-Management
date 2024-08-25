import Gant from "../../assets/svg/Gant.svg?react";
import React from "react";

// Sample schedule data with class attribute
export const schedules = [
  { day: "Senin", start: "07:00", end: "08:00", class: 1 },
  { day: "Senin", start: "13:30", end: "14:30", class: 2 },
  { day: "Selasa", start: "10:00", end: "12:00", class: 3 },
  { day: "Rabu", start: "09:00", end: "11:30", class: 4 },
  { day: "Kamis", start: "07:00", end: "10:00", class: 5 },
  { day: "Jumat", start: "12:00", end: "15:00", class: 6 },
  { day: "Sabtu", start: "08:00", end: "09:30", class: 7 },
  { day: "Minggu", start: "13:00", end: "15:00", class: 8 },
  // Add more schedules here
];

// Total working minutes per day (8 hours = 480 minutes)
const totalDailyMinutes = 8 * 60; // From 07:00 to 15:00

// Function to calculate the percentage width based on start and end times
const calculatePercentage = (start, end) => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;
  const totalMinutes = endTime - startTime;
  return (totalMinutes / totalDailyMinutes) * 100; // Convert to percentage
};

// Function to calculate the 'left' position in percentage
const calculateLeft = (start) => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const startTime = startHour * 60 + startMinute;
  return ((startTime - 420) / totalDailyMinutes) * 100; // 420 = 07:00 in minutes
};

// Function to get color based on class number
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
  return colors[(classNumber - 1) % colors.length]; // Ensure it cycles through colors
};

const GuruDashboardPage = () => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <section className="px-6 py-4">
      <div className="w-full px-4 py-4 bg-white rounded-lg shadow-lg">
        <div className="border-b pb-4 border-gray-100 flex items-center gap-2 mb-4">
          <div>
            <Gant width={"20"} height={"20"} />
          </div>
          <span className="text-sm font-semibold">Jadwal Mengajar</span>
        </div>
        <div className="overflow-x-auto">
          {days.map((day) => (
            <div
              key={day}
              className="grid grid-cols-1 sm:grid-cols-10 gap-1 min-w-[300px] sm:min-w-0 sm:h-10"
            >
              <div className="flex items-center justify-center font-medium  text-gray-700  border-gray-100 p-2">
                <p className="text-[0.625rem]">{day}</p>
              </div>
              <div className="relative   sm:col-span-9 border border-gray-100 h-14    sm:h-10">
                {schedules
                  .filter((schedule) => schedule.day === day)
                  .map((schedule, idx) => {
                    const width = calculatePercentage(
                      schedule.start,
                      schedule.end
                    );
                    const left = calculateLeft(schedule.start);
                    const color = getClassColor(schedule.class);

                    return (
                      <div
                        key={idx}
                        className="absolute top-1 bottom-1 text-center  rounded-sm flex flex-col items-center justify-center shadow-md"
                        style={{
                          width: `${width}%`,
                          left: `${left}%`,
                          backgroundColor: color,
                          color: "#FFFFFF",
                          fontSize: "0.625rem",
                          padding: "2px 5px",
                        }}
                      >
                        <p className="text-[0.5rem]">Kelas {schedule.class}</p>
                        <p className="text-[0.5rem] flex flex-nowrap gap-1 ">
                          {schedule.start} <span> - </span> {schedule.end}
                        </p>
                        {/* <span className="sm:hidden">
                        {schedule.start} <br />
                        <br /> {schedule.end}
                      </span> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuruDashboardPage;
