import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAllScheduleList, setSelectIndex } from "../features/adminSchedule";
import EventDetailModal from "../Components/EventDetailModal";
import useNavigation from "../hooks/useNavigation";
import { toQueryRef } from "firebase/data-connect";

//管理者がスケジュール調整を確認できるページ

const AdminTimeManagementPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [eventDetail, setEventDetail] = useState();
  const dispatch = useDispatch();
  const adminID = sessionStorage.getItem("adminID");
  const { allScheduleList } = useSelector((state) => state.adminSchedule);
  const { openConfirmPage } = useNavigation();

  //DBからこのユーザーのスケジュール情報を全て抽出する
  // idにアクセスがあった時に、fireStoreからデータを取得する。
  useEffect(() => {
    const getAdminDB = async (id) => {
      try {
        const docRef = doc(db, "admin", id); //adminコレクションからデータを取得する
        const docSnap = await getDoc(docRef);

        const allEventData = docSnap.data().events;
        console.log(allEventData);
        //ここでタイムスタンプをreduxに保管するために一度処理を入れる
        const modifiedAllEventData = allEventData.map((data) => ({
          ...data, //スプレッド構文でタイムスタンプ以外の箇所はそのままでcreatedDateだけをtoISOString変換
          createdDate: data.createdDate.toDate().toISOString(), //firestoreのタイムスタンプはDate型に一度変換しないとtoISOStringにできない
        }));

        dispatch(setAllScheduleList(modifiedAllEventData));
        console.log("管理者の情報を取得しました");
      } catch (error) {
        console.log("管理者の情報を取得できてない", error);
      }
    };

    console.log("adminID", adminID);
    getAdminDB(adminID);
  }, [adminID, dispatch]);

  //イベント詳細ボタンのイベントハンドラー
  const handleOpenModal = (index) => {
    setIsModal(true);
    setEventDetail(allScheduleList[index]);
  };

  const handleNextPage = (index) => {
    const getVisitorDB = async (allScheduleList, index) => {
      try {
        console.log(
          "allScheduleList[index].eventId",
          allScheduleList[index].eventId
        );
        const docRef = doc(db, "visitor", allScheduleList[index].eventId);
        const docSnap = await getDoc(docRef);
        const visitorInfo = docSnap.data();
        // const modifiedVisitorInfo = visitorInfo.map((data) =>
        //   JSON.stringify(data)
        // );
        sessionStorage.setItem("visitorInfo", JSON.stringify(visitorInfo));
        console.log("visitorの情報を取得");
      } catch (error) {
        console.log("visitorの情報を取得できません。", error);
      }
    };
    getVisitorDB(allScheduleList, index);
    sessionStorage.setItem(
      "adminEvent",
      JSON.stringify(allScheduleList[index])
    );
    openConfirmPage();
  };

  return (
    <div className="w-screen h-screen bg-slate-300">
      {isModal && (
        <EventDetailModal eventDetail={eventDetail} setIsModal={setIsModal} />
      )}
      <Header />
      <div className="flex flex-col justify-center items-center mt-10">
        {allScheduleList.map((obj, index) => (
          <div
            key={index}
            className="w-3/4 h-20 bg-white my-3 rounded-lg border-solid border-4 border-gray-400 grid grid-cols-6 text-center place-items-center"
          >
            <button className="h-8 w-8 sm:w-16 md:w-16 lg:w-20 xl:w-20 text-xs sm:text-sm md:text-sm xl:text-md lg:text-md bg-white rounded-md hover:bg-red-500 hover:text-white hover:font-bold border-2 border-solid duration-200 border-gray-500">
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
            <p>
              記入メンバー数 <br />1 / {obj.members.length}
            </p>
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
              空いている日程の確認
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTimeManagementPage;
