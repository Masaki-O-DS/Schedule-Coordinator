import React from "react";

const InputText = ({ text, onChangeFunc }) => {
  return (
    <input
      className="h-10 w-48"
      type="text"
      placeholder={`${text}`}
      onChange={(e) => onChangeFunc(e)}
    ></input>
  );
};

export default InputText;
