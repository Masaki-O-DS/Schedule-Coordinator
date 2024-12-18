import React from "react";
import Header from "../Components/Header";
import { useSelector } from "react-redux";
import Selection from "../Components/Selection";
import useNavigation from "../hooks/useNavigation";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setSelectDateTime } from "../features/adminSchedule";

//管理者の参加できない日程を設定するペーーじ
const SelectDatePage = () => {
  const { dayList, eventId } = useSelector((state) => state.adminSchedule);
  const selectTime = useSelector((state) => state.adminSchedule.selectTime);

  const { openShareLinkPage } = useNavigation();
  const { eventName, eventContent, members } = useSelector(
    (state) => state.event
  );

  //確定ボタンを押した時の処理
  const onClickToNextPage = async () => {
    const newEvent = {
      eventId: eventId,
      eventName: eventName,
      eventContent: eventContent,
      members: members,
      coordinatorName: auth.currentUser.displayName,
      coordinatorSchedule: selectTime,
      createdDate: new Date(),
    };
    await setDoc(
      doc(db, "admin", auth.currentUser.uid),
      {
        events: arrayUnion(newEvent),
      },
      { merge: true } //これで既存の内容を更新で消すことなく追加できる
    );
    openShareLinkPage(); //ShareLinkPageへ
  };

  return (
    <div className="w-screen">
      <Header />
      <div className=" w-full grid grid-cols-5 grid-rows-1 items-center my-5 h-10">
        <p className="col-start-2 col-span-3 text-center text-xl">
          あなたの<span className="text-red-500 font-bold">参加できない</span>
          日程を選択してください。
        </p>
        <button
          onClick={onClickToNextPage}
          className="col-start-5 bg-slate-200 rounded w-20 h-8 hover:bg-amber-600 hover:text-white font-bold active:scale-90 duration-200"
        >
          確定
        </button>
      </div>
      <div className="lex-grow flex justify-around w-screen h-96">
        {dayList.map((date, index) => {
          return (
            <Selection
              key={index}
              date={date}
              selectTime={selectTime}
              setSelectDateTime={setSelectDateTime}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectDatePage;
