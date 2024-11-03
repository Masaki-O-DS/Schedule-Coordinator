import React, { useEffect, useState } from "react";
import SelectionArea from "@viselect/react";
import { dayStrToDateObj } from "../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { setSelectDateTime } from "../features/selectTime";

const Selection = ({ date }) => {
  // 選択された要素のIDを保持する状態
  const [selected, setSelected] = useState(() => new Set());
  const { selectTimeList } = useSelector(
    (state) => state.selectTime[date] || { selectTimeList: [] }
  );
  /*　　selectTimeListの中身は次のとおり
{day1: {selectTimeList : [9, 10, 12],
day2: {selectTimeList : [13, 14, 15],}
  */

  const { month, day } = dayStrToDateObj(date);
  const dispatch = useDispatch();

  //日付を保存
  useEffect(() => {
    const selectTimeArray = Array.from(selected); //Setオブジェクトをdispatchでreducerに入れるとnon-serializedエラーが発生するため一度配列に変換
    const transformedTimeList = selectTimeArray.map((id) => id + 9); //IDを時刻に変換
    dispatch(setSelectDateTime({ date, timeList: transformedTimeList }));
    console.log(selectTimeList);
  }, [dispatch, date, selected]);

  //デバッグ用
  useEffect(() => {
    console.log("Updated selectTimeList:", selectTimeList);
  }, [selectTimeList]);

  //表示用時刻の配列生成
  const startTime = 9;
  const endTime = 24;
  const timeList = [];
  for (let i = startTime; i <= endTime; i++) {
    timeList.push(i);
  }

  // DOM要素からデータ属性 'data-key' を抽出し、数値の配列に変換するヘルパー関数
  const extractIds = (els) =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  // 選択が移動（追加・削除）されたときのハンドラー
  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <>
      <div className="flex flex-col w-full p-2 justify-center items-center">
        <p>
          {month + 1}/{day}
        </p>
        <SelectionArea
          className="bg-blue-300 h-full w-full"
          //   onStart={onStart}
          onMove={onMove}
          selectables=".selectable"
        >
          <div className="grid grid-cols-1 text-center">
            {timeList.map((time, index) => {
              return (
                <div
                  className={
                    selected.has(index)
                      ? "selectable w-full h-auto bg-gray-700 border border-gray-800"
                      : "selectable w-full h-auto bg-gray-100 border border-gray-300"
                  }
                  data-key={index}
                  key={index}
                >
                  {time}時
                </div>
              );
            })}
          </div>
        </SelectionArea>
      </div>
    </>
  );
};

export default Selection;
