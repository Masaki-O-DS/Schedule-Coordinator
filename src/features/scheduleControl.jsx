import { createSlice } from "@reduxjs/toolkit";

const initialState = { dayList: [] };

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setDayList: (state, action) => {
      state.dayList = action.payload;
    },
  },
});

export const { setDayList } = scheduleControlSlice.actions;
export default scheduleControlSlice.reducer;
