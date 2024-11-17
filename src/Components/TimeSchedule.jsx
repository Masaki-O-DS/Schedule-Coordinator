import React from "react";

const TimeSchedule = ({ day }) => {
  const startTime = 9;
  const endTime = 24;
  const timeList = [];
  for (let i = startTime; i <= endTime; i++) {
    timeList.push(i);
  }
  return (
    <div className="mx-2 bg-yellow-200">
      <p className="font-bold text-center mb-4">{day}</p>
      {timeList.map((time, index) => (
        <div
          key={index}
          className="text-center border-solid border-gray-400 border"
        >
          {time}時
        </div>
      ))}
    </div>
  );
};

export default TimeSchedule;
