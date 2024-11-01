import { eachDayOfInterval } from "date-fns";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const Calendar = () => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [dayList, setDayList] = useState([]);

  const getDatesList = (startDate, endDate) => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const onDaysList = (newValue) => {
    const start = newValue.startDate;
    const end = newValue.endDate;
    const dateList = getDatesList(start, end);
    setDayList([...dateList]);
  };

  const MIN_DATE = new Date();

  const MAX_DATE = new Date();
  MAX_DATE.setDate(MAX_DATE.getDate() + 14);

  const handleResetDate = () => {
    setDate({ startDate: null, endDate: null });
    setDayList([]);
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
          onClick={handleResetDate}
        >
          reset
        </button>
      </div>

      <div className=" gap-2 mt-10 pl-14 pr-10 grid-cols-14">
        {dayList.length > 0 &&
          dayList.map((dayobj, index) => {
            const month = dayobj.getMonth();
            const day = dayobj.getDate();
            return (
              <button
                className="bg-white rounded border border-gray-400 w-20 mt-3 px-3 mx-3 text-sm p-1 hover:bg-slate-500 flex-wrap "
                key={index}
              >{`${month}/${day}`}</button>
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;
