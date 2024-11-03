import { eachDayOfInterval } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import { setDayList } from "../features/scheduleControl";
import { dayStrToDateObj } from "../utils/time";

const Calendar = () => {
  const dispatch = useDispatch();
  const { dayList } = useSelector((state) => state.scheduleControl);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  //カレンダーの設定
  const MIN_DATE = new Date();
  const MAX_DATE = new Date();
  MAX_DATE.setDate(MAX_DATE.getDate() + 13);

  //指定期間内の全日程を取得
  const getDatesList = (startDate, endDate) => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  //カレンダーで指定した全日程をDayListに格納
  const onDaysList = (newValue) => {
    const start = newValue.startDate;
    const end = newValue.endDate;
    const dateList = getDatesList(start, end);
    dispatch(setDayList(dateList.map((day) => day.toISOString())));
  };

  //カレンダーのリセットボタンを押してDayListとdateを初期化
  const handleResetDate = () => {
    setDate({ startDate: null, endDate: null });
    dispatch(setDayList([]));
  };

  //日程の中で不要な日は削除する
  const handleDeleteDay = (e) => {
    const targetButtonId = e.target.id;
    const newDayList = dayList.toSpliced(targetButtonId, 1);
    dispatch(setDayList(newDayList));
  };

  return (
    <div className="w-full h-full flex-col justify-normal flex items-center">
      <div className="px-10 pt-3 w-3/4 flex  items-center">
        <Datepicker
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
          // useRange={false}
          primaryColor={"amber"}
          placeholder="Select date"
          value={date}
          i18n="ja"
          onChange={(newValue) => onDaysList(newValue)}
          inputClassName="w-full pl-10 py-2.5 rounded-md border-2  focus-visible:outline-none focus:border-blue-500"
        />
        <button
          className="w-20 h-8 ml-5 bg-red-400 rounded hover:bg-red-500 hover:text-white duration-200 active:scale-90"
          onClick={(e) => handleResetDate(e)}
        >
          reset
        </button>
      </div>

      <p className="mt-10">
        不要な日程は下のボタンを押して<span className="text-red-500">削除</span>
        してください
      </p>
      <div className=" gap-2  pl-14 pr-10 grid-cols-5 grid-rows-3">
        {dayList.length > 0 &&
          dayList.map((dayobj, index) => {
            const { month, day } = dayStrToDateObj(dayobj);

            return (
              <button
                className="bg-white rounded border border-gray-400 w-12 mt-3 px-1 mx-3 text-sm p-1 hover:bg-red-500 duration-200 active:scale-90 flex-wrap "
                id={index}
                key={index}
                onClick={handleDeleteDay}
              >{`${month + 1}/${day}`}</button>
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;
