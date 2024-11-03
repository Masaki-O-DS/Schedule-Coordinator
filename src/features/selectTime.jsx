import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const selectTimeSlice = createSlice({
  name: "selectTime",
  initialState,
  reducers: {
    //日付の分だけ日付とtimelistのオブジェクトを作成し、配列とする
    addDate: (state, action) => {
      action.payload.forEach((day) => {
        if (!state[day]) {
          state[day] = { selectTimeList: [] };
        }
      });
    },
    //日付と時間の配列を受け取ってそれを用いて同じ日付のオブジェクトのslectTimeListを追加する.または削除する
    setSelectDateTime: (state, action) => {
      const { date, timeList } = action.payload;
      if (state[date]) {
        state[date].selectTimeList = timeList;
      } else {
        state[date] = { selectTimeList: timeList };
      }
    },
  },
});

export const { addDate, setSelectDateTime } = selectTimeSlice.actions;
export default selectTimeSlice.reducer;
