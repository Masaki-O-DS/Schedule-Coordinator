import React from "react";

const EventDetailModal = ({ eventDetail, setIsModal }) => {
  const handleCloseModal = () => {
    setIsModal(false);
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
      <div className="w-fit h-fit bg-white rounded-xl border-solid border-4 border-amber-400 p-5 flex flex-col justify-center ">
        <div className="flex flex-row justify-end">
          <button
            className="h-8 w-8 bg-white rounded-md hover:bg-red-500 hover:text-white hover:font-bold border-2 border-solid duration-200 border-gray-500"
            onClick={handleCloseModal}
          >
            ×
          </button>
        </div>

        <h1 className="text-4xl">
          <span className="font-bold">イベントの詳細</span>{" "}
        </h1>

        <hr className="my-4" />
        <h2 className=" text-xl my-2">
          作成日：{eventDetail.createdDate.split("T")[0]}
        </h2>
        <h2 className=" text-xl my-2">イベント名：{eventDetail.eventName}</h2>
        <h2 className=" text-xl my-2">
          イベント招待メンバー :
          {eventDetail.members.map((member, index) => (
            <span key={index} className="mx-2">
              {member}
            </span>
          ))}
        </h2>
        <h2 className=" text-xl my-2 ">
          イベント内容：
          <p className="w-96 max-h-64 h-20 p-1 border-solid border border-gray-500 rounded-md text-xl my-2 overflow-y-scroll">
            {eventDetail.eventContent}
          </p>
        </h2>
      </div>
    </div>
  );
};

export default EventDetailModal;
