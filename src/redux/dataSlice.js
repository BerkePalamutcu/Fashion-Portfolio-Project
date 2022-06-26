import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemData: {},
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    getDataFromFirestore: (state, action) => {
      state.itemData = { ...action.payload };
    },
  },
});

export const { getDataFromFirestore } = dataSlice.actions;
export default dataSlice.reducer;
