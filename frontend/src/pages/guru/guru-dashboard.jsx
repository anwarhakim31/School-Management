import React from "react";

// Sample schedule data
export const schedules = [
  { day: "Monday", start: "07:00", end: "09:15" },
  { day: "Monday", start: "13:00", end: "14:00" },
  { day: "Tuesday", start: "10:00", end: "12:00" },
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

const GuruDashboardPage = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-4">
      <div className="grid grid-cols-9 gap-0.5 mb-2 text-xs">
        <div className="bg-gray-200"></div>
        {[
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
        ].map((slot, index) => (
          <div key={index} className="text-center font-bold bg-gray-300 p-1">
            {slot}
          </div>
        ))}
      </div>
      <div>
        {days.map((day) => (
          <div key={day} className="grid grid-cols-10 gap-0.5 mb-1">
            <div className="text-center font-bold bg-gray-200 p-1">{day}</div>
            <div className="col-span-9 relative h-6">
              {schedules
                .filter((schedule) => schedule.day === day)
                .map((schedule, idx) => {
                  const width = calculatePercentage(
                    schedule.start,
                    schedule.end
                  );
                  const left = calculatePercentage("07:00", schedule.start);

                  return (
                    <div
                      key={idx}
                      className="absolute bg-blue-500 h-full"
                      style={{
                        width: `${width}%`,
                        left: `${left}%`,
                        top: 0,
                        bottom: 0,
                      }}
                    />
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuruDashboardPage;
