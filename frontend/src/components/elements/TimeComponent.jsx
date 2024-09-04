import { useEffect, useState } from "react";

const TimeComponent = () => {
  const today = new Date();

  const [time, setTime] = useState({
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${time.hours
    .toString()
    .padStart(2, "0")}:${time.minutes
    .toString()
    .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  return (
    <div className="bg-neutral rounded-md py-2">
      <h3 className="text-sm text-white text-center">
        {new Intl.DateTimeFormat("id-Id", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(today)}
      </h3>
      <h3 className="text-sm text-white text-center mt-2">{formattedTime}</h3>
    </div>
  );
};

export default TimeComponent;
