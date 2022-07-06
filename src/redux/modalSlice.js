import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardModal: false,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    changeCardModalToTrue: (state, action) => {
      state.cardModal = action.payload;
    },
    changeCardModalToFalse: (state, action) => {
      state.cardModal = action.payload;
    },
  },
});

export const { changeCardModalToTrue, changeCardModalToFalse } =
  modalSlice.actions;
export default modalSlice.reducer;
