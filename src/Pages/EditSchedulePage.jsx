import React, { useState } from "react";
import Calendar from "../Components/Calender";
import InputText from "../Components/InputText";
import Button from "../Components/Button";
import useNavigation from "../hooks/useNavigation";
import Header from "../Components/Header";

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
    setMembers([...members, memberName]);
    setMemberName("");
  };

  const handleDeleteMemberList = (deleteMember) => {
    const newMembers = members.filter((member) => member !== deleteMember);
    setMembers(newMembers);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-full">
        {/* ページの上半分 */}
        <div className="w-screen h-2/4 flex flex-row">
          {/* 上半分の左部分 */}
          <div className="w-2/4 flex-col flex items-center">
            <p className="mt-10">日付を選択してください</p>
            <Calendar />
          </div>

          {/* 上半分の右部分 */}
          <div className="flex flex-row w-2/4">
            <div className="h-full w-3/12"></div>
            <div className="w-9/12 flex flex-col ">
              {/* イベント名記入欄 */}
              <div className="flex flex-row h-20 items-center">
                <InputText
                  text={"イベント名"}
                  onChangeFunc={handleInputEventName}
                />
              </div>
              {/* イベント内容記入欄 */}
              <div className="flex flex-row">
                <div className="flex flex-row h-20 items-center">
                  <InputText
                    text={"イベント内容"}
                    onChangeFunc={handleInputEventContent}
                  />
                </div>
              </div>
              {/* 参加メンバー記入欄 */}
              <div className="flex flex-row h-20 items-center ">
                <InputText
                  value={memberName}
                  text="参加メンバー"
                  onChangeFunc={handleInputMember}
                />
                <Button
                  text={"Add"}
                  onClickFunc={onAddMember}
                  addCss={"ml-5 mt-3"}
                  isDisabled={members.length < 10 ? false : true}
                />
              </div>
              {/* 追加されたネームカード */}
              <div className="w-full grid grid-cols-5 pr-10 mt-4">
                {members.length > 0 &&
                  members.map((member) => {
                    return (
                      <button
                        key={member}
                        className="w-14 h-8 mt-2 rounded bg-slate-300 m-1 flex border border-gray-400 flex-col items-center justify-center hover:border-red-800 hover:bg-red-500 hover:text-white hover:font-bold"
                        onClick={() => handleDeleteMemberList(member)}
                      >
                        <p className="text-xs ">{member}</p>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* ページの下半分 */}
        <div className="bg-white w-11/12 h-2/4 flex justify-centers mt-3">
          <div className="w-11/12 h-4/6 bg-slate-300 flex border-2 border-solid border-gray-500 border-opacity-55">
            <div className="w-3/12 bg-yellow-50 grid  justify-center items-center grid-rows-4 h-full">
              <p>スケジュール調整開始日</p>
              <p>イベント名</p>
              <p>イベント内容</p>
              <p>参加メンバー</p>
            </div>
            <div className="w-9/12 bg-blue-50   grid px-5 justify-start items-center grid-rows-4">
              <p>仮</p>
              <p>{eventName}</p>
              <p>{eventContent}</p>
              <div className="">
                {members.length > 0 &&
                  members.map((member) => {
                    return (
                      <p key={member} className="mx-1">
                        {member}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-1/12">
            <Button text={"次へ"} onClickFunc={openSelectDatePage} />
          </div>
        </div>
      </div>
    </>
  );
};
