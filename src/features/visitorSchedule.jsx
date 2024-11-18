import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayList: [],
  selectTime: {},
  name: "",
  eventId: "",
};

//管理者のスケジュール
const visitorScheduleSlice = createSlice({
  name: "adminSchedule",
  initialState,
  reducers: {
    //Daylistをセットする
    setDayList: (state, action) => {
      state.dayList = action.payload;
    },
    //dayListを基に日を追加する
    addDate: (state, action) => {
      action.payload.forEach((day) => {
        if (!state.selectTime[day]) {
          state.selectTime[day] = { selectTimeList: [] };
        }
      });
    },
    //選択された時間を更新する
    setSelectDateTime: (state, action) => {
      const { date, timeList } = action.payload;
      if (state.selectTime[date]) {
        state.selectTime[date].selectTimeList = timeList;
      } else {
        state.selectTime[date] = { selectTimeList: timeList };
      }
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
    clearVisitorState: (state, action) => {
      state.dayList = [];
      state.selectTime = {};
      state.name = "";
      state.eventId = "";
    },
  },
});

export const {
  setDayList,
  addDate,
  setSelectDateTime,
  setName,
  setEventId,
  clearVisitorState,
} = visitorScheduleSlice.actions;
export default visitorScheduleSlice.reducer;
