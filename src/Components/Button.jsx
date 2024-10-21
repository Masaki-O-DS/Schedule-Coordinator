import React from "react";

const Button = ({ addCss, text, onClickFunc }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClickFunc}
        className={`bg-gray-100 border-2 border-sky-500 hover:border-amber-700 rounded-md p-2 transition-all duration-200 hover:scale-110 font-bold hover:bg-amber-400 active:scale-100 hover:text-white ${addCss}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
