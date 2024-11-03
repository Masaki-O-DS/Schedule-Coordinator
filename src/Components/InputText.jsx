import React from "react";

const InputText = ({ value, text, onChangeFunc }) => {
  return (
    <div className="input flex flex-col w-fit  static">
      <label
        htmlFor="input"
        className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
      >
        {text};
      </label>
      <input
        id={text}
        type="text"
        value={value}
        placeholder="Write here..."
        name="input"
        onChange={(e) => onChangeFunc(e)}
        className="border-blue-500  input px-[10px] py-[11px] text-xs bg-white border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
      />
    </div>
  );
};

export default InputText;
