import React from "react";
import Title from "../Components/Title";
import Modal from "../Components/Modal";
import { useSelector } from "react-redux";
import PreSignInButtons from "../Components/PreSignInButtons";
import PostSignInButtons from "../Components/PostSignInButtons";
import bgImage from "../ocean-bg-image.webp";

const TopPage = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const { isAuth } = useSelector((state) => state.login);

  return (
    <div className="h-screen w-screen ">
      {isOpen && <Modal />}

      <Title />
      {isAuth ? <PostSignInButtons /> : <PreSignInButtons />}
    </div>
  );
};

export default TopPage;
