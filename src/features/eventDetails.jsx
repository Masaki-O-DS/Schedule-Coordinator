import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventName: "",
  eventContent: "",
  members: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventNameToRedux: (state, action) => {
      state.eventName = action.payload;
    },
    setEventContentToRedux: (state, action) => {
      state.eventContent = action.payload;
    },
    setMembersToRedux: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const {
  setEventNameToRedux,
  setEventContentToRedux,
  setMembersToRedux,
} = eventSlice.actions;
export default eventSlice.reducer;
