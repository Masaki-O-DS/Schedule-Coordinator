import React from "react";
import TimeButton from "./TimeButton";

const SelectTime = ({ month, day }) => {
  const startTime = 9;
  const endTime = 24;
  const timeList = [];
  for (let i = startTime; i <= endTime; i++) {
    timeList.push(i);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-bold pb-3">
        {month}/{day}
      </p>
      <button className="bg-gray-300 rounded  px-1 py-0.5 my-3 hover:bg-amber-600 hover:text-white hover:font-bold ">
        全日×
      </button>
      <div className="flex flex-col justify-center items-center my-3">
        {timeList.map((time, index) => (
          <TimeButton key={index} id={index} time={time} />
        ))}
      </div>
    </div>
  );
};

export default SelectTime;
