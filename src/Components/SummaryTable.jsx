import React from "react";
import { useSelector } from "react-redux";
import { dayStrToDateObj } from "../utils/time";

const SummaryTable = ({ eventName, eventContent, members }) => {
  const { dayList } = useSelector((state) => state.adminSchedule);
  return (
    <>
      <div className="w-11/12 h-5/6 bg-white flex border-2 border-solid rounded-lg border-gray-500 border-opacity-55 p-5 ">
        {/* 左半分 */}
        <div className="w-3/12 grid  justify-end items-center grid-rows-5 h-full mr-5  ">
          <p className="text-right row-span-1">日程調整 選択日程</p>
          <p className="text-right row-span-1">イベント名</p>
          <p className="text-right row-span-2">イベント内容</p>
          <p className="text-right row-span-1">参加メンバー</p>
        </div>
        {/* 右半分 */}
        <div className="w-9/12 grid  justify-start items-center grid-rows-5">
          {/* 日程調整　選択日程 */}
          <div
            className={`grid  gap-0.5  grid-cols-10 row-span-1  ${
              dayList.length > 10
                ? " grid-rows-2 grid-cols-7"
                : "grid-rows-1 grid-cols-10"
            }`}
          >
            {dayList.map((dayobj) => {
              const { month, day } = dayStrToDateObj(dayobj);
              return (
                <p
                  key={dayobj}
                  className=" text-center border border-solid border-opacity-55 rounded bg-amber-100  px-1 text-sm ml-2"
                >
                  {month + 1}/{day}
                </p>
              );
            })}
          </div>
          {/* イベント名 */}
          <p className="row-span-1">{eventName}</p>
          {/* イベント内容 */}
          <div className="max-h-20 min-w-80 min-h-10 w-full p-2 row-span-2 overflow-y-auto break-words border border-solid border-gray-300 rounded mr-5">
            <p>{eventContent}</p>
          </div>
          {/* イベント参加メンバー */}
          <div className="grid grid-cols-10 grid-rows-1 gap-1 row-span-1">
            {members.length > 0 &&
              members.map((member) => {
                return (
                  <p
                    key={member}
                    className="bg-blue-100 text-center text-sm py-1 rounded "
                  >
                    {member}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryTable;
