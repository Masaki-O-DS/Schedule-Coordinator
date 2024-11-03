import React from "react";
import Title from "../Components/Title";
import Modal from "../Components/Modal";
import { useSelector } from "react-redux";
import PreSignInButtons from "../Components/PreSignInButtons";
import PostSignInButtons from "../Components/PostSignInButtons";
import Lottie from "lottie-react";
import animationData from "../TitleAnimation.json";

const TopPage = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const { isAuth } = useSelector((state) => state.login);

  return (
    <div className="h-screen w-screen ">
      {isOpen && <Modal />}

      <Title />
      <div className="w-screen h-3/4  flex justify-center items-center">
        <div className="w-2/4 flex justify-center items-center h-full">
          <Lottie
            animationData={animationData}
            style={{ height: "400px", width: "400px" }}
          />
        </div>
        {isAuth ? <PostSignInButtons /> : <PreSignInButtons />}
      </div>
    </div>
  );
};

export default TopPage;
