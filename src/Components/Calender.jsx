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

  return (
    <div className="w-full h-full flex-col justify-normal flex items-center">
      <div className="px-10 pt-3 w-3/4">
        <Datepicker
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
          // useRange={false}
          primaryColor={"amber"}
          placeholder="Select date"
          value={date}
          i18n="ja"
          onChange={(newValue) => onDaysList(newValue)}
          inputClassName="w-full px-20 py-2.5 rounded-md border-2  focus-visible:outline-none focus:border-blue-500"
        />
      </div>

      <div className=" gap-2 mt-10 px-14 grid-cols-14">
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
