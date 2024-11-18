import React from "react";
import Header from "../Components/Header";
import Lottie from "lottie-react";
import animationData from "../ThankyouAnimation.json";
import useNavigation from "../hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminState, setUrl } from "../features/adminSchedule";

//管理者がメンバーにシェアする用のURLが表示されるページ
const ShareLinkPage = () => {
  const dispatch = useDispatch();
  const { eventId } = useSelector((state) => state.adminSchedule);
  const adminID = sessionStorage.getItem("adminID");
  // const { openTopPage } = useNavigation();
  console.log(`${window.location.origin}/shared/${adminID}/${eventId}`);
  const url = `${window.location.origin}/shared/${adminID}/${eventId}`;

  //TOPページへ
  // const onClickToNextPage = () => {
  //   dispatch(clearAdminState());
  //   openTopPage();
  // };

  //ボタンを押したらクリップボードにコピー
  const handleShare = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URLがクリップボードにコピーされました！");
        dispatch(setUrl(url));
      })
      .catch((err) => {
        console.error("URLのコピーに失敗しました:", err);
      });
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-200">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white border-solid border-4 border-amber-500 w-3/4 h-3/4 rounded-xl flex flex-col items-center  ">
          <div className="h-44 w-full flex justify-center">
            <Lottie
              animationData={animationData}
              style={{ height: "400px", width: "400px" }}
              className="relative -top-24 "
              loop={false}
              speed={1.5}
            />
          </div>
          <p className="text-xl  h-16 p-5">調整用フォームを作成しました</p>
          <p className="text-xl  h-16">
            以下のリンクを参加メンバーと共有し、日程を記入していただいてください
          </p>
          <div className="flex justify-center w-full h-20">
            <p className="border-solid rounded border border-gray-400 p-1.5 h-10 w-2/4 text-center overflow-x-scroll">
              {url}
            </p>
            <button
              onClick={handleShare}
              className="bg-slate-200 rounded px-2 py-0.5 ml-4 h-10 hover:bg-amber-600 hover:text-white hover:font-bold duration-100 active:scale-90"
            >
              コピー
            </button>
          </div>
          {/* <button
            onClick={onClickToNextPage}
            className="bg-slate-200 rounded px-4 py-0.5 h-10 hover:bg-amber-600 hover:text-white hover:font-bold duration-100 active:scale-90"
          >
            TOPへ
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ShareLinkPage;
