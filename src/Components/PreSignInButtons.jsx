import React from "react";
import Button from "./Button";

const PostSignInButtons = () => {
  const addCss = "w-64";

  return (
    <div className=" py-10 flex flex-col items-center justify-around h-2/4">
      <p className="text-red-500 font-bold text-2xl">ようこそGuest様</p>
      <Button text={"新たに日程調整を始まる"} addCss={addCss} />
      <Button text={"日程調整の確認"} addCss={addCss} />
      <Button text={"Log Out"} addCss={addCss} />
    </div>
  );
};

export default PostSignInButtons;
