import React from "react";
import Header from "../Components/Header";

//訪問者に日程を記入してもらった後の感謝のページ
const ThankyouPage = () => {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-full w-full bg-gray-400 flex justify-center items-center">
        <div className="w-2/4 h-2/4 bg-white rounded-xl border-solid border-4 border-gray-500 flex justify-center items-center  ">
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
            ご記入ありがとうございました。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankyouPage;
