import React from "react";

const TimeButton = ({ id, time }) => {
  return (
    <button
      key={id}
      onMouseDown={(e) => {
        console.log("マウスをクリックした", e);
      }}
      onMouseUp={(e) => {
        console.log("マウスを離した", e);
      }}
      className="w-16 h-auto  bg-slate-100 border-solid border border-gray-500 px-1 border-opacity-50 hover:bg-gray-700 hover:text-white duration-100"
    >
      {time}時
    </button>
  );
};

export default TimeButton;
