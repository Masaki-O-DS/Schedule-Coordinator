import React from "react";
import useNavigation from "../hooks/useNavigation";
import { useDispatch } from "react-redux";
import { clearAdminState } from "../features/adminSchedule";
import { clearVisitorState } from "../features/visitorSchedule";

const Header = () => {
  const { openTopPage } = useNavigation();
  const dispatch = useDispatch();
  const handleToTop = () => {
    dispatch(clearAdminState());
    dispatch(clearVisitorState());
    sessionStorage.removeItem("adminEvent");
    sessionStorage.removeItem("visitorInfo");
    openTopPage();
  };
  return (
    <div className="bg-midnight-blue h-14 w-screen flex items-end justify-between">
      <button
        onClick={handleToTop}
        className="w-20 h-7 text-bold font-bold rounded border-solid border-2 border-gray-300 hover:border-amber-800 bg-white hover:text-white hover:bg-amber-500  mb-3 ml-10"
      >
        TOPへ
      </button>
      <p className="font-anton text-white mr-10 text-3xl">
        SCHEDULE COORDINATOR
      </p>
    </div>
  );
};

export default Header;
