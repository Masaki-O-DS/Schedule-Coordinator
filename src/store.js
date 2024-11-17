import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login";
import modalReducer from "./features/modal";
import adminScheduleReducer from "./features/adminSchedule";
import eventReducer from "./features/eventDetails.jsx";
import visitorScheduleReducer from "./features/visitorSchedule.jsx";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
    adminSchedule: adminScheduleReducer,
    event: eventReducer,
    visitorSchedule: visitorScheduleReducer,
  },
});
