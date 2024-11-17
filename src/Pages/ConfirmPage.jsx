import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import TimeSchedule from "../Components/TimeSchedule";

const ConfirmPage = () => {
  const [adminEvent, setAdminEvent] = useState();
  const [visitorInfo, setVisitorInfo] = useState();
  const [dayList, setDayList] = useState();

  useEffect(() => {
    const adminEventFromSession = sessionStorage.getItem("adminEvent");
    const parsedAdmin = JSON.parse(adminEventFromSession);
    const dayList = Object.keys(parsedAdmin.coordinatorSchedule);
    const sortedDayList = dayList.slice().sort(); //ソート
    const splitDayList = sortedDayList.map((day) => day.split("T")[0]);
    setDayList(splitDayList);
    setAdminEvent(parsedAdmin);
    const visitorInfoFromSession = sessionStorage.getItem("visitorInfo");
    setVisitorInfo(JSON.parse(visitorInfoFromSession));

    // console.log(adminEvent())
  }, []);
  console.log(adminEvent);
  console.log(visitorInfo);
  console.log(dayList);

  //ソートしなければselectionで日付がゴチャゴチャになって表示される。
  //   const sortedDayList = dayList.slice().sort();

  //visitorの情報がなかったらどうするのかをまだ誰も記入していないということを表示する
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-20 w-full bg-red-100 flex flex-col justify-self-center items-center">
        <div>イベント名：{adminEvent.eventName}</div>
        <div className="flex ">
          招待済みメンバー：
          {adminEvent.members.map((member, index) => (
            <p key={index} className="mx-2">
              {member}
            </p>
          ))}
        </div>
      </div>
      <div className="w-auto bg-blue-100 flex items-center justify-around">
        {dayList.map((day) => (
          <TimeSchedule day={day}></TimeSchedule>
        ))}
      </div>
      {/* <div>{adminEvent.}</div> */}
    </div>
  );
};

export default ConfirmPage;
