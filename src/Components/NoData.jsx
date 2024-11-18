import React from "react";

const NoData = () => {
  return (
    <div className="flex justify-center items-center h-3/4 w-full">
      <div className="w-3/4 h-3/4 bg-white rounded-xl border-solid border-4 border-gray-400 flex justify-center items-center ">
        <p className="text-red-500 font-bold text-center text-2xl">
          調整中のスケジュールはありません。
        </p>
      </div>
    </div>
  );
};

export default NoData;
