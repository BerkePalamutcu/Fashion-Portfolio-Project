import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bagData: {},
};

export const bagDataSlice = createSlice({
  name: 'bagDataProducts',
  initialState,
  reducers: {
    sendDataToCardComponent: (state, action) => {
      state.bagData = { ...action.payload };
    },
  },
});

export const { sendDataToCardComponent } = bagDataSlice.actions;
export default bagDataSlice.reducer;
