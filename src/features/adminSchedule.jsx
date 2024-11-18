import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayList: [],
  selectTime: {},
  eventId: "",
  url: "",
  allScheduleList: [],
  selectIndex: null,
};
//管理者のスケジュール
const adminScheduleSlice = createSlice({
  name: "adminSchedule",
  initialState,
  reducers: {
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
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
    clearAdminState: (state) => {
      state.dayList = [];
      state.selectTime = {};
      state.eventId = "";
      state.url = "";
      state.allScheduleList = [];
      state.selectIndex = null;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setAllScheduleList: (state, action) => {
      state.allScheduleList = action.payload;
    },
    setSelectIndex: (state, action) => {
      state.selectIndex = action.payload;
    },
  },
});

export const {
  setDayList,
  addDate,
  setSelectDateTime,
  setEventId,
  clearAdminState,
  setUrl,
  setAllScheduleList,
  setSelectIndex,
} = adminScheduleSlice.actions;
export default adminScheduleSlice.reducer;
