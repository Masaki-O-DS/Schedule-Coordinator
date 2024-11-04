import React from "react";
import Button from "./Button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setLogin, setName } from "../features/login";

const PostSignInButtons = () => {
  const addCss = "w-64";
  const dispatch = useDispatch();

  //サインインボタンを押した時の処理
  const logInWithGoogle = () => {
    //googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      sessionStorage.setItem("isAuth", true);
      dispatch(setName(result.user.displayName));
      dispatch(setLogin());
    });
  };

  return (
    <div className=" py-10 flex w-2/4 flex-col items-center justify-around h-2/4">
      <p className="text-red-500 font-bold text-2xl">
        Googleでログインしてください
      </p>

      <Button text={"ログイン"} addCss={addCss} onClickFunc={logInWithGoogle} />
    </div>
  );
};

export default PostSignInButtons;
