import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useNavigation from "../hooks/useNavigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setAllScheduleList, setSelectIndex } from "../features/adminSchedule";

const ScheduleList = ({ setIsModal, setEventDetail }) => {
  const dispatch = useDispatch();
  const { allScheduleList } = useSelector((state) => state.adminSchedule);
  const { openConfirmPage } = useNavigation();

  //イベント詳細ボタンのイベントハンドラー
  const handleOpenModal = (index) => {
    setIsModal(true);
    setEventDetail(allScheduleList[index]);
  };

  //confirmPageに移動
  const handleNextPage = (index) => {
    const getVisitorDB = async (allScheduleList, index) => {
      try {
        const docRef = doc(db, "visitor", allScheduleList[index].eventId);
        console.log("documentID", allScheduleList[index].eventId);
        const docSnap = await getDoc(docRef);
        const visitorInfo = docSnap.data();
        sessionStorage.setItem("visitorInfo", JSON.stringify(visitorInfo));
        console.log("visitorの情報をDBから取得");
        openConfirmPage();
        dispatch(setSelectIndex(index));
        console.log("confirmPageへ");
      } catch (error) {
        console.log("visitorの情報をDBから取得できません。", error);
      }
    };
    getVisitorDB(allScheduleList, index);
  };

  //スケジュール調整の削除
  const handleDelete = (index) => {
    const deleteAdminDB = async () => {
      try {
        const filteredAllScheduleList = [
          ...allScheduleList.slice(0, index),
          ...allScheduleList.slice(index + 1),
        ];
        const docRef = doc(db, "admin", sessionStorage.getItem("adminID"));
        await setDoc(docRef, { events: filteredAllScheduleList });
        dispatch(setAllScheduleList(filteredAllScheduleList));
        console.log("更新完了");
      } catch (error) {
        console.log("更新できませんでした", error);
      }
    };
    deleteAdminDB();
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {allScheduleList.map((obj, index) => (
        <div
          key={index}
          className="w-3/4 h-20 bg-white my-3 rounded-lg border-solid border-4 border-gray-400 grid grid-cols-5 text-center place-items-center"
        >
          <button
            onClick={() => handleDelete(index)}
            className="h-8 w-8 sm:w-16 md:w-16 lg:w-20 xl:w-20 text-xs sm:text-sm md:text-sm xl:text-md lg:text-md bg-white rounded-md hover:bg-red-500 hover:text-white hover:font-bold border-2 border-solid duration-200 border-gray-500"
          >
            削除する
          </button>
          <p>
            作成日
            <br />
            {obj.createdDate.split("T")[0]}
          </p>
          <p>
            イベント名
            <br />
            {obj.eventName}
          </p>
          {/* <p>
            記入メンバー数 <br />
            {} / {obj.members.length}
          </p> */}
          <button
            onClick={() => handleOpenModal(index)}
            className="bg-blue-200 rounded w-fit p-1 hover:bg-midnight-blue hover:text-amber-400 hover:font-bold duration-200"
          >
            イベント詳細
          </button>
          <button
            onClick={() => handleNextPage(index)}
            className="bg-blue-200 rounded w-fit p-1 hover:bg-midnight-blue hover:text-amber-400 hover:font-bold duration-200"
          >
            日程の確認
          </button>
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
