import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Header from "../Components/Header";

const SharedPage = () => {
  const { id } = useParams();

  //idにアクセスがあった時に、fireStoreからデータを取得する。
  //   useEffect(() => {
  //     const getDB = async (id) => {
  //       const docRef = doc(db, "schedules", id); //schedulesがコレクション名　idがドキュメント名
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         console.log("DBからデータを取得", docSnap.data());
  //       } else {
  //         console.log("取得できません");
  //       }
  //     };
  //     getDB(id);
  //   }, [id]);

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col  items-center">
      <Header />
      <div className="w-3/4 h-3/4 mt-16 bg-white rounded-xl border-4 border-solid border-amber-500 grid-rows-12 grid items-center ">
        <p className=" bg-red-200 w-full text-center text-2xl row-start-4">
          小川様から日程調整の申し込みがありました。
        </p>
        <div className="flex w-full row-span-3 row-start-5">
          <div className="w-2/5 flex flex-col justify-center items-end mr-5">
            <p className="text-xl mb-5">イベント名: </p>
            <p className="text-xl">イベント内容: </p>
          </div>
          <div className="w-3/5  flex flex-col justify-center items-start">
            <p className="text-xl mb-5">お誕生日会</p>
            <p className="text-xl">田中のお誕生日会</p>
          </div>
        </div>
        <p className="text-2xl text-center bg-amber-200 row-start-8">
          日程調整をされる方のお名前を選択してください。
        </p>
        <div className="flex justify-center items-center row-span-2 row-start-9">
          <div className=" grid grid-cols-5 grid-rows-2 w-2/4">
            {/* DBで読み取った名前をmapで展開 */}
            <button className="w-20 h-8 border-solid border border-gray-500 rounded-xl">
              田中
            </button>
            <button className="w-20 h-8 border-solid border border-gray-500 rounded-xl">
              望月
            </button>
            <button className="w-20 h-8 border-solid border border-gray-500 rounded-xl">
              吉田
            </button>
            <button className="w-20 h-8 border-solid border border-gray-500 rounded-xl">
              神部
            </button>
          </div>
        </div>
        <div className="row-start-11 flex justify-center">
          <button className="w-40 h-10 border-solid border border-gray-500 rounded-xl ">
            日程調整に進む
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedPage;
