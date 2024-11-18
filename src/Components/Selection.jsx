import React, { useEffect, useState } from "react";
import SelectionArea from "@viselect/react";
import { dayStrToDateObj } from "../utils/time";
import { useDispatch } from "react-redux";

const Selection = ({ date, selectTime, setSelectDateTime }) => {
  const [selected, setSelected] = useState(() => new Set());
  // const { selectTimeList } = useSelector(
  //   (state) => state.schedule.selectTime[date] || { selectTimeList: [] }
  // );

  const { month, day } = dayStrToDateObj(date);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectTimeArray = Array.from(selected);
    const transformedTimeList = selectTimeArray.map((id) => id);
    dispatch(setSelectDateTime({ date, timeList: transformedTimeList }));
  }, [dispatch, date, selected, setSelectDateTime]);

  useEffect(() => {}, [selectTime]);

  const startTime = 9;
  const endTime = 24;
  const timeList = [];
  for (let i = startTime; i <= endTime; i++) {
    timeList.push(i);
  }
  // console.log(timeList);

  const extractIds = (els) =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full p-2 justify-center items-center select-none">
      <p>
        {month + 1}/{day}
      </p>
      <SelectionArea
        className="bg-blue-100 border-2 border-blue-500 rounded-md w-full"
        onMove={onMove}
        selectables=".selectable"
      >
        <div className="grid grid-cols-1 text-center">
          {timeList.map((time, index) => (
            <div
              className={`${
                selected.has(time)
                  ? "selectable w-full h-auto bg-gray-700 border border-gray-800"
                  : "selectable w-full h-auto bg-gray-100 border border-gray-300"
              }
              `}
              data-key={time}
              key={time}
            >
              {time}時
            </div>
          ))}
        </div>
      </SelectionArea>
    </div>
  );
};

export default Selection;
