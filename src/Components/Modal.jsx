import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setCloseModal } from "../features/modal";

const Modal = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setCloseModal());
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
      <div className="w-3/4 h-3/4 bg-white rounded-xl border-solid border-4 border-amber-400 p-5 flex flex-col justify-between">
        <div className="flex flex-row justify-end">
          <Button
            text={"×"}
            addCss={"w-10 h-10 border-solid border-2 p-1 hover:bg-red-500"}
            onClickFunc={handleCloseModal}
          />
        </div>

        <h1 className="text-4xl">
          <span className="font-bold">Schedule Coordinator</span> とは？
        </h1>

        <hr className="" />
        <h2 className=" text-2xl">
          コンセプト：
          <br />
          <span className="font-bold">
            チーム全員が必ず参加できるスケジュールを調整する
          </span>
        </h2>
        <p>
          従来の日程調整サイトでは柔軟な日時選択が難しく、全員の都合が合う日程を見つけるのに手間がかかることがありました。しかし、Schedule
          Coordinatorでは、1週間先までのメンバーの予定を入力することで、全員の空いている日時を日程調整担当者が一目で把握できます。
        </p>
        <p className="mb-10">
          さらに、選択可能な日時を細かく設定できるため、必ず全員が参加できる会議の日程を簡単に決定することが可能です。これにより、チーム全員が参加必須の会議やプロジェクトの打ち合わせなどを効率的に調整し、時間を有効活用することができます。
        </p>
      </div>
    </div>
  );
};

export default Modal;
