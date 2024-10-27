import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const Calender = () => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="w-2/4 h-20 flex items-center ">
      <Datepicker
        primaryColor={"orange"}
        value={date}
        i18n="ja"
        onChange={(newValue) => setDate(newValue)}
        inputClassName="w-full px-3 py-2.5 rounded-md border-2 focus-visible:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default Calender;
