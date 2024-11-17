import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Header from "../Components/Header";
import Lottie from "lottie-react";
import animationData from "../WelcomAnimation.json";
import useNavigation from "../hooks/useNavigation";
import { useDispatch } from "react-redux";
import { setDayList, setEventId, setName } from "../features/visitorSchedule";

//管理者から共有されたトップページ
const VisitorTopPage = () => {
  const dispatch = useDispatch();
  const { adminId, eventId } = useParams(); //idを取得
  const [scheduleData, setScheduleData] = useState({
    coordinatorName: "",
    coordinatorSchedule: [],
    eventContent: "",
    eventName: "",
    members: [],
  });
  const [selectMember, setSetSelectMember] = useState(null);
  dispatch(setEventId(eventId));

  const coordinatorName = scheduleData.coordinatorName;
  const coordinatorSchedule = scheduleData.coordinatorSchedule;
  const eventContent = scheduleData.eventContent;
  const eventName = scheduleData.eventName;
  const members = scheduleData.members;

  const { openEditSchedulePageVisitor } = useNavigation();

  // idにアクセスがあった時に、fireStoreからデータを取得する。
  useEffect(() => {
    const getDB = async (id) => {
      const docRef = doc(db, "admin", id); //adminコレクションからデータを取得する
      const docSnap = await getDoc(docRef);
      try {
        const allEventData = docSnap.data().events;
        //eventIDが同じものだけを取得
        const filteredData = allEventData.filter(
          (data) => data.eventId === eventId
        );
        console.log("DBからデータを取得", filteredData);
        //配列の中にオブジェクトが入ったままなのでそれを回避するためにインデックスで指定
        setScheduleData(filteredData[0]);
      } catch (error) {
        console.log("取得できません", error);
      }
    };
    getDB(adminId);
  }, [adminId, eventId]);

  //管理者のスケジュールからDayListを取得する
  const getDayList = (coordinatorSchedule) => {
    return Object.keys(coordinatorSchedule);
  };

  const dayList = getDayList(coordinatorSchedule);
  dispatch(setDayList(dayList));

  //クリックしたメンバーを設定
  const handleClickMember = (member) => {
    setSetSelectMember(member);
  };

  //クリックしたら訪問者用の日程入力フォームに移動
  const handleVisitorEditSchedule = () => {
    dispatch(setName(selectMember));
    openEditSchedulePageVisitor();
  };

  //   console.log("scheduleData", scheduleData);

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col items-center">
      <Header />
      <div className="w-3/4 h-3/4 mt-16 bg-white rounded-xl border-4 border-solid border-amber-500 flex flex-col items-center justify-center">
        <Lottie
          animationData={animationData}
          className="w-64 h-16 md:w-80  lg:w-96 "
          loop={false}
          speed={1.5}
        />
        <p className="w-full text-center text-md sm:text-lg md:text-xl xl:text-2xl mt-4">
          {coordinatorName}様から日程調整の申し込みがありました。
        </p>
        <div className="flex w-full row-span-3 row-start-5 mt-4">
          <div className="w-2/5 flex flex-col items-end justify-center mr-5">
            <p className="text-xs sm:text-md md:text-lg lg:text-xl xl:text-xl">
              イベント名:
            </p>
            <div className="h-20 flex items-center mt-2">
              <p className="text-xs sm:text-md md:text-lg lg:text-xl xl:text-xl">
                イベント内容:
              </p>
            </div>
          </div>
          <div className="w-3/5 flex flex-col items-start">
            <p className="text-xs sm:text-md md:text-lg lg:text-xl xl:text-xl">
              {eventName}
            </p>

            <p className="text-xs sm:text-md md:text-lg lg:text-xl xl:text-xl h-20 border-solid border border-gray-200 w-3/4 overflow-y-scroll mt-2">
              {eventContent}
            </p>
          </div>
        </div>
        <p className="text-md text-center row-start-8 sm:text-lg md:text-xl xl:text-2xl mt-4">
          日程調整をされる方のお名前を選択してください。
        </p>
        <div className="flex justify-center items-center row-span-2 row-start-9 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {/* DBで読み取った名前をmapで展開 */}
            {members.length > 0 &&
              members.map((member, index) => {
                return (
                  <button
                    key={index}
                    value={index}
                    className={`h-8 text-xs sm:text-xs md:text-sm active:scale-90 lg:text-md w-10 sm:w-10 duration-200 md:w-12 lg:w-16 border-solid border border-gray-500 rounded-xl hover:bg-amber-500 hover:border-amber-700 hover:text-white
                ${selectMember === member && "bg-amber-500 text-white"}`}
                    onClick={() => handleClickMember(member)}
                  >
                    {member}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="row-start-11 flex justify-center mt-4">
          <button
            onClick={handleVisitorEditSchedule}
            className="w-40 h-10 border-solid border border-gray-500 rounded-xl active:scale-90 hover:bg-midnight-blue hover:border-blue-950 hover:text-white hover:font-bold duration-200"
          >
            日程調整に進む
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorTopPage;
