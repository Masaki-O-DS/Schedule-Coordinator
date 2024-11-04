import React from "react";
import Button from "./Button";
import useNavigation from "../hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../features/login";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { nanoid } from "nanoid";
import { setID } from "../features/schedule";

const PostSignInButtons = () => {
  const addCss = "w-64";
  const { openEditSchedulePage } = useNavigation();
  const { name } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  //ログアウトボタンを押した時の処理
  const handleLogOut = () => {
    signOut(auth).then(() => {
      //signout successfull
      dispatch(setLogout());
      sessionStorage.setItem("isAuth", false);
    });
  };

  const onClickToEditSchedulePage = () => {
    openEditSchedulePage();
    const ID = nanoid();
    dispatch(setID(ID));
  };

  return (
    <div className="  bg-white flex w-2/4 flex-col items-center justify-around h-3/4 ">
      <p className="text-black font-bold text-2xl">ようこそ{name}様</p>
      <Button
        text={"新たに日程調整を始まる"}
        addCss={addCss}
        onClickFunc={onClickToEditSchedulePage}
      />
      <Button text={"日程調整の確認"} addCss={addCss} />
      <Button text={"ログアウト"} addCss={addCss} onClickFunc={handleLogOut} />
    </div>
  );
};

export default PostSignInButtons;
