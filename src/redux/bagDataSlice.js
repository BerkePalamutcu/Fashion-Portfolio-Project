import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bagData: [],
};

export const bagDataSlice = createSlice({
  name: "bagDataProducts",
  initialState,
  reducers: {
    sendDataToCardComponent: (state, action) => {
      state.bagData.push({ ...action.payload, quantity: 1 });
      // state.quantityData = { ...state.bagData, ...action.payload };
    },
    increaseItemQuantity: (state, { payload }) => {
      state.bagData.filter((item, i) =>
        item.id === payload ? (state.bagData[i].quantity += 1) : item
      );
    },
    decreaseItemQuantity: (state, { payload }) => {
      state.bagData.filter((item, i) =>
        item.id === payload && item.quantity > 1
          ? (state.bagData[i].quantity -= 1)
          : item
      );
    },
    removeItem: (state, { payload }) => {
      state.bagData = state.bagData.filter((item) => item.id !== payload);
    },
  },
});

export const {
  sendDataToCardComponent,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
} = bagDataSlice.actions;
export default bagDataSlice.reducer;
