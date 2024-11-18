import React, { useState } from "react";
import Header from "../Components/Header";
import TimeSchedule from "../Components/TimeSchedule";
import { useSelector } from "react-redux";

const ConfirmPage = () => {
  const { allScheduleList, selectIndex } = useSelector(
    (state) => state.adminSchedule
  );
  const adminSchedule = allScheduleList[selectIndex];

  const [visitorInfo, setVisitorInfo] = useState(() => {
    const visitorInfoFromSession = sessionStorage.getItem("visitorInfo");
    try {
      const res = visitorInfoFromSession
        ? JSON.parse(visitorInfoFromSession)
        : null;
      console.log("visitorInfoを取得", res);
      return res;
    } catch (error) {
      console.log("sessionStorageからvisitorInfoを取得できていません", error);
    }
  });

  // 重複を排除して統合する関数
  function mergeSelectTimeLists(adminEvent, visitorsData) {
    const mergedSchedule = {};
    // coordinatorScheduleから全ての日付を取得
    const eventDates = Object.keys(adminEvent.coordinatorSchedule);
    eventDates.forEach((date) => {
      const mergedSet = new Set();
      try {
        // adminEventからselectTimeListを追加
        const eventSelectTimes =
          adminEvent.coordinatorSchedule[date].selectTimeList;
        eventSelectTimes.forEach((time) => mergedSet.add(time)); //管理者の予定がをsetに追加
        console.log("管理者の予定を取り込めました:", mergedSet);
      } catch (error) {
        console.log("管理者の予定を取り込めてない", error);
      }
      try {
        console.log("visitorsData.visitorsは何もの？", visitorsData);
        visitorsData.visitors.map((visitor) => {
          console.log("visitor", visitor);
          const visitorSelectTime = visitor.selectTime[date]; //各visitorから同じ日付のselectTimeListを追加
          console.log(visitorSelectTime);
          visitorSelectTime.selectTimeList.forEach((time) =>
            mergedSet.add(time)
          );
          console.log("visitorの予定を取り込めました。", mergedSet);
        });
      } catch (error) {
        console.log("visitorの予定を取り込めませんでした", error);
      }

      // SetをArrayに戻してmergedScheduleに格納
      mergedSchedule[date] = {
        selectTimeList: Array.from(mergedSet).sort((a, b) => a - b), // ソート
      };
    });

    return mergedSchedule;
  }

  const mergedSchedule = mergeSelectTimeLists(adminSchedule, visitorInfo);
  console.log("mergedSchedule", mergedSchedule);
  console.log("mergedSchedule", mergedSchedule);

  //visitorの情報がなかったらどうするのかをまだ誰も記入していないということを表示する

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-20 w-full flex flex-col justify-center items-center">
        <div>イベント名：{adminSchedule.eventName}</div>
        <div className="flex ">
          招待済みメンバー：
          {adminSchedule.members.map((member, index) => (
            <p key={index} className="mx-2">
              {member}
            </p>
          ))}
        </div>
      </div>
      <div className="w-auto flex items-center justify-around">
        {Object.keys(mergedSchedule)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((key, index) => (
            <TimeSchedule
              key={index}
              day={key}
              schedule={mergedSchedule[key]}
            ></TimeSchedule>
          ))}
      </div>
    </div>
  );
};

export default ConfirmPage;
