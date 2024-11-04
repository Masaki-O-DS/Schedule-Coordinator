import React, { useState } from "react";
import Calendar from "../Components/Calender";
import InputText from "../Components/InputText";
import useNavigation from "../hooks/useNavigation";
import Header from "../Components/Header";
import SummaryTable from "../Components/SummaryTable";
import { useDispatch, useSelector } from "react-redux";
import { addDate } from "../features/schedule";
import {
  setEventContentToRedux,
  setEventNameToRedux,
  setMembersToRedux,
} from "../features/eventDetails";

export const EditSchedulePage = () => {
  const [eventName, setEventName] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState([]);
  const { openSelectDatePage } = useNavigation();
  const dispatch = useDispatch();
  const { dayList } = useSelector((state) => state.schedule);

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
    if (memberName !== "") {
      setMembers([...members, memberName]);
      setMemberName("");
    }
  };

  const handleDeleteMemberList = (deleteMember) => {
    const newMembers = members.filter((member) => member !== deleteMember);
    setMembers(newMembers);
  };

  const onClickToNextPage = () => {
    dispatch(setEventNameToRedux(eventName));
    dispatch(setEventContentToRedux(eventContent));
    dispatch(setMembersToRedux(members));
    dispatch(addDate(dayList));
    openSelectDatePage();
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
            <div className="h-full w-1/12"></div>
            <div className="w-full">
              <div className="w-9/12 flex flex-col items-start justify-center ml-10">
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
                  <button
                    className={` w-16 bg-sky-200 border-2 border-solid border-blue-300 h-10 px-1 py-0.5 mt-4 ml-8 rounded ${
                      members.length < 10
                        ? "hover:bg-midnight-blue hover:text-white hover:font-bold duration-100"
                        : "bg-gray-500 text-gray-400 border-none"
                    }`}
                    onClick={onAddMember}
                    disabled={members.length >= 10}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* 追加されたネームカード */}
              <div className="w-full grid grid-cols-5 pr-10 mt-4">
                {members.length > 0 &&
                  members.map((member) => (
                    <button
                      key={member}
                      className="w-14 h-8 mt-2 rounded bg-slate-300 m-1 flex border border-gray-400 flex-col items-center justify-center hover:border-red-800 hover:bg-red-500 hover:text-white hover:font-bold"
                      onClick={() => handleDeleteMemberList(member)}
                    >
                      <p className="text-xs ">{member}</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* ページの下半分 */}
        <div className="w-full h-2/4 mt-4 grid grid-cols-12 grid-rows-1 items-center bg-midnight-blue">
          <div className="col-span-11 flex justify-center h-5/6">
            <SummaryTable
              eventName={eventName}
              eventContent={eventContent}
              members={members}
              dayList={dayList}
            />
          </div>
          <div className="h-10 col-span-1">
            <button
              className="w-18 h-10 bg-white rounded px-3 hover:bg-amber-500 hover:text-white font-bold duration-200 active:scale-90"
              onClick={onClickToNextPage}
            >
              次へ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
