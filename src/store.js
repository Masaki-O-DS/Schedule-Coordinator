import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login";
import modalReducer from "./features/modal";
import scheduleReducer from "./features/schedule";
import eventReducer from "./features/eventDetails.jsx";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
    schedule: scheduleReducer,
    event: eventReducer,
  },
});
