import React from "react";

const TimeSchedule = ({ day, schedule }) => {
  const startTime = 9;
  const endTime = 24;
  const timeList = [];
  for (let i = startTime; i <= endTime; i++) {
    timeList.push(i);
  }

  return (
    <div className="mx-2">
      <p className="font-bold text-center mb-4">{day.split("T")[0]}</p>
      {timeList.map((time, index) => (
        <div
          key={index}
          className={`text-center border-solid  border  ${
            schedule.selectTimeList.includes(time)
              ? "bg-gray-700 text-black border-gray-700"
              : "font-bold border-blue-600 bg-blue-100"
          }`}
        >
          {time}時
        </div>
      ))}
    </div>
  );
};

export default TimeSchedule;
