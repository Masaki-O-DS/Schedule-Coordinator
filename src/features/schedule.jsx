// features/scheduleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayList: [],
  selectTime: {},
  id: "",
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setDayList: (state, action) => {
      state.dayList = action.payload;
    },
    addDate: (state, action) => {
      action.payload.forEach((day) => {
        if (!state.selectTime[day]) {
          state.selectTime[day] = { selectTimeList: [] };
        }
      });
    },
    setSelectDateTime: (state, action) => {
      const { date, timeList } = action.payload;
      if (state.selectTime[date]) {
        state.selectTime[date].selectTimeList = timeList;
      } else {
        state.selectTime[date] = { selectTimeList: timeList };
      }
    },
    setID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setDayList, addDate, setSelectDateTime, setID } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
