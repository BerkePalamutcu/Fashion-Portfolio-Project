import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bagData: [],
};

export const bagDataSlice = createSlice({
  name: "bagDataProducts",
  initialState,
  reducers: {
    sendDataToCardComponent: (state, action) => {
      let { id, size } = action.payload;

      const findItemById = state.bagData.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (findItemById > -1) {
        state.bagData[findItemById].quantity++;
      } else {
        state.bagData.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseItemQuantity: (state, { payload }) => {
      const found = state.bagData.findIndex(({ id }) => id === payload);
      if (found !== -1) {
        state.bagData[found].quantity++;
      }
    },
    decreaseItemQuantity: (state, { payload }) => {
      const found = state.bagData.findIndex(({ id }) => id === payload);
      if (found !== -1 && state.bagData[found].quantity > 1) {
        state.bagData[found].quantity--;
      }
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
