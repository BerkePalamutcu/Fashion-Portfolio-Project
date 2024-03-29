import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bagData: [],
  totalItemQuantityData: 0,
};

export const bagDataSlice = createSlice({
  name: 'bagDataProducts',
  initialState,
  reducers: {
    sendDataToCardComponent: (state, action) => {
      let { id, selectedSize } = action.payload;

      const findItemById = state.bagData.findIndex(
        (item) => item.id === id && item.selectedSize === selectedSize
      );

      if (findItemById > -1) {
        state.bagData[findItemById].quantity++;
      } else {
        state.bagData.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseItemQuantity: (state, { payload }) => {
      const found = state.bagData.findIndex(
        (item) =>
          item.id === payload.id && item.selectedSize === payload.selectedSize
      );

      if (found !== -1) {
        state.bagData[found].quantity++;
      }
    },
    decreaseItemQuantity: (state, { payload }) => {
      const found = state.bagData.findIndex(
        (item) =>
          item.id === payload.id && item.selectedSize === payload.selectedSize
      );
      if (found !== -1 && state.bagData[found].quantity > 1) {
        state.bagData[found].quantity--;
      }
    },
    removeItem: (state, { payload }) => {
      const found = state.bagData.findIndex((item) => item.id === payload.id);
      if (found !== -1) {
        state.bagData.splice(found, 1);
      }
    },
    getTotalQuantity: (state, action) => {
      state.totalItemQuantityData = action.payload;
    },
    clearBagData: (state) => {
      if (state.bagData.length > 0) {
        state.bagData.length = 0;
      }
    },
  },
});

export const {
  sendDataToCardComponent,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
  getTotalQuantity,
  clearBagData,
} = bagDataSlice.actions;
export default bagDataSlice.reducer;
