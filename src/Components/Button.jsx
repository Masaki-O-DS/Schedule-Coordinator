import React from "react";

const Button = ({ addCss, text, onClickFunc, isDisabled }) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        onClick={onClickFunc}
        className={`relative py-2 px-8 text-black border-solid border-gray-500 border border-opacity-30 text-base  nded-full overflow-hidden bg-white rounded-full  ${
          isDisabled
            ? "bg-gray-300 bg-opacity-55 text-opacity-50 hover:none"
            : "before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90  hover:before:left-0"
        }  ${addCss}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
