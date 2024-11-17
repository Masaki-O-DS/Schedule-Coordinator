import React from "react";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import Selection from "../Components/Selection";
import { setName, setSelectDateTime } from "../features/visitorSchedule";
import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import useNavigation from "../hooks/useNavigation";

//訪問者がスケジュールを編集するページ
const VisitorEditSchedulePage = () => {
  const { name, dayList, eventId } = useSelector(
    (state) => state.visitorSchedule
  );
  const selectTime = useSelector((state) => state.visitorSchedule.selectTime);
  const { openThankyouPage } = useNavigation();
  const dispatch = useDispatch();

  //ソートしなければselectionで日付がゴチャゴチャになって表示される。
  const sortedDayList = dayList.slice().sort();

  //確定ボタンを押した時の処理
  const onClickToNextPage = async () => {
    console.log(eventId);
    const schedulesRef = doc(db, "visitor", eventId);

    //
    await setDoc(
      schedulesRef,
      {
        visitors: arrayUnion({ name, selectTime }),
      },
      { merge: true } //これで既存の内容を更新で消すことなく追加できる
    );

    // フォームをリセット（必要に応じて）
    dispatch(setName(""));
    dispatch(setSelectDateTime(""));
    openThankyouPage();
  };

  return (
    <div className="w-screen">
      <Header />
      <div className=" w-full grid grid-cols-5 grid-rows-1 items-center my-5 h-10">
        <p className="col-start-2 col-span-3 text-center text-xl">
          {name}様の<span className="text-red-500 font-bold">参加できない</span>
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
        {sortedDayList.map((date, index) => {
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

export default VisitorEditSchedulePage;
