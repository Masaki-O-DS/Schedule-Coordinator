import React, { useState } from "react";
import Calendar from "../Components/Calender";
import InputText from "../Components/InputText";
import Button from "../Components/Button";
import useNavigation from "../hooks/useNavigation";

export const EditSchedulePage = () => {
  const [eventName, setEventName] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState([]);

  const { openSelectDatePage } = useNavigation();

  const handleInputEventName = (e) => {
    setEventName(e.target.value);
  };

  const handleInputEventContent = (e) => {
    setEventContent(e.target.value);
  };

  const handleInputMember = (e) => {
    setMemberName(e.target.value);
  };

  const onAddMember = () => {
    setMemberName("");
    setMembers([...members, memberName]);
  };

  return (
    <>
      {/* ページの上半分 */}
      <div className="w-full h-3/5 flex flex-row">
        {/* 上半分の左部分 */}
        <div className="w-2/4 flex-col flex items-center ">
          <p>日付を選択してください</p>
          <Calendar />
        </div>

        {/* 上半分の右部分 */}
        <div className="w-2/4 flex flex-col items-center">
          <div className="flex flex-row mb-5 h-24 items-center">
            <div className="flex flex-col ">
              <InputText
                text={"イベント名を入力"}
                onChangeFunc={handleInputEventName}
              />
            </div>
            <Button text={"Add"} addCss={"ml-5 mt-7"} />
          </div>
          <div className="flex flex-row mb-5">
            <div className="flex flex-col">
              <InputText
                text={"イベント内容を入力"}
                onChangeFunc={handleInputEventContent}
              />
            </div>
            <Button text={"Add"} addCss={"ml-5 mt-7"} />
          </div>
          <div className="flex flex-row mb-5">
            <div className="flex flex-col ">
              <InputText
                text={"参加メンバーを入力"}
                onChangeFunc={handleInputMember}
              />
            </div>
            <Button
              text={"Add"}
              addCss={"ml-5 mt-7"}
              onClickFunc={onAddMember}
            />
          </div>
          <div className="w-9/12 bg-red-300 flex flex-row flex-wrap">
            {members.length > 0 &&
              members.map((member) => {
                return (
                  <div key={member} className="w-12 h-8 bg-slate-400 m-3">
                    {member}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* ページの下半分 */}
      <div className="bg-red-300 w-full h-2/5 flex justify-center items-center">
        <div className="w-9/12 h-4/5 bg-slate-300 flex ">
          <div className="w-3/12 bg-yellow-200 flex flex-col justify-around">
            <p>スケジュール調整開始日</p>
            <p>イベント名</p>
            <p>イベント内容</p>
            <p>参加メンバー</p>
          </div>
          <div className="w-9/12 bg-blue-200  flex flex-col justify-around">
            <p>仮</p>
            <p>{eventName}</p>
            <p>{eventContent}</p>
            <div className="flex flex-row">
              {members.length > 0 &&
                members.map((member) => {
                  return (
                    <p key={member} className="mx-2">
                      {member}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
        <Button text={"次へ"} onClickFunc={openSelectDatePage} />
      </div>
    </>
  );
};
