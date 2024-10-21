import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state) => {
      state.isAuth = true;
    },
    setCloseModal: (state) => {
      state.isAuth = false;
    },
  },
});

export const { setOpenModal, setCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
