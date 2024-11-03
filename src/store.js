import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login";
import modalReducer from "./features/modal";
import scheduleControlReducer from "./features/scheduleControl";
import selectTimeReducer from "./features/selectTime";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
    scheduleControl: scheduleControlReducer,
    selectTime: selectTimeReducer,
  },
});
