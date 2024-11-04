import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: sessionStorage.getItem("isAuth") === "true",
  name: "",
};

const loginSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.isAuth = false;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setLogin, setLogout, setName } = loginSlice.actions;
export default loginSlice.reducer;
