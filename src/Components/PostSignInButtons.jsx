import React, { useEffect } from "react";
import Button from "./Button";
import useNavigation from "../hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../features/login";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { nanoid } from "nanoid";
import { setEventId } from "../features/adminSchedule";

const PostSignInButtons = () => {
  const addCss = "w-64";
  const { openEditSchedulePage } = useNavigation();
  const { openTimeManagementPage } = useNavigation();
  const { name } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  //ログアウトボタンを押した時の処理
  const handleLogOut = () => {
    signOut(auth).then(() => {
      //ログアウト成功
      dispatch(setLogout());
      sessionStorage.setItem("isAuth", false);
    });
  };

  const onClickToEditSchedulePage = () => {
    const ID = nanoid();
    dispatch(setEventId(ID));
    console.log("nanoID", ID);
    openEditSchedulePage();
  };

  const onClickToTimeManagementPage = () => {
    openTimeManagementPage();
    //ここでDBからデータを取り出す。
  };

  return (
    <div className="  bg-white flex w-2/4 flex-col items-center justify-around h-3/4 ">
      <p className="text-black font-bold text-2xl">ようこそ{name}様</p>
      <Button
        text={"新たに日程調整を始まる"}
        addCss={addCss}
        onClickFunc={onClickToEditSchedulePage}
      />
      <Button
        text={"日程調整の確認"}
        addCss={addCss}
        onClickFunc={onClickToTimeManagementPage}
      />
      <Button text={"ログアウト"} addCss={addCss} onClickFunc={handleLogOut} />
    </div>
  );
};

export default PostSignInButtons;
