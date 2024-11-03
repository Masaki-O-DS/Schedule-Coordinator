import { createSlice } from "@reduxjs/toolkit";

const initialState = { dayList: [] };

const scheduleControlSlice = createSlice({
  name: "scheduleControl",
  initialState,
  reducers: {
    setDayList: (state, action) => {
      state.dayList = action.payload;
    },
  },
});

export const { setDayList } = scheduleControlSlice.actions;
export default scheduleControlSlice.reducer;
