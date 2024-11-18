import React, { useState } from "react";
import Header from "../Components/Header";
import { useSelector } from "react-redux";
import EventDetailModal from "../Components/EventDetailModal";
import NoData from "../Components/NoData";
import ScheduleList from "../Components/ScheduleList";

//管理者がスケジュール調整を確認できるページ

const AdminTimeManagementPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [eventDetail, setEventDetail] = useState();

  const { allScheduleList } = useSelector((state) => state.adminSchedule);

  return (
    <div className="w-screen h-screen bg-slate-300">
      {isModal && (
        <EventDetailModal eventDetail={eventDetail} setIsModal={setIsModal} />
      )}
      <Header />
      {allScheduleList.length === 0 && <NoData />}

      <ScheduleList setIsModal={setIsModal} setEventDetail={setEventDetail} />
    </div>
  );
};

export default AdminTimeManagementPage;
